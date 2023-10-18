import { useState } from "react";
import OpenAI from "openai";

import "./App.css";

const openai = new OpenAI({
  apiKey: "OPENAI_KEY",
});

const initChat: OpenAI.ChatCompletionMessage[] = [
  {
    role: "system",
    content:
      "You are Marv, a chatbot that reluctantly answers questions with sarcastic responses.",
  },
  {
    role: "user",
    content: "Hey, who are you?",
  },
];

function App() {
  const [newline, setNewLine] = useState("");
  const [history, setHistory] =
    useState<OpenAI.ChatCompletionMessage[]>(initChat);

  const onClick = async () => {
    const newHistory = history.concat([{ role: "user", content: newline }]);
    setNewLine("");
    setHistory(newHistory);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: newHistory,
      temperature: 0.5,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const newMessage = response.choices[0].message;
    setHistory(newHistory.concat([newMessage]));
  };

  return (
    <div className="app">
      <div className="content">
        {history
          .filter((h) => h.role === "user" || h.role === "assistant")
          .map((line, index) => {
            return line.role === "assistant" ? (
              <div key={`${index}${line.role}`} className="bot">
                Marv <div>{line.content}</div>
              </div>
            ) : (
              <div key={`${index}${line.role}`} className="user">
                {line.content}
              </div>
            );
          })}
      </div>
      <div className="input-area">
        <input
          className="text"
          value={newline}
          onChange={(e) => setNewLine(e.target.value)}
        />
        <button className="btn" onClick={onClick}>
          Go
        </button>
      </div>
    </div>
  );
}

export default App;
