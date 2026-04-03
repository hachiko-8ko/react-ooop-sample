import { useEffect } from "react";
import { useSelector } from "react-redux";

import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useInjectChatListViewModel from "./ChatListInject";

import ChatEditor from "../chat-editor/ChatEditor";

import type { RootState } from "../../global-state/Store";

/**
 * This handles the front-end visible code to display a list of chats.
 *
 * The component function has only two goals, initialize the view template
 * and return it.
 */
export default function ChatList() {
  const vm = useInjectChatListViewModel();

  // The global state has an initial set of chats that I want to see in the grid
  // (because I want to test both kinds of state).
  const startingChats = useSelector((state: RootState) => state.chat.chats);
  useEffect(() => {
    if (startingChats && startingChats.length && !vm.chats.length) {
      vm.replaceChats(startingChats);
    }
  }, [startingChats]);

  return (
    <div className="main-container">
      <div className="card w-100 chat-card" style={{ height: "80%" }}>
        <div className="card-body">
          <p className="h3 card-title">Recent chats</p>
          <p className="card-subtitle mb-4 text-body-secondary text-muted">
            These are your recent chats. Go ahead and ask something more, why
            don't you?
          </p>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col" className="d-none d-md-block">
                  Model
                </th>
                <th scope="col">Question</th>
                <th scope="col">Response</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {vm.chats.map((c) => (
                <tr key={c.id}>
                  <td className="d-none d-md-block">
                    {getBotName(c.llmModel)}
                  </td>
                  <td className="responsive-truncate text-truncate">
                    {c.prompt}
                  </td>
                  <td className="responsive-truncate text-truncate">
                    {c.response}
                  </td>
                  <td>
                    <FontAwesomeIcon
                      className="cursor-pointer"
                      data-id={c.id}
                      data-bs-toggle="modal"
                      data-bs-target="#chatModal"
                      icon={faEdit}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex">
            <button
              type="button"
              className="btn btn-primary mb-2 mx-auto w-md-100"
              style={{ minWidth: "10em" }}
              data-bs-toggle="modal"
              data-bs-target="#chatModal"
            >
              New Chat
            </button>
          </div>
        </div>
      </div>
      <ChatEditor chatService={vm.chatService}></ChatEditor>
    </div>
  );
}

function getBotName(
  bot: string,
):
  | "ChatGPT 5"
  | "ChatGPT 4o"
  | "Claude Sonnet"
  | "Mistral NeMo"
  | "DeepSeek"
  | "Gemini" {
  switch (bot) {
    case "gpt-5":
      return "ChatGPT 5";
    case "gpt-4o":
      return "ChatGPT 4o";
    case "claude-sonnet":
      return "Claude Sonnet";
    case "mistral":
      return "Mistral NeMo";
    case "deep-seek":
      return "DeepSeek";
    case "gemini":
      return "Gemini";
    default:
      throw new Error("Invalid chatbot encountered");
  }
}
