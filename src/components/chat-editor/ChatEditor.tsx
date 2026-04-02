import { useEffect, useEffectEvent, useRef } from "react";
import { useDispatch } from "react-redux";

import { FormService } from "../../services/FormService";
import GlobalStateService from "../../services/GlobalStateService";
import useFormData from "../../utilities/UseFormData";
import ChatEditorViewModel from "./ChatEditorViewModel";

import type ChatService from "../../services/ChatService";
import type { ModelList } from "../../model/Chat";

interface Props {
  chats: ChatService; // references the parent's chat list
}

/**
 * This handles the front-end visible code for an editor for a new chat.
 * It's very basic, just a couple inputs.
 */
export default function ChatEditor(props: Props) {
  // Set up form update custom hook
  const [formData, setFormData, handleChange] = useFormData({
    id: "",
    llmModel: "" as ModelList | "",
    prompt: "",
  });

  const forms = new FormService(formData, setFormData);
  const dispatch = useDispatch();
  const vm = new ChatEditorViewModel(
    props.chats,
    forms,
    new GlobalStateService(dispatch),
  );

  // Set up JS events for bootstrap. This was far more work than it needed to be.
  const modalRef = useRef<HTMLDivElement>(null);
  const handleModalShow = useEffectEvent((evt: any) => {
    vm.loadModal(evt);
  });
  useEffect(() => {
    // add the events
    const modalElement = modalRef.current;
    if (!modalElement) {
      return;
    }
    modalElement.addEventListener("show.bs.modal", handleModalShow);
    // cleanup after unmounting
    return () => {
      modalElement.removeEventListener("show.bs.modal", handleModalShow);
    };
  }, []);

  // Basic default bootstrap modal, vanilla through and through
  return (
    <div
      className="modal fade"
      ref={modalRef}
      tabIndex={-1}
      id="chatModal"
      aria-labelledby="chatModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="chatModalLabel">
              Ask a bot
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form>
            <div className="container-fluid">
              <div className="row">
                <div className="col">
                  <select
                    className="form-select"
                    aria-label="Select a chatbot model"
                    id="chatbotSelect"
                    name="llmModel"
                    value={formData.llmModel}
                    onChange={handleChange}
                  >
                    <option value="">Select a chatbot model</option>
                    <option value="claude-sonnet">Claude Sonnet</option>
                    <option value="deep-seek">DeepSeek</option>
                    <option value="gemini">Gemini</option>
                    <option value="gpt-5">ChatGPT 5</option>
                    <option value="gpt-4o">ChatGPT 4o</option>
                    <option value="mistral">Mistral NeMo</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="promptInput" className="form-label">
                      Ask a question
                    </label>
                    <textarea
                      className="form-control"
                      id="promptInput"
                      name="prompt"
                      rows={4}
                      value={formData.prompt}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="modal-footer">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 col-md-4"></div>
                <div className="col-12 col-md-4 p-2">
                  <button
                    type="button"
                    id="buttonClose"
                    className="btn btn-secondary w-100"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
                <div className="col-12 col-md-4 p-2">
                  <button
                    type="button"
                    id="buttonSave"
                    className="btn btn-primary w-100"
                    disabled={
                      !vm.formService.form.llmModel ||
                      !vm.formService.form?.prompt
                    }
                    onClick={(evt) => {
                      evt.stopPropagation();
                      vm.addUpdateChat();
                      document.getElementById("buttonClose")?.click();
                    }}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
