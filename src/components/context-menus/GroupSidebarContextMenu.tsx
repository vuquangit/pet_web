import React, { FC, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom';
import classNames from 'classnames'

import { AppDispatch, RootState } from '@/store'
import {
  leaveGroupThunk,
  // selectGroupById,
  setShowEditGroupModal,
  toggleContextMenu,
} from '@/store/group'
import { AuthContext } from '@/context/AuthContext'
// import { isGroupOwner } from '@/helpers';
import ExitIcon from '@/assets/icons/exit.svg'
import BoxArchiveIcon from '@/assets/icons/box-archive.svg'
import EditIcon from '@/assets/icons/pen-to-square.svg'

export const GroupSidebarContextMenu: FC = () => {
  // const { id = '' } = useParams();
  const { user } = useContext(AuthContext)
  const dispatch = useDispatch<AppDispatch>()
  const points = useSelector((state: RootState) => state.groups.points)

  // const group = useSelector((state: RootState) =>
  //   selectGroupById(state, id)
  // );

  const contextMenuGroup = useSelector((state: RootState) => state.groups.selectedGroupContextMenu)

  const leaveGroup = () => {
    if (!contextMenuGroup) return
    dispatch(leaveGroupThunk(contextMenuGroup.id)).finally(() => dispatch(toggleContextMenu(false)))
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
        onClick={leaveGroup}
      >
        <ExitIcon
          className="h-5"
          color="#ff0000"
        />
        <span style={{ color: '#ff0000' }}>Leave Group</span>
      </li>
      {user?.id === contextMenuGroup?.owner.id && (
        <li
          className={contextMenuItemStyle}
          onClick={() => dispatch(setShowEditGroupModal(true))}
        >
          <EditIcon
            className="h-5"
            color="#fff"
          />
          <span style={{ color: '#fff' }}>Edit Group</span>
        </li>
      )}
      <li className={contextMenuItemStyle}>
        <BoxArchiveIcon
          className="h-5"
          color="#fff"
        />
        <span style={{ color: '#fff' }}>Archive Group</span>
      </li>
    </ul>
  )
}
