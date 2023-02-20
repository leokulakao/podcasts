import { configureStore } from '@reduxjs/toolkit';
import { podcastsSlice } from './podcasts/podcastsSlice';

export const store = configureStore({
  reducer: {
    podcasts: podcastsSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
