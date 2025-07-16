import { baseApi, mockDelay } from './index';
import type { User } from '../../types/apiTypes';
import { setUser } from '../slices/userSlice';

// Mock data
const mockUser: User = {
  id: '1',
  fullName: 'John Doe',
  emailAddress: 'john@quashed.co.nz',
  profileImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
};

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