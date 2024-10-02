import React, { createRef, Dispatch, useEffect } from 'react'

const useModal = ({ setShowModal }: {
  setShowModal: Dispatch<React.SetStateAction<boolean>>
}) => {
  const overlayRef = createRef<HTMLDivElement>()

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => e.key === 'Escape' && setShowModal(false)
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [])

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { current } = overlayRef
    if (current === e.target) {
      console.log('Close Modal')
      setShowModal(false)
    }
  }

  return {
    overlayRef,
    handleOverlayClick
  }
}

export default useModal
