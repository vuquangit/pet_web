import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Points } from '@/interfaces/chat'
import { IUser } from '@/interfaces/user'

export interface GroupRecipientSidebarState {
  showSidebar: boolean
  showUserContextMenu: boolean
  selectedUser?: IUser
  points: Points
}

const initialState: GroupRecipientSidebarState = {
  showSidebar: true,
  showUserContextMenu: false,
  points: { x: 0, y: 0 },
}

export const groupRecipientSidebarSlice = createSlice({
  name: 'groupRecipientSidebarSlice',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar
    },
    toggleContextMenu: (state, action: PayloadAction<boolean>) => {
      state.showUserContextMenu = action.payload
    },
    setSelectedUser: (state, action: PayloadAction<IUser>) => {
      state.selectedUser = action.payload
    },
    setContextMenuLocation: (state, action: PayloadAction<Points>) => {
      state.points = action.payload
    },
  },
})

export const { setContextMenuLocation, setSelectedUser, toggleSidebar, toggleContextMenu } =
  groupRecipientSidebarSlice.actions

export default groupRecipientSidebarSlice.reducer
