import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/userSlice";
import { baseApi } from "./api";
import { providerReducer } from "./slices/providersSlice";
import { appReducer } from "./slices/appSlice";


export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    providers: providerReducer,
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