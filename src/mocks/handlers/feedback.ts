import { http, HttpResponse, delay } from 'msw';

export const feedbackHandlers = [
  // POST /api/feedback - Submit feedback
  http.post('/api/feedback', async ({ request }) => {
    await delay(800);
    const body = await request.json() as { message: string };
    
    console.log('📝 MSW: Submitting feedback:', body.message);
    
    return HttpResponse.json({
      success: true,
      message: 'Thank you for your feedback!',
      feedbackId: `feedback-${Date.now()}`
    });
  }),
];