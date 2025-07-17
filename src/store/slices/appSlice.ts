import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleModalStatus: (
      state,
      { payload: { isOpen } }: PayloadAction<{ isOpen: boolean }>
    ) => {
      state.isModalOpen = isOpen
    },
  }
})

export const {
  toggleModalStatus,
} = appSlice.actions

export const appReducer = appSlice.reducer