import { immerable } from "immer";

export type ModelList =
  | "gpt-5"
  | "gpt-4o"
  | "claude-sonnet"
  | "mistral"
  | "deep-seek"
  | "gemini";

export class Chat {
  id: string;
  llmModel: ModelList;
  prompt: string;
  response?: string;
  //  Every other object [aside from plain objects] must use the immerable symbol to mark itself as compatible with Immer
  [immerable] = true;

  constructor(llmModel: ModelList, prompt: string, response?: string) {
    this.id = crypto.randomUUID();
    this.llmModel = llmModel;
    this.prompt = prompt;
    this.response = response;
  }

  // The constructor (and, incidentally, this method too) breaks redux because it's
  // not serializable. There are several ways to solve this issue. I picked this one.
  toRedux(): Chat {
    return JSON.parse(JSON.stringify(this));
  }
}
