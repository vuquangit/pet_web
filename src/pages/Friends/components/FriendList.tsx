import React, { useEffect } from 'react'

import { FriendListItem } from './FriendListItem'
import { FriendContextMenu } from '@/components/context-menus/FriendContextMenu'
import { ContextMenuEvent, Friend } from '@/interfaces/chat'
import { setContextMenuLocation, setSelectedFriend, toggleContextMenu } from '@/store/friends'
import { useAppDispatch, useAppSelector } from '@/store/hook'

export const FriendList = () => {
  const { showContextMenu, friends, onlineFriends } = useAppSelector((state) => state.friends)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const handleClick = () => dispatch(toggleContextMenu(false))
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  const onContextMenu = (e: ContextMenuEvent, friend: Friend) => {
    e.preventDefault()
    console.log('Friend Context Menu')
    dispatch(toggleContextMenu(true))
    dispatch(setContextMenuLocation({ x: e.pageX, y: e.pageY }))
    dispatch(setSelectedFriend(friend))
  }

  return (
    <div className="py-15 px-10">
      {onlineFriends.length > 0 && <span>Online ({onlineFriends.length})</span>}
      {onlineFriends.map((friend) => (
        <FriendListItem
          key={friend.id}
          friend={friend}
          onContextMenu={onContextMenu}
          online={true}
        />
      ))}
      <span>Offline</span>
      {friends
        .filter((friend) => !onlineFriends.find((onlineFriend) => onlineFriend.id === friend.id))
        .map((friend) => (
          <FriendListItem
            key={friend.id}
            friend={friend}
            onContextMenu={onContextMenu}
            online={false}
          />
        ))}
      {showContextMenu && <FriendContextMenu />}
    </div>
  )
}
