import { configureStore } from '@reduxjs/toolkit';

import { chatSlice } from './ChatStore';
import { notificationSlice } from './NotificationStore';

/**
 * Redux store.
 */
export const store = configureStore({
  reducer: {
    chat: chatSlice.reducer,
    notification: notificationSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
