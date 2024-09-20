import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import classNames from 'classnames'

import { AppDispatch, RootState } from '@/store'
import { deleteGroupMessageThunk } from '@/store/groupMessage'
import { setIsEditing, setMessageBeingEdited } from '@/store/messageContainer'
import { selectType } from '@/store/selectedType'
import { AuthContext } from '@/context/AuthContext'
import useMessages from '@/hooks/useMessage'

export const SelectedMessageContextMenu = () => {
  const { id: routeId } = useParams()
  const { user } = useContext(AuthContext)
  const dispatch = useDispatch<AppDispatch>()
  const conversationType = useSelector((state: RootState) => selectType(state))
  const { selectedMessage: message, points } = useSelector(
    (state: RootState) => state.messageContainer,
  )
  const { handleDeleteMessage } = useMessages()

  const deleteMessage = async () => {
    const id = routeId
    if (!id) return

    console.log(`Delete message ${message?.id}`)
    if (!message) return
    const messageId = message.id
    return conversationType === 'private'
      ? await handleDeleteMessage({ id, messageId: message.id })
      : dispatch(deleteGroupMessageThunk({ id, messageId }))
  }

  const editMessage = () => {
    dispatch(setIsEditing(true))
    dispatch(setMessageBeingEdited(message))
  }

  const contextMenuItemStyle = classNames(
    'flex items-center gap-2.5 px-4 py-3 rounded-[8px] text-[15px] font-medium my-1.5 :hover:cursor-pointer :hover:bg-[#1f1f1f]',
  )

  return (
    <ul
      className="fixed z-[99] m-0 w-[220px] list-none rounded-md bg-[#1a1a1a] p-2.5"
      style={{ top: points.y, left: points.x }}
    >
      {message?.author.id === user?.id && (
        <li
          className={contextMenuItemStyle}
          onClick={deleteMessage}
        >
          Delete
        </li>
      )}
      {message?.author.id === user?.id && (
        <li
          className={contextMenuItemStyle}
          onClick={editMessage}
        >
          Edit
        </li>
      )}
    </ul>
  )
}
