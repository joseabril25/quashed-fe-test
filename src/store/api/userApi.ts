import { baseApi, mockDelay } from './index';
import type { User } from '../../types/apiTypes';

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
      queryFn: async () => {
        await mockDelay(500);
        
        // Mock auth check
        const token = localStorage.getItem('token');
        if (!token) {
          return {
            error: {
              status: 401,
              data: { message: 'Not authenticated' }
            }
          };
        }
        
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