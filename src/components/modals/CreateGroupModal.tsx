import React, {
  createRef,
  Dispatch,
  FC,
  useEffect,
  // useState
} from 'react'
import { ModalContainer, ModalContentBody, ModalHeader } from '.'

import CloseIcon from '@/assets/icons/close.svg'
// import { ConversationType } from '../../utils/types';
import { CreateGroupForm } from '@/components/forms/CreateGroupForm'

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>
}

export const CreateGroupModal: FC<Props> = ({ setShowModal }) => {
  const ref = createRef<HTMLDivElement>()
  // const [type, setType] = useState<ConversationType>('group');

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
