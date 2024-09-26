import React, { Dispatch, FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { GroupRecipientsField } from './recipients/GroupRecipientsField'
import { User } from '@/interfaces/chat'
import { useLazySearchQuery } from '@/services/user'
import { RecipientResultContainer } from './recipients/RecipientResultContainer'
import { SelectedGroupRecipientChip } from './recipients/SelectedGroupRecipientChip'
import { InputField, Button } from '@/components/Form'
import useGroups from '@/hooks/useGroup'

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>
}

export const CreateGroupForm: FC<Props> = ({ setShowModal }) => {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<User[]>([])
  const [selectedRecipients, setSelectedRecipients] = useState<User[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searching, setSearching] = useState(false)
  // const debouncedQuery = useDebounce(query, 1000);
  // const debouncedQuery = debounce(query, 1000);
  const navigate = useNavigate()

  const [searchUsers] = useLazySearchQuery()
  const { createGroup } = useGroups()

  useEffect(() => {
    if (query) {
      setSearching(true)
      searchUsers(query)
        .then((res) => {
          const data = res.data?.result?.data || []
          console.log(data)
          setResults(data)
        })
        .catch((err) => console.log(err))
        .finally(() => setSearching(false))
      ;(async () => {
        setSearching(true)
        const { result } = await searchUsers(query).unwrap()
        const resultData = result?.data || []
        setResults(resultData)
        setSearching(false)
      })()
    }
  }, [query])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedRecipients.length === 0 || !message || !title) return
    const users = selectedRecipients.map((user) => user.id)
    // return dispatch(createGroupThunk({ title, users }))
    //   .unwrap()
    //   .then(({ data }) => {
    //     console.log(data);
    //     console.log('done');
    //     setShowModal(false);
    //     navigate(`/groups/${data.id}`);
    //   })
    //   .catch((err) => console.log(err));

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

      <GroupRecipientsField
        value={query}
        setQuery={setQuery}
      />
      {results.length > 0 && query && (
        <RecipientResultContainer
          userResults={results}
          handleUserSelect={handleUserSelect}
        />
      )}

      <section className="my-2">
        {/* <InputContainer backgroundColor="#161616">
          <InputLabel>Title</InputLabel>
          <InputField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </InputContainer> */}
        <InputField
          label="Title"
          value={title}
          placeholder="title"
          onChange={setTitle}
        />
      </section>

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
          placeholder="title"
          onChange={setMessage}
        />
      </section>

      <Button type="submit">Create Conversation</Button>
    </form>
  )
}
