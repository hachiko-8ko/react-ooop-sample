import { useState } from "react";

import ChatService from "../../services/ChatService";
import ChatListViewModel from "./ChatListViewModel";

import type { Chat } from "../../model/Chat";

/**
 * The rules of react hooks state that you can only call hooks
 * from top level component functions or from custom hooks
 * (beginning with "use"). This means that you can inject
 * dependencies if you do so from a custom hook.
 *
 * I considered making a generic dependency injection system, but
 * it added a lot of overhead. You STILL would need a custom hook
 * for each class that uses hooks, but you'd add a DI container on
 * top for zero benefit. Maybe in a different system.
 *
 * @returns ChatListViewModel
 */
export default function useInjectChatListViewModel() {
  const [chats, chatsUpdater] = useState<Chat[]>([]);
  const chatService = new ChatService(chats, chatsUpdater);
  return new ChatListViewModel(chatService);
}
