import { Chat } from "../../model/Chat";

import type ChatService from "../../services/ChatService";
import type { CurrentForm, FormService } from "../../services/FormService";
import type GlobalStateService from "../../services/GlobalStateService";

/**
 * Here is the view model for the code that sits behind the editor. It holds the
 * means to read or write chat history.
 *
 * It isn't that big but it's cleaner in a file by itself.
 */
export default class ChatEditorViewModel {
  readonly formService: FormService;
  private readonly chatService: ChatService;
  private readonly globalState: GlobalStateService;

  constructor(
    chatService: ChatService,
    formData: FormService,
    globalState: GlobalStateService,
  ) {
    this.chatService = chatService;
    this.formService = formData;
    this.globalState = globalState;
  }

  /**
   * Add a new chat to history if it has no id. If id is populated, update it.
   */
  addUpdateChat() {
    const form = this.formService.form;
    if (!form.llmModel || !form.prompt) {
      throw new Error("Didn't select a model or enter a prompt");
    }
    let localChat: Chat;
    if (!form.id) {
      localChat = this.addChat(form);
    } else {
      const formChat = Object.assign(Object.create(Chat.prototype), form);
      localChat = this.updateChat(formChat);
    }

    // Bootstrap can call this an event but it's just one line
    this.clearForm();

    // Some time after the chat is submitted, the fake chatbot responds
    this.delayedUpdateResponse(localChat.id);
  }
  /**
   * Add a new chat.
   */
  addChat(form: CurrentForm) {
    if (!form.llmModel) {
      throw new Error("Invalid type");
    }
    const newChat = new Chat(form.llmModel, form.prompt);
    // This is redundant but I want to test both scenarios
    this.chatService.addChat(newChat);
    this.globalState.addChat(newChat);
    return newChat;
  }
  /**
   * Update a chat. This wouldn't make sense in the application if it were real,
   * but it's just a test of mutating an item in a list.
   */
  updateChat(chat: Chat) {
    this.chatService.updateChat(chat);
    this.globalState.updateChat(chat);
    return chat;
  }
  /**
   * Between 5-10s later, set the chatbot response to a random sentence
   */
  delayedUpdateResponse(id: string) {
    setTimeout(
      () => {
        const response = generateSentence();
        this.chatService.updateResponse(id, response);
        this.globalState.notify(response);
        this.globalState.respondToChat(id, response); // extra redundant ...  wanted to test multiple slices
      },
      Math.floor(Math.random() * (10000 - 5000 + 1)) + 5000,
    );
  }

  /**
   * Update or clear the edit modal's state object based on the current/new chat
   */
  loadModal(evt: any) {
    const btn: HTMLElement = evt.relatedTarget;
    const id = btn.dataset.id;
    if (id) {
      const chat = this.getChat(id);
      // populate the fields
      this.updateForm({ ...chat });
    } else {
      // clear the fields
      this.updateForm({ id: id || "", llmModel: "", prompt: "" });
    }
  }

  /**
   * Clear the edit modal's state object
   */
  private clearForm() {
    this.updateForm({ id: "", llmModel: "", prompt: "" });
  }
  /**
   * Push data into the state object that represents the edit modal's data
   */
  private updateForm(form: CurrentForm) {
    this.formService.updateForm(form);
  }
  /**
   * Look up the current/new chat from the parent list
   */
  private getChat(id: string): Chat {
    const rtn = this.chatService.chats.find((f) => f.id === id);
    if (!rtn) {
      throw new Error("This should never happen. If it does, there's a bug.");
    }
    return rtn;
  }
}

// Gen a random sentence. Just a short dumb function that I ripped off from the internet
function generateSentence() {
  const subjects = [
    "The cat",
    "A developer",
    "The coffee",
    "A grifter",
    "A robot",
    "The pizza",
  ];
  const adverbs = [
    "quickly",
    "silently",
    "happily",
    "expertly",
    "mysteriously",
    "drunkenly",
  ];
  const verbs = ["eats", "codes", "jumps over", "brews", "delivers", "insults"];
  const objects = [
    "a laptop",
    "the moon",
    "some code",
    "a rainbow",
    "the sun",
    "a dead parrot",
  ];

  // Pick a random item from an array
  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  return `${pick(subjects)} ${pick(adverbs)} ${pick(verbs)} ${pick(objects)}.`;
}
