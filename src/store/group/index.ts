import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../.'
import { Group, Points, UpdateGroupAction, UpdateGroupPayload } from '@/interfaces/chat'
import {
  fetchGroupsThunk,
  leaveGroupThunk,
  removeGroupRecipientThunk,
  updateGroupDetailsThunk,
  updateGroupOwnerThunk,
} from './groupThunk'

export interface GroupState {
  groups: Group[]
  showGroupContextMenu: boolean
  selectedGroupContextMenu?: Group
  showEditGroupModal: boolean
  points: Points
  isSavingChanges: boolean
}

const initialState: GroupState = {
  groups: [],
  showGroupContextMenu: false,
  showEditGroupModal: false,
  points: { x: 0, y: 0 },
  isSavingChanges: false,
}

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<Group>) => {
      console.log(`addGroup reducer: Adding ${action.payload.id} to state`)
      state.groups.unshift(action.payload)
    },
    updateGroup: (state, action: PayloadAction<UpdateGroupPayload>) => {
      console.log('Inside updateGroup')
      const { type, group } = action.payload
      const existingGroup = state.groups.find((g) => g.id === group.id)
      const index = state.groups.findIndex((g) => g.id === group.id)
      if (!existingGroup) return
      switch (type) {
        case UpdateGroupAction.NEW_MESSAGE: {
          console.log('Inside UpdateGroupAction.NEW_MESSAGE')
          state.groups.splice(index, 1)
          state.groups.unshift(group)
          break
        }
        default: {
          console.log('Default Case for updateGroup')
          state.groups[index] = group
          break
        }
      }
    },
    removeGroup: (state, action: PayloadAction<Group>) => {
      console.log('removeGroup Reducer')
      const group = state.groups.find((g) => g.id === action.payload.id)
      const index = state.groups.findIndex((g) => g.id === action.payload.id)
      if (!group) return
      state.groups.splice(index, 1)
    },
    toggleContextMenu: (state, action: PayloadAction<boolean>) => {
      state.showGroupContextMenu = action.payload
    },
    setSelectedGroup: (state, action: PayloadAction<Group>) => {
      state.selectedGroupContextMenu = action.payload
    },
    setContextMenuLocation: (state, action: PayloadAction<Points>) => {
      state.points = action.payload
    },
    setShowEditGroupModal: (state, action: PayloadAction<boolean>) => {
      state.showEditGroupModal = action.payload
    },
    setIsSavingChanges: (state, action: PayloadAction<boolean>) => {
      state.isSavingChanges = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupsThunk.fulfilled, (state, action) => {
        const { data } = action?.payload || {}
        if (!data) return

        console.log(data)
        state.groups = data
        console.log(state.groups)
      })
      .addCase(removeGroupRecipientThunk.fulfilled, (state, action) => {
        const { data: updatedGroup } = action?.payload || {}
        if (!updatedGroup) return

        console.log('removeGroupRecipientThunk.fulfilled')
        const existingGroup = state.groups.find((g) => g.id === updatedGroup.id)
        const index = state.groups.findIndex((g) => g.id === updatedGroup.id)
        if (existingGroup) {
          state.groups[index] = updatedGroup
          console.log('Updating Group....')
        }
      })
      .addCase(updateGroupOwnerThunk.fulfilled, (state, action) => {
        console.log('updateGroupOwnerThunk.fulfilled', action.payload)
      })
      .addCase(leaveGroupThunk.fulfilled, (state, action) => {
        console.log('leaveGroupThunk.fulfilled', action.payload)
      })
      .addCase(updateGroupDetailsThunk.fulfilled, (state, action) => {
        console.log('updateGroupDetailsThunk.fulfilled', action.payload)
      })
  },
})

const selectGroups = (state: RootState) => state.groups.groups
const selectGroupId = (state: RootState, id: string) => id

export const selectGroupById = createSelector([selectGroups, selectGroupId], (groups, groupId) =>
  groups.find((g: any) => g.id === groupId),
)

export const {
  addGroup,
  updateGroup,
  removeGroup,
  toggleContextMenu,
  setContextMenuLocation,
  setSelectedGroup,
  setShowEditGroupModal,
  setIsSavingChanges,
} = groupsSlice.actions

export default groupsSlice.reducer

export * from './groupThunk'
