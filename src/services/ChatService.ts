import type { StateDispatcher } from "../utilities/StateTypes";
import type { Chat } from "../model/Chat";
import { produce } from "immer";

/**
 * This service encapsulates the logic dealing with storing the list of chats,
 * which needs to be shared between two components (the chat list and the editor
 * dialog). Moving the logic into this service made the app much easier to
 * deal with. React ran better and the shallow copy (now immer) code was hidden.
 */
export default class ChatService {
  readonly chats: Chat[];
  private readonly chatsUpdater: StateDispatcher<Chat[]>;

  constructor(chats: Chat[], chatsUpdater: StateDispatcher<Chat[]>) {
    this.chats = chats;
    this.chatsUpdater = chatsUpdater;
  }

  addChat(chat: Chat) {
    this.chatsUpdater(
      produce((draft) => {
        draft.push(chat);
      }),
    );
  }
  updateChat(chat: Chat) {
    this.chatsUpdater(
      produce((draft) => {
        const toUpdate = draft.find((f) => f.id === chat.id);
        if (!toUpdate) {
          throw new Error("Chat not found. This is a bug.");
        }
        Object.assign(toUpdate, chat);
      }),
    );
  }
  updateResponse(id: string, response: string) {
    // Used by the simulated chatbot to update the response
    // Because this is called in a setTimeout, it benefits from this produce overload
    this.chatsUpdater((_) =>
      produce(_, (draft) => {
        const toUpdate = draft.find((f) => f.id === id);
        if (!toUpdate) {
          throw new Error("Chat not found. This is a bug.");
        }
        toUpdate.response = response;
      }),
    );
  }
  replaceChats(chats: Chat[]) {
    // no need to use immer here
    this.chatsUpdater(chats);
  }
}
