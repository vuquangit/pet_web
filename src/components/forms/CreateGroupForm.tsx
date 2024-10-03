import React, { Dispatch, FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { User } from '@/interfaces/chat'
import { useLazySearchFriendsQuery } from '@/services/friend'
import { RecipientResultContainer } from './recipients/RecipientResultContainer'
import { SelectedGroupRecipientChip } from './recipients/SelectedGroupRecipientChip'
import { InputField, Button } from '@/components/Form'
import useGroups from '@/hooks/useGroup'
import { useDebounce } from '@/hooks/useDebounce'

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>
}

export const CreateGroupForm: FC<Props> = ({ setShowModal }) => {
  const [title, setTitle] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [query, setQuery] = useState<string>('')
  const [results, setResults] = useState<User[]>([])
  const [selectedRecipients, setSelectedRecipients] = useState<User[]>([])
  const [searching, setSearching] = useState<boolean>(false)
  const [isShowModalFriends, setIsShowModalFriends] = useState<boolean>(false)

  const debouncedQuery = useDebounce(query, 1000);
  const navigate = useNavigate()
  const [searchFriends] = useLazySearchFriendsQuery()
  const { createGroup } = useGroups()

  // search friends
  useEffect(() => {
    if (!debouncedQuery) return

    ;(async () => {
      try {
        setSearching(true)
        setIsShowModalFriends(true)

        const { result } = await searchFriends(query).unwrap()
        const resultData = result?.data || []
        setResults(resultData)

      } catch (err) {
        console.log('Search user error', err);
      } finally {
        setSearching(false)
      }
    })()
  }, [debouncedQuery])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedRecipients.length === 0 || !message || !title) return
    const users = selectedRecipients.map((user) => user.id)

    const result = await createGroup({ title, users })
    const data = result?.data || {}
    console.log(data)
    console.log('done')
    setShowModal(false)
    const groupId = data?.id
    navigate(`/groups/${groupId}`)
  }

  const handleUserSelect = (user: User) => {
    const exists = selectedRecipients.find((u) => u.id === user.id)
    if (!exists) setSelectedRecipients((prev) => [...prev, user])
  }

  const removeUser = (user: User) =>
    setSelectedRecipients((prev) => prev.filter((u) => u.id !== user.id))

  return (
    <form
      className="w-full"
      onSubmit={onSubmit}
    >
      <div className="mb-2.5 flex flex-wrap gap-x-[10px] gap-y-[4px] rounded-[10px]">
        {selectedRecipients.map((user) => (
          <SelectedGroupRecipientChip
            key={user.id}
            user={user}
            removeUser={removeUser}
          />
        ))}
      </div>

      <InputField
        label="To"
        value={query}
        placeholder="Enter name, username or email to search"
        onChange={setQuery}
        onFocus={() => {
          console.log('focus');
          setIsShowModalFriends(true)
        }}
      />
      {query && (
        <RecipientResultContainer
          isLoading={searching}
          isShowModal={isShowModalFriends}
          userResults={results}
          handleUserSelect={handleUserSelect}
          setShowModal={setIsShowModalFriends}
        />
      )}

      <section className="my-2">
        <InputField
          label="Group name"
          value={title}
          placeholder="Enter group name"
          onChange={setTitle}
        />
      </section>

      <section className="my-2">
        <InputField
          label="Message (optional)"
          value={message}
          placeholder="title"
          onChange={setMessage}
        />
      </section>

      <div className="flex justify-center">
        <Button
          type="submit"
          className="btn-primary mt-2 text-[16px]"
        >
          Create Group
        </Button>
      </div>
    </form>
  )
}
