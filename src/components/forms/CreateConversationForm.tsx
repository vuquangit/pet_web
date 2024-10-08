import React, { Dispatch, FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useLazySearchFriendsQuery } from '@/services/friend'
import { RecipientResultContainer } from './recipients/RecipientResultContainer'
import { RecipientField } from './recipients/RecipientField'
import { Button, InputField } from '@/components/Form'
import { IUser } from '@/interfaces/user'
import useConversations from '@/hooks/useConversations'
import { useDebounce } from '@/hooks/useDebounce'

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>
}

export const CreateConversationForm: FC<Props> = ({ setShowModal }) => {
  const [query, setQuery] = useState<string>('')
  const [userResults, setUserResults] = useState<IUser[]>([])
  const [selectedUser, setSelectedUser] = useState<IUser>()
  const [searching, setSearching] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [isShowModalFriends, setIsShowModalFriends] = useState<boolean>(false)

  const debouncedQuery = useDebounce(query.trim(), 1000)
  const navigate = useNavigate()
  const [searchFriends] = useLazySearchFriendsQuery()
  const { createConversation } = useConversations()

  // search friends
  useEffect(() => {
    if (!debouncedQuery) return
    ;(async () => {
      try {
        setSearching(true)
        setIsShowModalFriends(true)

        const { result } = await searchFriends(debouncedQuery).unwrap()
        const resultData = result?.data || []
        setUserResults(resultData)
      } catch (error) {
        console.log(error)
      } finally {
        setSearching(false)
      }
    })()
  }, [debouncedQuery])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('onSubmit', message, selectedUser)
    e.preventDefault()
    if (!message || !selectedUser) return

    try {
      const data = await createConversation({ userId: selectedUser.id, message })

      setShowModal(false)
      const conversationId = data?.id
      if (!conversationId) return

      navigate(`/conversations/${conversationId}`)
    } catch (error) {
      console.log('onSubmit conversation error', error)
    }
  }

  const handleUserSelect = (user: IUser) => {
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
      {!selectedUser && query && (
        <RecipientResultContainer
          isLoading={searching}
          isShowModal={isShowModalFriends}
          userResults={userResults}
          handleUserSelect={handleUserSelect}
          setShowModal={setIsShowModalFriends}
        />
      )}

      <section className="my-2">
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
