import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PenToSquareIcon from '@/assets/icons/pen-to-square.svg'
import UserGroupAddIcon from '@/assets/icons/user-group-add.svg'
import { AppDispatch, RootState } from '@/store'
import { setContextMenuLocation, setSelectedGroup, toggleContextMenu } from '@/store/group'
import { ContextMenuEvent, Group } from '@/interfaces/chat'
import { GroupSidebarContextMenu } from '@/components/context-menus/GroupSidebarContextMenu'
import { ConversationSidebarItem } from '@/components/conversations/ConversationSidebarItem'
import { ConversationTab } from '@/components/conversations/ConversationTab'
import { GroupSidebarItem } from '@/components/groups/GroupSidebarItem'
import { CreateConversationModal } from '@/components/modals/CreateConversationModal'
import { CreateGroupModal } from '@/components/modals/CreateGroupModal'

export const ConversationSidebar = () => {
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const conversations = useSelector((state: RootState) => state.conversation.conversations)
  const showGroupContextMenu = useSelector((state: RootState) => state.groups.showGroupContextMenu)
  const groups = useSelector((state: RootState) => state.groups.groups)
  const conversationType = useSelector((state: RootState) => state.selectedConversationType.type)

  const onGroupContextMenu = (event: ContextMenuEvent, group: Group) => {
    event.preventDefault()
    console.log('Group Context Menu')
    console.log(group)
    dispatch(toggleContextMenu(true))
    dispatch(setContextMenuLocation({ x: event.pageX, y: event.pageY }))
    dispatch(setSelectedGroup(group))
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleResize = (e: UIEvent) => dispatch(toggleContextMenu(false))
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleClick = () => dispatch(toggleContextMenu(false))
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  const renderSidebarItems = () => {
    if (conversationType === 'private') {
      return conversations.map((conversation) => (
        <ConversationSidebarItem
          key={conversation.id}
          conversation={conversation}
        />
      ))
    }

    return groups.map((group) => (
      <GroupSidebarItem
        key={group.id}
        group={group}
        onContextMenu={onGroupContextMenu}
      />
    ))
  }

  const renderAddIcon = () => {
    if (conversationType === 'private') {
      return <PenToSquareIcon className="h-6 w-auto cursor-pointer dark:fill-[#e0e0e0]" />
    }

    return <UserGroupAddIcon className="h-6 w-auto cursor-pointer dark:fill-[#e0e0e0]" />
  }

  return (
    <>
      {showModal && conversationType === 'private' && (
        <CreateConversationModal setShowModal={setShowModal} />
      )}
      {showModal && conversationType === 'group' && (
        <CreateGroupModal setShowModal={setShowModal} />
      )}
      <div className="screen-900:w-[400px] flex h-full w-[120px] flex-auto-0 flex-col border-r border-solid border-[#dbdbdb] bg-white dark:border-[#262626] dark:bg-[#111111]">
        <div className="flex flex-col flex-shrink-0 items-center gap-5 border-b border-solid border-[#49494925] px-2.5 py-8">
          <div className="flex items-center justify-center w-full screen-900:justify-between">
            <div className='hidden screen-900:block'>
              <span className='text-[20px] font-bold'>Chats</span>
            </div>
            <div className='p-1 mr-2' onClick={() => setShowModal(true)}>
              {renderAddIcon()}
            </div>
          </div>

          <input
            className="w-full dark:bg-black bg-[#ececec] px-4 py-2.5 text-sm text-[#000] dark:text-[#fff] outline-none rounded-[22px] dark:border border-solid border-[#363636]"
            placeholder="Search"
          />
        </div>

        <ConversationTab />

        <div className="flex-auto min-h-0 overflow-y-auto scrollbar-none">
          <div>
            {renderSidebarItems()}
            {showGroupContextMenu && <GroupSidebarContextMenu />}
          </div>
        </div>
      </div>
    </>
  )
}
