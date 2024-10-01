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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await addGroupRecipient({ id: groupId, add_user_id: username })

      success('Recipient Added to Group')
      setUsername('')
    } catch (err) {
      console.log(err)
      error('Failed to add user')
    }
  }

  return (
    <form
      className="flex items-end gap-5 pb-2.5"
      onSubmit={onSubmit}
    >
      <InputField
        label="Recipient (UserId)"
        value={username}
        onChange={setUsername}
      />
      <Button
        type="submit"
        className=""
        disabled={!username}
      >
        Add Recipient
      </Button>
    </form>
  )
}
