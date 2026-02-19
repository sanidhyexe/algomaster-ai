import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

const DEFAULT_SYSTEM_INSTRUCTION = `
You are AlgoBot, an expert Data Structures and Algorithms tutor.
Your goal is to help users solve coding problems by providing hints, logic explanations, and time/space complexity analysis.
DO NOT provide the full code solution immediately. 
Guide the user to the answer using Socratic questioning.
If the user's code has a bug, explain WHY it is failing, don't just fix it.
Be concise, encouraging, and technically accurate. Use Markdown for code snippets.
`;

const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is missing from environment variables. Gemini API calls will fail.");
  }
  return new GoogleGenAI({ apiKey: apiKey || '' });
};

export const createChatSession = (customInstruction?: string): Chat => {
  const ai = getAiClient();
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: customInstruction || DEFAULT_SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });
};

export const sendMessageToGemini = async (chat: Chat, message: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the AI service. Please check your connection and try again.";
  }
};