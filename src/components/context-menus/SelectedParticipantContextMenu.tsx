import React, { FC, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
// import { Icon } from 'akar-icons';

import { AppDispatch, RootState } from '@/store'
import { removeGroupRecipientThunk, selectGroupById, updateGroupOwnerThunk } from '@/store/group'
import { AuthContext } from '@/context/AuthContext'
import { getUserContextMenuIcon, isGroupOwner } from '@/helpers'
// import { ContextMenu, ContextMenuItem } from '../../utils/styles';
import { UserContextMenuActionType } from '@/interfaces/chat'
// import { Person, PersonCross, Crown } from 'akar-icons';
import PersonKickIcon from '@/assets/icons/person-kick.svg'
import CrowIcon from '@/assets/icons/crown.svg'
import PersonIcon from '@/assets/icons/person.svg'
import classNames from 'classnames'

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
  const { user } = useContext(AuthContext)
  const dispatch = useDispatch<AppDispatch>()
  const selectedUser = useSelector((state: RootState) => state.groupSidebar.selectedUser)
  const group = useSelector((state: RootState) => selectGroupById(state, id))

  const kickUser = () => {
    console.log(`Kicking User: ${selectedUser?.id}`)
    console.log(selectedUser)
    if (!selectedUser) return
    dispatch(
      removeGroupRecipientThunk({
        id: id,
        userId: selectedUser.id,
      }),
    )
  }

  const transferGroupOwner = () => {
    console.log(`Transfering Group Owner to ${selectedUser?.id}`)
    if (!selectedUser) return
    dispatch(updateGroupOwnerThunk({ id: id, newOwnerId: selectedUser.id }))
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
