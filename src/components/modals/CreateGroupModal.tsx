import React, {
  Dispatch,
  FC,
} from 'react'
import { ModalContainer, ModalContentBody, ModalHeader } from '.'

import CloseIcon from '@/assets/icons/close.svg'
import { CreateGroupForm } from '@/components/forms/CreateGroupForm'
import useModal from '@/hooks/useModal'

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>
}

export const CreateGroupModal: FC<Props> = ({ setShowModal }) => {
  const { overlayRef, handleOverlayClick} = useModal({ setShowModal })

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <ModalContainer>
        <ModalHeader>
          <h2>Create a Group</h2>
          <CloseIcon
            className="h-[32px]"
            onClick={() => setShowModal(false)}
          />
        </ModalHeader>
        <ModalContentBody>
          <CreateGroupForm setShowModal={setShowModal} />
        </ModalContentBody>
      </ModalContainer>
    </div>
  )
}
