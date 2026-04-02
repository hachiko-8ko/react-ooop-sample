import { createSlice } from "@reduxjs/toolkit";

import type { Chat } from "../model/Chat";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ChatStore = {
  chats: Chat[];
};
const initialChatStore: ChatStore = {
  chats: [],
};

/**
 * Redux reducers.
 */
export const chatSlice = createSlice({
  name: "chat",
  initialState: initialChatStore,
  reducers: {
    add: (state: ChatStore, action: PayloadAction<Chat>) => {
      state.chats.push(action.payload);
    },
    update: (state: ChatStore, action: PayloadAction<Chat>) => {
      const toUpdate = state.chats.find((f) => f.id === action.payload.id);
      if (!toUpdate) {
        throw new Error("Chat with id does not exist");
      }
      Object.assign(toUpdate, action.payload);
    },
    respond: (
      state: ChatStore,
      action: PayloadAction<{ id: string; response: string }>,
    ) => {
      const toUpdate = state.chats.find((f) => f.id === action.payload.id);
      if (!toUpdate) {
        throw new Error("Chat with id does not exist");
      }
      toUpdate.response = action.payload.response;
    },
  },
});

export const { add, update, respond } = chatSlice.actions;
