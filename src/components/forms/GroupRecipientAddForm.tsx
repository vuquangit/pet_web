import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAddGroupRecipientMutation } from '@/services/group'
import { useToast } from '@/hooks/useToast'
import { Button, InputField } from '@/components/Form'

export const GroupRecipientAddForm = () => {
  const { id: groupId = '' } = useParams()
  const [username, setUsername] = useState('')
  const { success, error } = useToast({ theme: 'dark' })

  const [addGroupRecipient] = useAddGroupRecipientMutation()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addGroupRecipient({ id: groupId, userId: username })
      .then(({ data }) => {
        console.log(data)
        success('Recipient Added to Group')
        setUsername('')
      })
      .catch((err) => {
        console.log(err)
        error('Failed to add user')
      })
  }

  return (
    <form
      className="flex gap-5 pb-2.5"
      onSubmit={onSubmit}
    >
      {/* <InputContainer backgroundColor="#161616">
        <InputLabel>Recipient</InputLabel>
        <InputField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </InputContainer> */}
      <InputField
        label="Recipient (UserId)"
        value={username}
        onChange={setUsername}
      />
      <Button
        className="my-2.5"
        disabled={!username}
      >
        Add Recipient
      </Button>
    </form>
  )
}
