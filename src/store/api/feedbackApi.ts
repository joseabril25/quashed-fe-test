import { baseApi } from './index';
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
      query: ({ message, userId, timestamp }) => ({
        url: '/feedback',
        method: 'POST',
        body: { message, userId, timestamp },
      }),
      async onQueryStarted(_, { dispatch }) {
        // Close modal on success
        dispatch(closeFeedbackModal());
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useSubmitFeedbackMutation,
} = feedbackApi;