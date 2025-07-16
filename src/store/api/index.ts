import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Mock delay to simulate real API calls
export const mockDelay = (ms: number = 500) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Base API setup - empty endpoints, will be injected by features
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      // Add auth token if needed
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Product', 'Policy', 'Claim'],
  endpoints: () => ({}),
});

// Export hooks for usage in functional components
export const {} = baseApi;