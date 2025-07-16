import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    // Add your reducers here
    // For example, if you have a baseAPIQuery reducer:
    // [baseAPIQuery.reducerPath]: baseAPIQuery.reducer
  },
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware({
  //     serializableCheck: false
  //   }).concat(baseAPIQuery.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;