import { useEffect, useState } from "react";

import ChatService from "../../services/ChatService";
import ChatListViewModel from "./ChatListViewModel";
import { useSelector } from "react-redux";

import type { Chat } from "../../model/Chat";
import type { RootStore } from "../../global-state/Store";

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
export default function useInjectChatListViewModel(initFromRedux = true) {
  const [chats, chatsUpdater] = useState<Chat[]>([]);
  const chatService = new ChatService(chats, chatsUpdater);
  const vm = new ChatListViewModel(chatService);

  if (!initFromRedux) {
    return vm;
  }

  // The global state has an initial set of chats that I want to see in the grid
  // (because I want to test both kinds of state).
  const startingChats = useSelector((state: RootStore) => state.chat.chats);
  useEffect(() => {
    if (startingChats && startingChats.length && !vm.chats.length) {
      vm.replaceChats(startingChats);
    }
  }, [startingChats]);

  return vm;
}
