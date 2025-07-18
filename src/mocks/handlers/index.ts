import { providersHandlers } from './providers';
import { feedbackHandlers } from './feedback';
import { userHandlers } from './users';

export const handlers = [
  ...providersHandlers,
  ...feedbackHandlers,
  ...userHandlers,
];