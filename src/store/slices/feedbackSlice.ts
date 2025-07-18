import { createSlice } from "@reduxjs/toolkit";

interface FeedbackState {
  modalOpen: boolean;
}

const initialState: FeedbackState = {
  modalOpen: false,
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    openFeedbackModal: (state) => {
      state.modalOpen = true;
    },
    closeFeedbackModal: (state) => {
      state.modalOpen = false;
    },
  }
});

export const {
  openFeedbackModal,
  closeFeedbackModal,
} = feedbackSlice.actions;

export const feedbackReducer = feedbackSlice.reducer;