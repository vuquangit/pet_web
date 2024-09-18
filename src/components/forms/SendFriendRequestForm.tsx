import React, { FC, useState, Dispatch, SetStateAction } from 'react'

import { useToast } from '@/hooks/useToast'
import { InputField, Button } from '@/components/Form'
import useFriends from '@/hooks/useFriends'

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export const SendFriendRequestForm: FC<Props> = ({ setShowModal }) => {
  const [username, setUsername] = useState('')
  const { success, error } = useToast({ theme: 'dark' })

  const { createFriendRequest } = useFriends()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await createFriendRequest(username)
      setShowModal(false)
      success('Friend Request Sent!')
    } catch (err) {
      console.log(err)
      error('Error sending friend request')
    }
  }

  return (
    <form
      className="w-full"
      onSubmit={onSubmit}
    >
      <InputField
        type="text"
        value={username}
        label="Id user"
        placeholder="Enter ID"
        onChange={setUsername}
      />

      <Button
        label="Send"
        type="submit"
        className="btn-primary my-5"
        disabled={!username}
      />
    </form>
  )
}
