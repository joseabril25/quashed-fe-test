import { http, HttpResponse, delay } from 'msw';

export const feedbackHandlers = [
  // POST /api/feedback - Submit feedback
  http.post('/api/feedback', async ({ request }) => {
    await delay(800);
    const body = await request.json() as { message: string };
    
    try {
      console.log('📝 MSW: Submitting feedback:', body.message);
      if (!body.message) {
        return HttpResponse.json({ success: false, message: 'Feedback message is required' }, { status: 400 });
      }

      return HttpResponse.json({
        success: true,
        message: 'Thank you for your feedback!',
        feedbackId: `feedback-${Date.now()}`
      }, { status: 201 });

    } catch (error) {
      console.error('❌ MSW: Error submitting feedback:', error);
      return HttpResponse.json({ success: false, message: 'Failed to submit feedback' }, { status: 500 });
      
    }
  }),
];