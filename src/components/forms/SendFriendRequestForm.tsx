import React, { FC, useState, Dispatch, SetStateAction } from 'react'

import { createFriendRequestThunk } from '@/store/friends/friendsThunk'
import { useToast } from '@/hooks/useToast'
import { useAppDispatch } from '@/store/hook'
import { InputField, Button } from '@/components/Form'

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export const SendFriendRequestForm: FC<Props> = ({ setShowModal }) => {
  const [username, setUsername] = useState('')
  const { success, error } = useToast({ theme: 'dark' })

  const dispatch = useAppDispatch()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(createFriendRequestThunk(username))
      .unwrap()
      .then(() => {
        console.log('Success Friend Request')
        setShowModal(false)
        success('Friend Request Sent!')
      })
      .catch((err) => {
        console.log(err)
        error('Error sending friend request')
      })
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
        placeholder="Enter your email"
        onChange={setUsername}
      />

      <Button
        label="Send"
        type="submit"
        className="btn-primary my-2.5"
        disabled={!username}
      />
    </form>
  )
}
