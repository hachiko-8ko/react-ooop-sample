import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

export type NotificationStore = {
  notification: string;
};

const initialNotificationStore: NotificationStore = {
  notification: "",
};

/**
 * Redux reducers.
 */
export const notificationSlice = createSlice({
  name: "notification",
  initialState: initialNotificationStore,
  reducers: {
    notify: (
      state: NotificationStore,
      action: PayloadAction<{ message: string }>,
    ) => {
      state.notification = action.payload.message;
    },
  },
});

export const { notify } = notificationSlice.actions;
