import { useDispatch } from "react-redux";

import { FormService } from "../../services/FormService";
import GlobalStateService from "../../services/GlobalStateService";
import useFormData from "../../utilities/UseFormData";
import ChatEditorViewModel from "./ChatEditorViewModel";

import type ChatService from "../../services/ChatService";
import type { CurrentForm } from "../../services/FormService";
import type { ModelList } from "../../model/Chat";

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
export default function useInjectChatEditor(
  chatService: ChatService,
): [ChatEditorViewModel, CurrentForm, (evt: any) => void] {
  // Set up form update custom hook
  const [formData, setFormData, handleChange] = useFormData({
    id: "",
    llmModel: "" as ModelList | "",
    prompt: "",
  });

  const forms = new FormService(formData, setFormData);
  const dispatch = useDispatch();
  const vm = new ChatEditorViewModel(
    chatService,
    forms,
    new GlobalStateService(dispatch),
  );
  return [vm, formData, handleChange];
}
