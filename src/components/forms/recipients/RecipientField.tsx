import React, { FC, Dispatch, SetStateAction } from 'react'

import { InputField } from '@/components/Form'
import { SelectedRecipientChip } from './SelectedRecipientChip'
import { IUser } from '@/interfaces/user'

type Props = {
  valueQuery: string
  selectedUser: IUser | undefined
  setQuery: Dispatch<SetStateAction<string>>
  setSelectedUser: Dispatch<SetStateAction<IUser | undefined>>
}

export const RecipientField: FC<Props> = ({
  selectedUser,
  valueQuery,
  setQuery,
  setSelectedUser,
}) =>
  selectedUser ? (
    <>
      <span>To:</span>
      <SelectedRecipientChip
        user={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </>
  ) : (
    <InputField
      label="Recipient"
      value={valueQuery}
      placeholder="Enter username, name or email"
      onChange={setQuery}
    />
  )
