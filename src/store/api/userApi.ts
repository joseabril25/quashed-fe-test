import { baseApi, mockDelay } from './index';
import type { User } from '../../types/apiTypes';
import { setUser } from '../slices/userSlice';
import { mockUser } from '../../mock/mock';

// Inject endpoints into base API
export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get current logged in user data
    getMe: builder.query<User, void>({
      queryFn: async (_, { dispatch }) => {
        await mockDelay(500);
        
        dispatch(setUser({ user: mockUser }));
        return { data: mockUser };
      },
      providesTags: ['User'],
    }),
  }),
  overrideExisting: false,
});

// Export hooks
export const {
  useGetMeQuery,
} = userApi;