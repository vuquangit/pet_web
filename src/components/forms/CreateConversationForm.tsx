import React, { Dispatch, FC, useEffect, useState } from 'react'

// import { useDispatch } from 'react-redux'
// import { createConversationThunk } from '@/store/conversations'
// import { AppDispatch } from '@/store'
import { useNavigate } from 'react-router-dom'
import { useLazySearchQuery } from '@/services/user'
import { RecipientResultContainer } from './recipients/RecipientResultContainer'
import { RecipientField } from './recipients/RecipientField'
import { Button, InputField } from '@/components/Form'
import { User } from '@/interfaces/chat'
import useConversations from '@/hooks/useConversations'
import { useToast } from '@/hooks/useToast'

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>
}

export const CreateConversationForm: FC<Props> = ({ setShowModal }) => {
  const [query, setQuery] = useState('')
  const [userResults, setUserResults] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searching, setSearching] = useState(false)
  const [message, setMessage] = useState('')
  // const debouncedQuery = useDebounce(query, 1000);
  // const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [searchUsers] = useLazySearchQuery()

  const { createConversation } = useConversations()
  const { error } = useToast({ theme: 'dark' })

  useEffect(() => {
    if (query) {
      ;(async () => {
        setSearching(true)
        const { result } = await searchUsers(query).unwrap()
        const resultData = result?.data || []
        setUserResults(resultData)
        setSearching(false)
      })()
    }
  }, [query])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!message || !selectedUser) return

    const data = await createConversation({ userId: selectedUser.id, message })
    console.log(data)
    console.log('done')
    setShowModal(false)
    const conversationId = data?.id
    if (!conversationId) {
      error('Conversation id not found')
      return
    }
    navigate(`/conversations/${conversationId}`)
  }

  const handleUserSelect = (user: User) => {
    setSelectedUser(user)
    setUserResults([])
    setQuery('')
  }

  return (
    <form
      className="w-full"
      onSubmit={onSubmit}
    >
      <RecipientField
        selectedUser={selectedUser}
        valueQuery={query}
        setQuery={setQuery}
        setSelectedUser={setSelectedUser}
      />
      {!selectedUser && userResults.length > 0 && query && (
        <RecipientResultContainer
          userResults={userResults}
          handleUserSelect={handleUserSelect}
        />
      )}

      <section className="my-2">
        {/* <InputContainer backgroundColor="#161616">
          <InputLabel>Message (optional)</InputLabel>
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </InputContainer> */}
        <InputField
          label="Message (optional)"
          value={message}
          onChange={setMessage}
        />
      </section>

      <div className="flex justify-center">
        <Button
          type="submit"
          className="btn-primary mt-2 text-[16px]"
        >
          Create Conversation
        </Button>
      </div>
    </form>
  )
}
