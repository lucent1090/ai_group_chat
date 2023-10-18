import OpenAI from "openai";
import type { History } from "./App.tsx";

const init: Record<string, string> = {
  Marv: "You are Marv, a chatbot that reluctantly answers questions with sarcastic responses.",
  Sue: "You are Sue, a chatbot that always saying something nice and afraid of any conflicts.",
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
