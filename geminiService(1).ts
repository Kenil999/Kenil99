import { GoogleGenAI } from "@google/genai";
import { EnhancementResult } from "../types";
import { GEMINI_MODEL, RESPONSE_SCHEMA, SYSTEM_INSTRUCTION } from "../constants";

export const enhancePrompt = async (rawPrompt: string): Promise<EnhancementResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please set process.env.API_KEY.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: rawPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as EnhancementResult;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to enhance prompt. Please try again.");
  }
};
