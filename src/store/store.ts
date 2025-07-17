import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { baseApi } from "./api";
import { providerReducer } from "./slices/providersSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    providers: providerReducer, // Ensure you have the providerReducer imported
    // Add your reducers here
    // For example, if you have a baseAPIQuery reducer:
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(baseApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;