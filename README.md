# Group Chat With ChatGPTs

This is a demo of group chat with ChatGPTs. There are 2 predefined chatbots. They talk only when user say something first. User can not choose who they are talking with.

## Technical Explanation

ChatCompletion API use `role: system` to init prompts. We decide to take advantage of this and use it to create multiple chatbots. We use a central `history` state to keep chat history. When user sent out a new sentence, we choose a random chatbot, generate a new message based on current `history` and prompt it to ChatGPT.

## Further Questions

1. When should chatbots say something?
2. Should user be able to choose who they are talking to?
