import { http, HttpResponse, delay } from 'msw';
import { mockUser } from '../../mock/mock';

export const userHandlers = [
  // GET /api/users/me - Get current user
  http.get('/api/users/me', async () => {
    await delay(500);
    console.log('👤 MSW: GET /api/users/me called');
    return HttpResponse.json(mockUser);
  }),
];