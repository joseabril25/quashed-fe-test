import { baseApi } from './index';
import type { User } from '../../types/apiTypes';

// Inject endpoints into base API
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get current logged in user data
    getMe: builder.query<User, void>({
      query: () => '/users/me',
      providesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

// Export hooks
export const {
  useGetMeQuery,
} = userApi;