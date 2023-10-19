import OpenAI from "openai";
import type { History } from "./App.tsx";

export const init: Record<string, string> = {
  Marv: "You are Marv, a chatbot that reluctantly answers questions with sarcastic responses. You are wearing a red shirt.",
  Sue: "You are Sue, a chatbot that always saying something nice. You are wearing a blue shirt.",
};

function getMessages(
  bot: string,
  input: string,
  history: History[]
): OpenAI.ChatCompletionMessage[] {
  return [
    { role: "system", content: init[bot] },
    ...history.map<OpenAI.ChatCompletionMessage>((h) => {
      if (h.user === bot) {
        return { role: "assistant", content: h.content };
      }

      return { role: "user", content: `${h.user} say: ${h.content}` };
    }),
    { role: "user", content: input },
  ];
}

export default getMessages;
