import React, { FC, Dispatch, SetStateAction, useEffect, createRef } from 'react'

import CloseIcon from '@/assets/icons/close.svg'
import { ModalContainer, ModalHeader, ModalContentBody } from '.'
import { SendFriendRequestForm } from '@/components/forms/SendFriendRequestForm'

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export const CreateFriendRequestModal: FC<Props> = ({ setShowModal }) => {
  const ref = createRef<HTMLDivElement>()
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { current } = ref
    if (current === e.target) {
      console.log('Close Modal')
      setShowModal(false)
    }
  }
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => e.key === 'Escape' && setShowModal(false)
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [])

  return (
    <div
      className="modal-overlay"
      ref={ref}
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
