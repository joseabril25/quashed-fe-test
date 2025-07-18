import { baseApi, mockDelay } from './index';
import { closeFeedbackModal } from '../slices/feedbackSlice';

interface FeedbackRequest {
  message: string;
  userId?: string;
  timestamp?: number;
}

interface FeedbackResponse {
  success: boolean;
  message: string;
  feedbackId?: string;
}

export const feedbackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitFeedback: builder.mutation<FeedbackResponse, FeedbackRequest>({
      queryFn: async ({ message }, { dispatch }) => {
        
        try {
          await mockDelay(800);
          
          // In a real scenario, this would be an API call
          console.log('Submitting feedback:', message);
          
          // Close modal on success
          dispatch(closeFeedbackModal());
          
          return { 
            data: { 
              success: true,
              message: 'Thank you for your feedback!',
              feedbackId: `feedback-${Date.now()}`
            } 
          };
        } catch (error) {
          return { 
            error: { 
              status: 500, 
              data: 'Failed to submit feedback' 
            } 
          };
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useSubmitFeedbackMutation,
} = feedbackApi;