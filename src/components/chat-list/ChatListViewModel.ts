import type { Chat } from "../../model/Chat";
import type ChatService from "../../services/ChatService";

/**
 * Here is the view model for the code that sits behind the list of chats UI. It holds the
 * means to read the chat history.
 *
 * It's tiny but it's cleaner in a file by itself.
 */
export default class ChatListViewModel {
  readonly chats: Chat[];
  private readonly chatService: ChatService;

  constructor(chatService: ChatService) {
    this.chatService = chatService;
    this.chats = this.chatService.chats;
  }

  replaceChats(chats: Chat[]) {
    this.chatService.replaceChats(chats);
  }
}
