import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the digital persona of "VOID", a world-renowned avant-garde architectural firm.
Your tone is sophisticated, minimalist, slightly mysterious, and highly professional.
You prefer brutalism, raw concrete, light play, and negative space.
You answer questions about the firm's design philosophy (which centers on "Subtractive Architecture"), structural integrity, and sustainable luxury.
Keep answers concise and impactful, like a well-designed building.
Do not use emojis. Use architectural terminology correctly.
`;

export const sendMessageToGemini = async (message: string, history: { role: string; parts: { text: string }[] }[] = []): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "Error: API Key is missing. I cannot communicate with the void.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Transform history for the chat context if needed, but for simple request/response in this UI 
    // we will use generateContent with system instruction to keep it stateless and snappy for this demo,
    // or use chat if we want to maintain context. Let's use Chat for better flow.

    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    });

    const result = await chat.sendMessage({ message });
    return result.text || "The blueprint is unclear.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The structure is unstable. Please try again later.";
  }
};