import { http, HttpResponse, delay } from 'msw';
import { mockUser } from '../../mock/mock';

export const userHandlers = [
  // GET /api/users/me - Get current user
  http.get('/api/users/me', async () => {
    try {
      await delay(500);
      console.log('👤 MSW: GET /api/users/me called');
      
      // TODO: Replace with actual database service call
      // const user = await UserService.getCurrentUser();
      // if (!user) {
      //   return HttpResponse.json(
      //     { error: 'User not found' },
      //     { status: 404 }
      //   );
      // }
      
      return HttpResponse.json(mockUser);
    } catch (error) {
      console.error('❌ MSW: Error fetching current user:', error);
      return HttpResponse.json(
        { error: 'Failed to fetch user data' },
        { status: 500 }
      );
    }
  }),

];