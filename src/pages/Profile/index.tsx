import React, { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import classNames from 'classnames'

import { UserAvatar } from '@/components/users/UserAvatar'
import { Button, InputField } from '@/components/Form'

import { useAppSelector } from '@/store/hook'
import { IUser } from '@/interfaces/user'
import { useLazyGetUserQuery, useUpdateUserMutation } from '@/services/user'
import { useChangeAvatarMutation } from '@/services/auth'
import { useToast } from '@/hooks/useToast'
import { convertObjectToFormData } from '@/utils/convert'
import { resizeImage } from '@/utils/image'
import useProfile from '@/hooks/useProfile'

export function ProfilePage() {
  // hooks
  const { id: userId = '' } = useParams()
  const location = useLocation()
  const avatarInputRef = React.useRef<HTMLInputElement>(null)
  const { info, error } = useToast()

  // states
  const user = useAppSelector((state) => state.auth.currentUser)
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<IUser | null>(null)
  const [isOwner, setIsOwner] = useState<boolean>(false)
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)
  const [previewAvatar, setPreviewAvatar] = useState<string | ArrayBuffer | null>(null)

  // services
  const [getUser, { isLoading }] = useLazyGetUserQuery()
  const [updateUser, { isLoading: isUpdateLoading }] = useUpdateUserMutation()
  const [changeAvatar, { isLoading: isAvatarLoading }] = useChangeAvatarMutation()
  const { fetchProfile } = useProfile()

  const onEdit = () => {
    setIsEditing(true)
  }

  const onInputsChange = (field: keyof IUser, value: string) => {
    setProfile(
      (prev) =>
        ({
          ...prev,
          [field]: value,
        }) as IUser,
    )
  }

  const onSubmit = async () => {
    if (!profile) return
    try {
      const data = {
        ...profile,
        is_delete_avatar: false,
      }

      // convert to FormData
      const formData = convertObjectToFormData(data)

      if (selectedAvatar) {
        formData.append('is_delete_avatar', 'false')
      }

      await updateUser({ id: data.id, data: formData })
      setIsEditing(false)
      info('Updated profile successfully')

      // fetch new profile
      await fetchProfile()
    } catch (err) {
      console.log('update user error', err)
      error('Update profile failed')
    }
  }

  const handleImageChange = (e: any) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()

    reader.onloadend = (e: ProgressEvent<FileReader>) => {
      const result = e?.target?.result
      result && setPreviewAvatar(result)
    }
    reader.readAsDataURL(file) // Read the image as a data URL

    // START: preview resized
    resizeImage({ file: file, maxSize: 500 })
      .then((resizedImage: any) => {
        setSelectedAvatar(resizedImage)
      })
      .catch((err) => {
        console.error(err)
      })
    // END: preview resized
  }

  const handleDeleteAvatar = async (e: Event) => {
    if (!profile) return
    setSelectedAvatar(null)
    setPreviewAvatar(null)

    try {
      const formData = convertObjectToFormData(profile)
      formData.append('is_delete_avatar', 'true')

      await updateUser({ id: profile.id, data: formData })

      // fetch new profile
      await fetchProfile()
      info('Updated avatar successfully')
    } catch (err) {
      console.log('Update user error: ', err)
      error('Update profile failed')
    }

    e.preventDefault()
    e.stopPropagation()
  }

  const handleSaveAvatar = async () => {
    if (!selectedAvatar) return

    try {
      const formData = convertObjectToFormData({})
      formData.append('avatar', selectedAvatar)

      const res = await changeAvatar(formData).unwrap()
      const success = res?.result?.data?.success || false
      if (!success) return

      setSelectedAvatar(null)
      setPreviewAvatar(null)
      info('Updated avatar successfully')

      // fetch new profile
      await fetchProfile()
    } catch (err) {
      console.log('Update avatar error: ', err)
      error('Update avatar failed')
    }
  }

  useEffect(() => {
    setIsOwner(location.pathname === '/profile' || (!!user && userId === user.id))
  }, [location])

  useEffect(() => {
    ;(async () => {
      if (location.pathname === '/profile' || (user && userId === user.id)) {
        setProfile(user)
      } else {
        const res = await getUser(userId).unwrap()
        const data = res?.result?.data || null
        setProfile(data)
      }
    })()
  }, [user, userId, location])

  return (
    <div className="flex-1 py-9">
      <div className="mx-auto w-full max-w-[767px] px-6 md:px-12">
        <h2 className="text-[20px] font-bold">Profile</h2>

        <div className="my-4 flex flex-col items-center justify-between gap-4 rounded-[20px] bg-[#efefef] p-4 dark:bg-[#262626] min-[444px]:flex-row">
          <div className="flex flex-col items-center gap-4 min-[444px]:flex-row">
            <UserAvatar
              className="!h-[150px] !w-[150px]"
              src={previewAvatar || profile?.avatarUrl}
              isLoading={isAvatarLoading}
            />
            <div className="flex flex-col items-center">
              <span className="text-[20px] font-bold">{profile?.name}</span>
              <span className="text-[16px]">{profile?.username}</span>
            </div>
          </div>
          <div className={classNames('flex flex-col gap-3 sm:flex-row', { hidden: !isOwner })}>
            <input
              type="file"
              className="hidden"
              ref={avatarInputRef}
              onChange={handleImageChange}
            />
            <Button
              color="danger"
              onClick={handleDeleteAvatar}
            >
              Delete photo
            </Button>
            {previewAvatar ? (
              <Button
                color="primary"
                loading={isAvatarLoading}
                onClick={handleSaveAvatar}
              >
                Save photo
              </Button>
            ) : (
              <Button
                color="primary"
                onClick={() => avatarInputRef.current?.click()}
              >
                Change photo
              </Button>
            )}
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
                color="primary"
                className="h-11 px-[100px]"
                disabled={isUpdateLoading}
                onClick={onSubmit}
                loading={isUpdateLoading}
              >
                Save
              </Button>
            ) : (
              <Button
                type="submit"
                color="primary"
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
