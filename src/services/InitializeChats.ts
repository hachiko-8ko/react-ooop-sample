import { Chat } from '../model/Chat';

import type GlobalStateService from "./GlobalStateService";

export default function initializeChats(store: GlobalStateService) {
  const chats = [
    new Chat(
      "gpt-5",
      "Convert 100°F to Celsius.",
      "100°F is approximately 37.8°C.",
    ),
    new Chat(
      "gpt-5",
      "What year did the Titanic sink?",
      "The Titanic sank in 1912.",
    ),
    new Chat(
      "claude-sonnet",
      "What is the capital of Assyria?",
      "I don't know that.",
    ),
  ];
  for (const chat of chats) {
    store.addChat(chat);
  }
}
