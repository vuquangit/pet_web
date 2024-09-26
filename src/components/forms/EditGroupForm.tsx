import React, { useState, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '@/store'
import { setIsSavingChanges, setShowEditGroupModal } from '@/store/group'
import { useBeforeUnload } from '@/hooks/beforeUnload'
import { useToast } from '@/hooks/useToast'
import { Button, InputField } from '@/components/Form'
import { FormEvent } from '@/interfaces/chat'
import { GroupAvatarUpload } from '@/components/avatars/GroupAvatarUpload'
import useGroups from '@/hooks/useGroup'

export const EditGroupForm = () => {
  const { selectedGroupContextMenu: group, isSavingChanges } = useSelector(
    (state: RootState) => state.groups,
  )
  const dispatch = useDispatch<AppDispatch>()
  const formRef = useRef<HTMLFormElement>(null)
  const [file, setFile] = useState<File>()
  const [newGroupTitle, setNewGroupName] = useState(group?.title || '')
  const { success, error } = useToast({ theme: 'dark' })
  const isStateChanged = useCallback(
    () => file || group?.title !== newGroupTitle,
    [file, newGroupTitle, group?.title],
  )
  const { updateGroupDetails } = useGroups()

  useBeforeUnload(
    (e) => isStateChanged() && (e.returnValue = 'You have unsaved changes'),
    [isStateChanged],
  )

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!group) throw new Error('Group Undefined')
    const formData = new FormData()
    file && formData.append('avatar', file)
    newGroupTitle && group.title !== newGroupTitle && formData.append('title', newGroupTitle)

    dispatch(setIsSavingChanges(true))

    try {
      await updateGroupDetails({ id: group.id, data: formData })

      dispatch(setShowEditGroupModal(false))
      success('Group Details Updated!')
    } catch (err) {
      console.log(err)
      error('Error Saving Changes. Try again.')
    } finally {
      dispatch(setIsSavingChanges(false))
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      ref={formRef}
    >
      <GroupAvatarUpload setFile={setFile} />
      {/* <InputContainer backgroundColor="#161616">
        <InputLabel htmlFor="groupName">Group Name</InputLabel>
        <InputField
          id="groupName"
          value={newGroupTitle}
          onChange={(e) => setNewGroupName(e.target.value)}
          disabled={isSavingChanges}
        />
      </InputContainer> */}
      <InputField
        label="Group Name"
        value={newGroupTitle}
        onChange={setNewGroupName}
        disabled={isSavingChanges}
      />
      <Button
        type="submit"
        className="my-2.5"
        disabled={!isStateChanged() || isSavingChanges}
      >
        Save
      </Button>
    </form>
  )
}
