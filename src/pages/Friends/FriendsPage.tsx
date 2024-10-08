import React, { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { camelizeKeys } from 'humps'

import { FriendList } from './components/FriendList'
import { AppDispatch } from '@/store'
import { removeFriend, setOfflineFriends, setOnlineFriends } from '@/store/friends'
import { SocketContext } from '@/context/SocketContext'
import { Friend } from '@/interfaces/chat'
import useFriends from '@/hooks/useFriends'

export const FriendsPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const socket = useContext(SocketContext)
  const { fetchFriends } = useFriends()

  useEffect(() => {
    ;(async () => {
      await fetchFriends()
    })()
  }, [])

  useEffect(() => {
    socket.emit('getOnlineFriends')
    const interval = setInterval(() => {
      socket.emit('getOnlineFriends')
    }, 10000)

    socket.on('onFriendRemoved', (friendRaw: Friend) => {
      const friend = camelizeKeys(friendRaw) as Friend

      console.log('onFriendRemoved', friend)
      dispatch(removeFriend(friend))
      socket.emit('getOnlineFriends')
    })

    return () => {
      console.log('clearing interval')
      clearInterval(interval)
      socket.off('getOnlineFriends')
      socket.off('onFriendRemoved')
    }
  }, [])

  useEffect(() => {
    socket.on('getOnlineFriends', (friendsRaw: Friend[]) => {
      const friends = camelizeKeys(friendsRaw) as Friend[]
      console.log('received online friends', friends)
      dispatch(setOnlineFriends(friends))
      dispatch(setOfflineFriends())
    })
  }, [])

  return <FriendList />
}
