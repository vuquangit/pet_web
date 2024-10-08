import React, { FC, PropsWithChildren } from 'react'

export const ModalHeader: FC<PropsWithChildren> = ({ children }) => {
  return (
    <header
      className="mt-5 flex w-full items-center justify-between px-[24px] border-b border-solid border-[#dbdbdb] dark:border-[#262626]"
    >
      {children}
    </header>
  )
}

export const ModalContentBody: FC<PropsWithChildren> = ({ children }) => {
  return <div className="relative p-6">{children}</div>
}

type ModalContainerProps = {
  showModal?: boolean
}

export const ModalContainer: FC<PropsWithChildren & ModalContainerProps> = ({
  children,
  showModal,
}) => {
  console.log(`showModal: ${showModal}`)
  return (
    <div className="relative w-[650px] rounded-[10px] bg-white dark:bg-[#1f1f1f]">{children}</div>
  )
}
