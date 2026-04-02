import type { StateDispatcher } from "../utilities/StateTypes";
import type { ModelList } from "../model/Chat";
import { produce } from 'immer';

export type CurrentForm = {
  id: string;
  llmModel: ModelList | "";
  prompt: string;
};

/**
 * Encapsulates the logic for dealing with forms from stateside.
 * Look at useFormData to see how to access forms from the UI.
 */
export class FormService {
  readonly form: CurrentForm;
  private readonly formUpdater: StateDispatcher<CurrentForm>;

  constructor(form: CurrentForm, formUpdater: StateDispatcher<CurrentForm>) {
    this.form = form;
    this.formUpdater = formUpdater;
  }

  updateForm(form: CurrentForm) {
    this.formUpdater(
      produce((draft) => {
        draft.id = form.id;
        draft.llmModel = form.llmModel;
        draft.prompt = form.prompt;
      }),
    );
  }
}
