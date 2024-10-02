import React, { Dispatch, FC } from 'react'

import { ModalContainer, ModalContentBody, ModalHeader } from '.'
import { CreateConversationForm } from '../forms/CreateConversationForm'
import CloseIcon from '@/assets/icons/close.svg'
import useModal from '@/hooks/useModal'

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>
}

export const CreateConversationModal: FC<Props> = ({ setShowModal }) => {
  const { overlayRef, handleOverlayClick} = useModal({ setShowModal })

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <ModalContainer>
        <ModalHeader>
          <h2 className='text-xl font-bold'>New message</h2>
          <CloseIcon
            className="h-[32px] dark:fill-white"
            onClick={() => setShowModal(false)}
          />
        </ModalHeader>
        <ModalContentBody>
          <CreateConversationForm setShowModal={setShowModal} />
        </ModalContentBody>
      </ModalContainer>
    </div>
  )
}
