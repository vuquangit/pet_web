import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import classNames from 'classnames'

import { RootState } from '@/store'
import { selectGroupById } from '@/store/group'
import { getUserContextMenuIcon, isGroupOwner } from '@/helpers'
import { UserContextMenuActionType } from '@/interfaces/chat'
import useGroups from '@/hooks/useGroup'
import { useAppSelector } from '@/store/hook'

import PersonKickIcon from '@/assets/icons/person-kick.svg'
import CrowIcon from '@/assets/icons/crown.svg'
import PersonIcon from '@/assets/icons/person.svg'

type Props = {
  points: { x: number; y: number }
}

type CustomIconProps = {
  type: UserContextMenuActionType
}

export const CustomIcon: FC<CustomIconProps> = ({ type }) => {
  const { icon: MyIcon, color } = getUserContextMenuIcon(type)
  return (
    <MyIcon
      className="h-5"
      color={color}
    />
  )
}

export const SelectedParticipantContextMenu: FC<Props> = ({ points }) => {
  const { id = '' } = useParams()
  const user = useAppSelector((state) => state.auth.currentUser)
  const selectedUser = useSelector((state: RootState) => state.groupSidebar.selectedUser)
  const group = useSelector((state: RootState) => selectGroupById(state, id))
  const { removeGroupRecipient, updateGroupOwner } = useGroups()

  const kickUser = () => {
    console.log(`Kicking User: ${selectedUser?.id}`)
    console.log(selectedUser)
    if (!selectedUser) return

    removeGroupRecipient({
      id: id,
      userId: selectedUser.id,
    })
  }

  const transferGroupOwner = () => {
    console.log(`Transfering Group Owner to ${selectedUser?.id}`)
    if (!selectedUser) return
    updateGroupOwner({ id: id, newOwnerId: selectedUser.id })
  }

  const isOwner = isGroupOwner(user, group)

  const contextMenuItemStyle = classNames(
    'flex items-center gap-2.5 px-4 py-3 rounded-[8px] text-[15px] font-medium my-1.5 :hover:cursor-pointer :hover:bg-[#1f1f1f]',
  )

  return (
    <ul
      className="fixed z-[99] m-0 w-[220px] list-none rounded-md bg-[#1a1a1a] p-2.5"
      style={{ top: points.y, left: points.x }}
    >
      <li className={contextMenuItemStyle}>
        <PersonIcon
          className="h-5"
          color="#7c7c7c"
        />
        <span style={{ color: '#7c7c7c' }}>Profile</span>
      </li>
      {isOwner && user?.id !== selectedUser?.id && (
        <>
          <li
            className={contextMenuItemStyle}
            onClick={kickUser}
          >
            <PersonKickIcon
              className="h-5"
              color="#ff0000"
            />
            <span style={{ color: '#ff0000' }}>Kick User</span>
          </li>
          <li
            className={contextMenuItemStyle}
            onClick={transferGroupOwner}
          >
            <CrowIcon
              className="h-5"
              color="#FFB800"
            />
            <span style={{ color: '#FFB800' }}>Transfer Owner</span>
          </li>
        </>
      )}
    </ul>
  )
}
