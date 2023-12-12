import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/src/resources/chat/completions";
import { readFileSync } from "fs";

interface Message {
  role: string;
  content: string;
}

export async function SendRequest(
  fullHistory: Array<ChatCompletionMessageParam>,
  text: string
) {
  const openai = new OpenAI({
    apiKey: process.env.CHATGPT,
  });
  const prompt = readFileSync("./lib/prompt.txt", "utf-8");
  if (fullHistory.length === 0)
    fullHistory.push({ content: prompt, role: "system" });
  fullHistory.push({ content: text, role: "user" });

  const response = await openai.chat.completions.create({
    messages: fullHistory,
    model: "gpt-3.5-turbo",
  });

  fullHistory.push({
    role: "assistant",
    content: response.choices[0].message.content,
  });

  return fullHistory;
}
