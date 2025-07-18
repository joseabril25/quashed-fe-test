import { http, HttpResponse, delay } from 'msw';
import { mockUser } from '../../mock/mock';

export const userHandlers = [
  // GET /api/users/me - Get current user
  http.get('/api/users/me', async () => {
    await delay(500);
    console.log('👤 MSW: GET /api/users/me called');
    return HttpResponse.json(mockUser);
  }),

  // PUT /api/users/me - Update current user
  http.put('/api/users/me', async ({ request }) => {
    await delay(500);
    const body = await request.json();
    console.log('👤 MSW: PUT /api/users/me called', body);
    
    return HttpResponse.json({
      ...mockUser,
      ...body,
      updatedAt: new Date().toISOString()
    });
  }),
];