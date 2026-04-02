import type { Dispatch, UnknownAction } from "redux";
import type { Chat } from "../model/Chat";
import {
    add as addChat, respond as updateChatResponse, update as updateChat
} from '../global-state/ChatStore';
import { notify as setNotification } from '../global-state/NotificationStore';

/**
 * This is a simple redux implementation, just to test it out. It
 * saves the chats and a notification in the global store (yes, that makes
 * the chats redundant ... this is a test project, not for production).
 */
export default class GlobalStateService {
  private readonly dispatch: Dispatch<UnknownAction>;

  constructor(dispatch: Dispatch<UnknownAction>) {
    this.dispatch = dispatch;
  }

  addChat(chat: Chat) {
    this.dispatch(addChat(chat.toRedux()));
  }
  updateChat(chat: Chat) {
    this.dispatch(updateChat(chat.toRedux()));
  }
  respondToChat(id: string, response: string) {
    this.dispatch(updateChatResponse({ id, response }));
  }
  notify(message: string) {
    this.dispatch(setNotification({ message }));
  }
}
