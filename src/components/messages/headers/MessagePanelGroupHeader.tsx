import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import UserPlus from '@/assets/icons/user-plus-solid.svg'
import PeopleGroup from '@/assets/icons/people-group.svg'
import { RootState, AppDispatch } from '@/store'
import { toggleSidebar } from '@/store/groupRecipientsSidebar'
import { selectGroupById } from '@/store/group'
import { AuthContext } from '@/context/AuthContext'
import { AddGroupRecipientModal } from '../../modals/AddGroupRecipientModal'

export const MessagePanelGroupHeader = () => {
  const [showModal, setShowModal] = useState(false)
  const user = useContext(AuthContext).user!
  const { id = '' } = useParams()
  const group = useSelector((state: RootState) => selectGroupById(state, id))
  const dispatch = useDispatch<AppDispatch>()
  return (
    <>
      {showModal && (
        <AddGroupRecipientModal
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      <header className="flex w-full flex-shrink-0 items-center justify-between border-b border-solid bg-[#49494925] px-8 py-2.5">
        <div>
          <span>{group?.title || 'Group'}</span>
        </div>
        <div className="flex items-center gap-5">
          {user?.id === group?.owner?.id && (
            <UserPlus
              className="h-8 cursor-pointer"
              onClick={() => setShowModal(true)}
            />
          )}
          <PeopleGroup
            className="h-8 cursor-pointer"
            onClick={() => dispatch(toggleSidebar())}
          />
        </div>
      </header>
    </>
  )
}