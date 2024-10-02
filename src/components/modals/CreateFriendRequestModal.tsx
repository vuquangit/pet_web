import React, { FC, Dispatch, SetStateAction } from 'react'

import CloseIcon from '@/assets/icons/close.svg'
import { ModalContainer, ModalHeader, ModalContentBody } from '.'
import { SendFriendRequestForm } from '@/components/forms/SendFriendRequestForm'
import useModal from '@/hooks/useModal'

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export const CreateFriendRequestModal: FC<Props> = ({ setShowModal }) => {
  const { overlayRef, handleOverlayClick} = useModal({ setShowModal })

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <ModalContainer>
        <ModalHeader>
          <h2>Send a Friend Request</h2>
          <CloseIcon
            className="h-[32px]"
            onClick={() => setShowModal(false)}
          />
        </ModalHeader>
        <ModalContentBody>
          <SendFriendRequestForm setShowModal={setShowModal} />
        </ModalContentBody>
      </ModalContainer>
    </div>
  )
}
