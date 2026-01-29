
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are Samad's AI Assistant on his personal portfolio.
Your goal is to answer questions about Samad's professional background as a Web3 Community Manager.

Samad's background:
- 4+ years in Web3.
- Worked with Galxe, Web3Go (DIN), Nolus Protocol, Mantis, Tyche, MEXC, Astra Nova, etc.
- Expertise: Discord/Telegram moderation, community strategy, growth campaigns (Zealy, Galxe), technical writing (Medium), Indian market regional growth.
- Personality: Helpful, professional, Web3-savvy, community-focused.

Be concise and enthusiastic. If you don't know an answer, suggest the user contact Samad directly via the contact section.
`;

export async function askGemini(question: string): Promise<string> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 300,
      }
    });

    return response.text || "I'm sorry, I couldn't process that right now. Please try again or contact Samad directly!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The AI assistant is currently sleeping. Feel free to explore the site or reach out via Twitter!";
  }
}
