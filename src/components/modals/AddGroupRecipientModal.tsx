import React, { createRef, Dispatch, FC, useEffect } from 'react'
// import { MdClose } from 'react-icons/md';
import CloseIcon from '@/assets/icons/close.svg'

import { ModalContainer, ModalHeader, ModalContentBody } from '.'
// import { OverlayStyle } from '../../utils/styles';
// import { CreateConversationForm } from '@/components/forms/CreateConversationForm';
import { GroupRecipientAddForm } from '@/components/forms/GroupRecipientAddForm'

type Props = {
  showModal: boolean
  setShowModal: Dispatch<React.SetStateAction<boolean>>
}

export const AddGroupRecipientModal: FC<Props> = ({ showModal, setShowModal }) => {
  const ref = createRef<HTMLDivElement>()
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => e.key === 'Escape' && setShowModal(false)
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [])

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { current } = ref
    if (current === e.target) {
      console.log('Close Modal')
      setShowModal(false)
    }
  }

  return (
    <div
      className="modal-overlay"
      ref={ref}
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
