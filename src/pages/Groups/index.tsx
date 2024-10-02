import React, { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { camelizeKeys } from 'humps'

import { ConversationPanel } from '@/components/conversations/ConversationPanel'
import { ConversationSidebar } from '@/components/sidebars/ConversationSidebar'
import { AppDispatch } from '@/store'
import { addGroupMessage } from '@/store/groupMessage'
import { addGroup, removeGroup, updateGroup } from '@/store/group'
import { updateType } from '@/store/selectedType'
import { SocketContext } from '@/context/SocketContext'
import {
  Group,
  AddGroupUserMessagePayload,
  GroupMessageEventPayload,
  RemoveGroupUserMessagePayload,
  UpdateGroupAction,
  GroupParticipantLeftPayload,
} from '@/interfaces/chat'
import useGroups from '@/hooks/useGroup'
import { useAppSelector } from '@/store/hook'

export const GroupPage = () => {
  const { id } = useParams()
  const user = useAppSelector((state) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  const socket = useContext(SocketContext)
  const navigate = useNavigate()

  const { fetchGroups } = useGroups()

  useEffect(() => {
    dispatch(updateType('group'))
    fetchGroups()
  }, [])

  useEffect(() => {
    socket.on('onGroupMessage', (payloadRaw: GroupMessageEventPayload) => {
      const payload = camelizeKeys(payloadRaw) as GroupMessageEventPayload
      console.log('Group Message Received', payload)
      const { group } = payload
      dispatch(addGroupMessage(payload))
      dispatch(updateGroup({ type: UpdateGroupAction.NEW_MESSAGE, group }))
    })

    socket.on('onGroupCreate', (payloadRaw: Group) => {
      const payload = camelizeKeys(payloadRaw) as Group
      console.log('Group Created', payload)
      dispatch(addGroup(payload))
    })

    /**
     * Adds the group for the user being added
     * to the group.
     */
    socket.on('onGroupUserAdd', (payloadRaw: AddGroupUserMessagePayload) => {
      const payload = camelizeKeys(payloadRaw) as AddGroupUserMessagePayload
      console.log('onGroupUserAdd', payload)
      dispatch(addGroup(payload.group))
    })

    /**
     * Update all other clients in the room
     * so that they can also see the participant
     */
    socket.on('onGroupReceivedNewUser', ({ group: groupRaw }: AddGroupUserMessagePayload) => {
      const group = camelizeKeys(groupRaw) as Group
      console.log('Received onGroupReceivedNewUser', group)
      dispatch(updateGroup({ group }))
    })

    socket.on('onGroupRecipientRemoved', ({ group: groupRaw }: RemoveGroupUserMessagePayload) => {
      console.log('onGroupRecipientRemoved')
      const group = camelizeKeys(groupRaw) as Group
      dispatch(updateGroup({ group }))
    })

    socket.on('onGroupRemoved', (payloadRaw: RemoveGroupUserMessagePayload) => {
      const payload = camelizeKeys(payloadRaw) as RemoveGroupUserMessagePayload
      dispatch(removeGroup(payload.group))
      if (id && id === payload.group.id) {
        console.log('Navigating User to /groups')
        navigate('/groups')
      }
    })

    socket.on('onGroupParticipantLeft', (payloadRaw: GroupParticipantLeftPayload) => {
      console.log('onGroupParticipantLeft received')
      const payload = camelizeKeys(payloadRaw) as GroupParticipantLeftPayload
      const { group, userId } = payload
      dispatch(updateGroup({ group }))
      if (userId === user?.id) {
        console.log('payload.userId matches user.id...')
        dispatch(removeGroup(group))
        navigate('/groups')
      }
    })

    socket.on('onGroupOwnerUpdate', (groupRaw: Group) => {
      console.log('received onGroupOwnerUpdate')
      const group = camelizeKeys(groupRaw) as Group
      dispatch(updateGroup({ group }))
    })

    return () => {
      socket.off('onGroupMessage')
      socket.off('onGroupCreate')
      socket.off('onGroupUserAdd')
      socket.off('onGroupReceivedNewUser')
      socket.off('onGroupRecipientRemoved')
      socket.off('onGroupRemoved')
      socket.off('onGroupParticipantLeft')
      socket.off('onGroupOwnerUpdate')
    }
  }, [id])

  return (
    <div className="flex flex-1 h-full">
      <ConversationSidebar />
      {!id && <ConversationPanel />}
      <Outlet />
    </div>
  )
}
