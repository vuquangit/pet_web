import React, { createRef } from 'react'
// import { MdClose } from 'react-icons/md';

import CloseIcon from '@/assets/icons/close.svg'
import { useDispatch, useSelector } from 'react-redux'
import { ModalContainer, ModalHeader, ModalContentBody } from '.'
import { AppDispatch, RootState } from '../../store'
import { setShowEditGroupModal } from '@/store/group'
import { useKeydown } from '@/hooks/useKeydown'
// import { OverlayStyle } from '../../utils/styles';
import { DivMouseEvent } from '@/interfaces/chat'
import { EditGroupForm } from '../forms/EditGroupForm'

export const EditGroupModal = () => {
  const ref = createRef<HTMLDivElement>()
  const dispatch = useDispatch<AppDispatch>()
  const { isSavingChanges } = useSelector((state: RootState) => state.groups)

  const handleOverlayClick = (e: DivMouseEvent) =>
    ref.current &&
    ref.current === e.target &&
    !isSavingChanges &&
    dispatch(setShowEditGroupModal(false))

  useKeydown(
    (e) => e.key === 'Escape' && !isSavingChanges && dispatch(setShowEditGroupModal(false)),
  )

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
    >
      <ModalContainer>
        <ModalHeader>
          <h2>Edit Group</h2>
          <CloseIcon
            className="h-[32px]"
            onClick={() => !isSavingChanges && dispatch(setShowEditGroupModal(false))}
            cursor={isSavingChanges ? 'not-allowed' : 'pointer'}
          />
        </ModalHeader>
        <ModalContentBody>
          <EditGroupForm />
        </ModalContentBody>
      </ModalContainer>
    </div>
  )
}
