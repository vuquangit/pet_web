import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CommentAddIcon from '@/assets/icons/comment-add.svg'
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
      return (
        <CommentAddIcon
          className="h-[30px] cursor-pointer dark:fill-white"
          onClick={() => setShowModal(true)}
        />
      )
    }

    return (
      <UserGroupAddIcon
        className="h-[30px] cursor-pointer dark:fill-white"
        onClick={() => setShowModal(true)}
      />
    )
  }

  return (
    <>
      {showModal && conversationType === 'private' && (
        <CreateConversationModal setShowModal={setShowModal} />
      )}
      {showModal && conversationType === 'group' && (
        <CreateGroupModal setShowModal={setShowModal} />
      )}
      <div className="md:w-[calc(100% - 80px)] flex h-full w-[400px] flex-auto-0 flex-col bg-white dark:bg-[#111111]">
        <header className="flex h-[90px] flex-shrink-0 items-center gap-5 border-b border-solid border-[#49494925] px-2.5 py-8">
          <input
            className="w-full rounded-[5px] border-none bg-[#ececec] px-4 py-2.5 text-[14px] outline-none"
            placeholder="Search for Conversations"
          />
          {renderAddIcon()}
        </header>

        <ConversationTab />

        <div className="min-h-0 flex-auto overflow-y-auto scrollbar-none">
          <div>
            {renderSidebarItems()}
            {showGroupContextMenu && <GroupSidebarContextMenu />}
          </div>
        </div>
        <footer></footer>
      </div>
    </>
  )
}
