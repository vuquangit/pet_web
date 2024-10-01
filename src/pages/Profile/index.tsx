import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import classNames from 'classnames'

import { useAppSelector } from '@/store/hook'
import { UserAvatar } from '@/components/users/UserAvatar'
import { Button, InputField } from '@/components/Form'
import { IAuthMe } from '@/interfaces/auth'
import { useLazyGetUserQuery, useUpdateUserMutation } from '@/services/user'
import { useToast } from '@/hooks/useToast'

export function ProfilePage() {
  const { id: userId = '' } = useParams()
  const user = useAppSelector((state) => state.auth)
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<IAuthMe | null>(null)
  const [isOwner, setIsOwner] = useState<boolean>(false)

  // services
  const [getUser, { isLoading }] = useLazyGetUserQuery()
  const [updateUser, { isLoading: isUpdateLoading }] = useUpdateUserMutation()
  const { info, error } = useToast()

  const onEdit = () => {
    setIsEditing(true)
  }

  const onInputsChange = (field: keyof IAuthMe, value: string) => {
    setProfile(
      (prev) =>
        ({
          ...prev,
          [field]: value,
        }) as IAuthMe,
    )
  }

  const onSubmit = async () => {
    if (!profile) return
    try {
      const data = {
        ...profile,
        is_delete_avatar: false,
      }
      await updateUser({ id: data.id, data })
      setIsEditing(false)
      info('Updated profile successfully')
    } catch (err) {
      console.log('update user error', err)
      error('Update profile failed')
    }
  }

  useEffect(() => {
    ;(async () => {
      if (userId && userId !== user.id) {
        const res = await getUser(userId).unwrap()
        const data = res?.result?.data || null
        setProfile(data)
      } else {
        setProfile(user)
      }
    })()
  }, [user.id, userId])

  useEffect(() => {
    const profileId = profile?.id || ''
    setIsOwner(userId === profileId)
  }, [userId, profile])

  return (
    <div className="flex-1 py-9">
      <div className="mx-auto w-full max-w-[767px] px-12">
        <h2 className="text-[20px] font-bold">Profile</h2>

        <div className="my-4 flex items-center justify-between rounded-[20px] bg-[#efefef] p-4 dark:bg-[#262626]">
          <div className="flex items-center">
            <UserAvatar user={profile} />
            <div className="flex flex-col items-center px-4">
              <span>{profile?.username}</span>
              <span>{profile?.name}</span>
            </div>
          </div>
          <div className={classNames({ hidden: !isOwner })}>
            <Button primary>Change photo</Button>
          </div>
        </div>

        <InputField
          label="Email"
          readOnly={!isEditing}
          value={profile?.email || ''}
          onChange={(val) => onInputsChange('email', val)}
          classNameWrapper="mt-6"
          classNameInput="px-4 py-2.5"
        />

        <InputField
          label="Name"
          readOnly={!isEditing}
          value={profile?.name || ''}
          onChange={(val) => onInputsChange('name', val)}
          classNameWrapper="mt-6"
          classNameInput="px-4 py-2.5"
        />

        <InputField
          label="Role"
          readOnly={!isEditing}
          value={profile?.role || ''}
          onChange={(val) => onInputsChange('role', val)}
          classNameWrapper="mt-6"
          classNameInput="px-4 py-2.5"
        />

        <InputField
          label="Username"
          readOnly={!isEditing}
          value={profile?.username || ''}
          onChange={(val) => onInputsChange('username', val)}
          classNameWrapper="mt-6"
          classNameInput="px-4 py-2.5"
        />

        {isOwner && (
          <div className="flex justify-end pt-4">
            {isEditing ? (
              <Button
                type="submit"
                primary
                className="h-11 px-[100px]"
                disabled={isUpdateLoading}
                onClick={onSubmit}
              >
                Save
              </Button>
            ) : (
              <Button
                type="submit"
                primary
                className="h-11 px-[100px]"
                disabled={isLoading}
                onClick={onEdit}
              >
                Edit profile
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
