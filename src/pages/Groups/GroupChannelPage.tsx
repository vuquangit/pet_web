import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { MessagePanel } from '@/components/messages/MessagePanel'
import { SocketContext } from '@/context/SocketContext'
import { AppDispatch, RootState } from '@/store'
import { editGroupMessage, fetchGroupMessagesThunk } from '@/store/groupMessage'
import { GroupMessageType } from '@/interfaces/chat'
import { GroupRecipientsSidebar } from '@/pages/Conversations/sidebars/group-recipients/GroupRecipientsSidebar'
import { EditGroupModal } from '@/components/modals/EditGroupModal'

export const GroupChannelPage = () => {
  const { id = '' } = useParams()
  const socket = useContext(SocketContext)
  const dispatch = useDispatch<AppDispatch>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isRecipientTyping, setIsRecipientTyping] = useState(false)

  const { showEditGroupModal } = useSelector((state: RootState) => state.groups)
  const showSidebar = useSelector((state: RootState) => state.groupSidebar.showSidebar)

  useEffect(() => {
    const groupId = id
    dispatch(fetchGroupMessagesThunk(groupId))
  }, [id])

  useEffect(() => {
    const groupId = id!
    console.log(groupId)
    socket.emit('onGroupJoin', { groupId })
    socket.on('onGroupMessageUpdate', (message: GroupMessageType) => {
      console.log('onGroupMessageUpdate received')
      console.log(message)
      dispatch(editGroupMessage(message))
    })
    return () => {
      socket.emit('onGroupLeave', { groupId })
      socket.off('onGroupMessageUpdate')
    }
  }, [id])

  const sendTypingStatus = () => {}

  return (
    <>
      {showEditGroupModal && <EditGroupModal />}
      <div className="h-full w-full overflow-hidden">
        <MessagePanel
          sendTypingStatus={sendTypingStatus}
          isRecipientTyping={isRecipientTyping}
        ></MessagePanel>
      </div>
      {showSidebar && <GroupRecipientsSidebar />}
    </>
  )
}
