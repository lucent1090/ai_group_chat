import { useState } from "react";
import OpenAI from "openai";
import getMessages from "./getMessages";

import "./App.css";

export interface History {
  user: string;
  content: string;
}

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

function App() {
  const [newline, setNewLine] = useState("");
  const [history, setHistory] = useState<History[]>([]);

  const onClick = async () => {
    // 0. Update current history
    const historyWithInput = history.concat([
      { user: "user", content: newline },
    ]);
    setHistory(historyWithInput);
    setNewLine("");

    // 1. Choose who are you talking to
    const rand = Math.floor(Math.random() * 2) + 1;
    const botName = rand === 1 ? "Marv" : "Sue";

    // 2. Generate new history
    const messages = getMessages(botName, newline, history);

    // 3. Get response
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.5,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    const content = response.choices[0].message.content || "";

    // 4. Add response to history
    setHistory(historyWithInput.concat([{ user: botName, content }]));
  };

  return (
    <div className="app">
      <div className="content">
        {history.map((h, index) => {
          if (h.user === "user") {
            return (
              <div key={`${index}${h.user}`} className="user">
                {h.content}
              </div>
            );
          }

          return (
            <div key={`${index}${h.user}`} className="bot">
              <div>{h.user}</div>
              {h.content}
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
