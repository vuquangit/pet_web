import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'

import { AppDispatch, RootState } from '@/store'
import { toggleContextMenu } from '@/store/friends'
import { useLazyCheckConversationOrCreateQuery } from '@/services/conversations'
import { SocketContext } from '@/context/SocketContext'
import UserMinusIcon from '@/assets/icons/user-minus-solid.svg'
import CommentDotsIcon from '@/assets/icons/comment-dots-regular.svg'
import useFriends from '@/hooks/useFriends'
import { useAppSelector } from '@/store/hook'

export const FriendContextMenu = () => {
  const user = useAppSelector((state) => state.auth.currentUser)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { points, selectedFriendContextMenu } = useSelector((state: RootState) => state.friends)
  const socket = useContext(SocketContext)
  const [checkConversationOrCreate] = useLazyCheckConversationOrCreateQuery()
  const { removeFriend } = useFriends()

  const getUserFriendInstance = () =>
    user?.id === selectedFriendContextMenu?.sender.id
      ? selectedFriendContextMenu?.receiver
      : selectedFriendContextMenu?.sender

  const handleRemoveFriend = async () => {
    if (!selectedFriendContextMenu) return
    dispatch(toggleContextMenu(false))
    await removeFriend(selectedFriendContextMenu.id)
    socket.emit('getOnlineFriends')
  }

  const handleSendMessage = async () => {
    const recipient = getUserFriendInstance()
    if (!recipient) return

    try {
      const res = await checkConversationOrCreate(recipient.id).unwrap()
      const data = res.result?.data
      navigate(`/conversations/${data?.id}`)
    } catch (err) {
      console.log(err)
    }
  }

  const contextMenuItemStyle = classNames(
    'flex items-center gap-[10px] px-[14px] py-[16px] rounded-[8px] text-[15px] font-medium mx-0 my-1.5 :hover:cursor-pointer :hover:bg-[rgb(31, 31, 31)]',
  )

  return (
    <ul
      className="fixed z-[99] m-0 w-[220px] list-none rounded-[8px] bg-[#1a1a1a] p-2.5"
      style={{ top: points.y, left: points.x }}
    >
      <li
        className={contextMenuItemStyle}
        onClick={handleRemoveFriend}
      >
        <UserMinusIcon
          className="h-8"
          color="#ff0000"
        />
        <span style={{ color: '#ff0000' }}>Remove Friend</span>
      </li>

      <li
        className={contextMenuItemStyle}
        onClick={handleSendMessage}
      >
        <CommentDotsIcon
          className="h-8"
          color="#fff"
        />
        <span style={{ color: '#fff' }}>Message</span>
      </li>
    </ul>
  )
}
