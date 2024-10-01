import React, { useState, Dispatch, SetStateAction, FC } from 'react'

import { useUpdateStatusMessageMutation } from '@/services/user'
import { useAppSelector } from '@/store/hook'
import { useToast } from '@/hooks/useToast'
import { InputField, Button } from '@/components/Form'

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export const UpdateUserStatusForm: FC<Props> = ({ setShowModal }) => {
  const user = useAppSelector((state) => state.auth)
  const { success, error } = useToast({ theme: 'dark' })
  const [statusMessage, setStatusMessage] = useState(user?.presence?.statusMessage || '')
  const [updateStatusMessage] = useUpdateStatusMessageMutation()

  const saveStatus = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Updating Status...')
    updateStatusMessage({ statusMessage })
      .then(() => {
        success('Updated Status!')
        setShowModal(false)
      })
      .catch((err) => {
        console.log(err)
        error('Failed to Update Status')
      })
  }

  return (
    <form
      className="w-full"
      onSubmit={saveStatus}
    >
      {/* <InputContainer backgroundColor="#0A0A0A">
        <InputContainerHeader>
          <InputLabel htmlFor="message">Message</InputLabel>
        </InputContainerHeader>
        <InputField
          type="test"
          id="message"
          value={statusMessage}
          onChange={(e) => setStatusMessage(e.target.value)}
        />
      </InputContainer> */}
      <InputField
        label="Message"
        value={statusMessage}
        onChange={setStatusMessage}
      />
      <div className="mt-2.5 flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
