import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../types/apiTypes";


const initialState = {
  user: null as User | null,
  isAuthenticated: true,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    setUser: (
      state,
      { payload: { user } }: PayloadAction<{ user: User }>
    ) => {
      state.user = user
      state.isAuthenticated = true
    },
  }
})

export const {
  setUser,
} = userSlice.actions

export const userReducer = userSlice.reducer