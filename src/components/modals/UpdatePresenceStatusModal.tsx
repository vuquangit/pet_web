import React, { Dispatch, FC, SetStateAction, useRef } from 'react'
// import { MdClose } from 'react-icons/md';
import CloseIcon from '@/assets/icons/close.svg'
import { ModalContainer, ModalContentBody, ModalHeader } from '.'
// import { OverlayStyle } from '../../utils/styles';
import { UpdateUserStatusForm } from '@/components/forms/status'

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export const UpdatePresenceStatusModal: FC<Props> = ({ setShowModal }) => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className="modal-overlay"
      ref={ref}
    >
      <ModalContainer>
        <ModalHeader>
          <h2>Set Custom Status</h2>
          <CloseIcon
            className="h-[32px]"
            onClick={() => setShowModal(false)}
          />
        </ModalHeader>
        <ModalContentBody>
          <UpdateUserStatusForm setShowModal={setShowModal} />
        </ModalContentBody>
      </ModalContainer>
    </div>
  )
}
