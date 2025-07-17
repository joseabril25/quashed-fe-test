import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Provider } from "../../types/apiTypes";


const initialState = {
  providers: null as Provider[] | null,
}

const providerSlice = createSlice({
  name: 'providers',
  initialState,
  reducers: {
    setProviders: (
      state,
      { payload: { providers } }: PayloadAction<{ providers: Provider[] }>
    ) => {
      state.providers = providers
    },
    clearProviders: (state) => {
      state.providers = null
    }
  }
})

export const {
  setProviders,
} = providerSlice.actions

export const providerReducer = providerSlice.reducer