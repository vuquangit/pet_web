import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { camelizeKeys } from 'humps'

import { MessagePanel } from '@/components/messages'
import { SocketContext } from '@/context/SocketContext'
import { AppDispatch, RootState } from '@/store'
import { editGroupMessage } from '@/store/groupMessage'
import { GroupMessageType } from '@/interfaces/chat'
import { GroupRecipientsSidebar } from '@/components/sidebars/group-recipients/GroupRecipientsSidebar'
import { EditGroupModal } from '@/components/modals/EditGroupModal'
import useGroupMessage from '@/hooks/useGroupMessage'

export const GroupChannelPage = () => {
  const { id = '' } = useParams()
  const socket = useContext(SocketContext)
  const dispatch = useDispatch<AppDispatch>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isRecipientTyping, setIsRecipientTyping] = useState(false)

  const { showEditGroupModal } = useSelector((state: RootState) => state.groups)
  const showSidebar = useSelector((state: RootState) => state.groupSidebar.showSidebar)

  const { fetchGroupMessages } = useGroupMessage()

  useEffect(() => {
    const groupId = id
    fetchGroupMessages(groupId)
  }, [id])

  useEffect(() => {
    const groupId = id
    console.log(groupId)
    socket.emit('onGroupJoin', { groupId })
    socket.on('onGroupMessageUpdate', (messageRaw: GroupMessageType) => {
      const message = camelizeKeys(messageRaw) as GroupMessageType

      console.log('onGroupMessageUpdate received', message)
      dispatch(editGroupMessage(message))
    })
    return () => {
      socket.emit('onGroupLeave', { groupId })
      socket.off('onGroupMessageUpdate')
    }
  }, [id])

  // TODO: send typing status
  const sendTypingStatus = () => {}

  return (
    <>
      {showEditGroupModal && <EditGroupModal />}
      <div className="w-full h-full overflow-hidden">
        <MessagePanel
          sendTypingStatus={sendTypingStatus}
          isRecipientTyping={isRecipientTyping}
        ></MessagePanel>
      </div>
      {showSidebar && <GroupRecipientsSidebar />}
    </>
  )
}
