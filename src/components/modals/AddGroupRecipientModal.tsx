import React, { Dispatch, FC } from 'react'
import CloseIcon from '@/assets/icons/close.svg'

import { ModalContainer, ModalHeader, ModalContentBody } from '.'
// import { CreateConversationForm } from '@/components/forms/CreateConversationForm';
import { GroupRecipientAddForm } from '@/components/forms/GroupRecipientAddForm'
import useModal from '@/hooks/useModal'

type Props = {
  showModal: boolean
  setShowModal: Dispatch<React.SetStateAction<boolean>>
}

export const AddGroupRecipientModal: FC<Props> = ({ showModal, setShowModal }) => {
  const { overlayRef, handleOverlayClick} = useModal({ setShowModal })

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <ModalContainer showModal={showModal}>
        <ModalHeader>
          <h2>Add Recipient</h2>
          <CloseIcon
            className="h-[32px] cursor-pointer"
            onClick={() => setShowModal(false)}
          />
        </ModalHeader>
        <ModalContentBody>
          <GroupRecipientAddForm />
        </ModalContentBody>
      </ModalContainer>
    </div>
  )
}
