import React, { FC, Dispatch, SetStateAction } from 'react'
import { debounce } from 'lodash'

import { InputField } from '@/components/Form'
import { SelectedRecipientChip } from './SelectedRecipientChip'
import { User } from '@/interfaces/chat'

type Props = {
  valueQuery: string
  selectedUser: User | undefined
  setQuery: Dispatch<SetStateAction<string>>
  setSelectedUser: Dispatch<SetStateAction<User | undefined>>
}

export const RecipientField: FC<Props> = ({
  selectedUser,
  valueQuery,
  setQuery,
  setSelectedUser,
}) => (
  <section>
    {/* <InputContainer backgroundColor="#161616">
      <InputLabel>Recipient</InputLabel>
      {selectedUser ? (
        <SelectedRecipientChip
          user={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      ) : (
        <InputField onChange={(e) => setQuery(e.target.value)} />
      )}
    </InputContainer> */}

    {selectedUser ? (
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
        onChange={debounce(setQuery, 1000)}
      />
    )}
  </section>
)
