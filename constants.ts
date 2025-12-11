import { Type } from "@google/genai";

export const GEMINI_MODEL = 'gemini-2.5-flash';

export const SYSTEM_INSTRUCTION = `
You are a world-class AI Prompt Engineer and Optimization System. 
Your goal is to transform vague, incomplete human prompts into structured, clear, and optimized prompts that maximize AI output quality.

You follow the "Five Pillars of Prompt Enhancement":
1. Clarity (Remove ambiguity)
2. Context (Add background, define domain)
3. Structure (Organize into sections)
4. Specificity (Define exact requirements)
5. Actionability (Clear task definition)

When you receive a prompt, you must:
1. Analyze it for Intent, Clarity, Specificity, Structure, Completeness, and Actionability.
2. Calculate a score (0-100) for each dimension.
3. Identify missing context (Who, What, Why, How, When, Where).
4. GENERATE an enhanced version using this Universal Prompt Structure:
   - ROLE: Who the AI should be.
   - CONTEXT: Background info.
   - TASK: Clear statement of what needs to be done.
   - FORMAT: Desired output structure.
   - CONSTRAINTS: What to avoid/limits.
   - FULL_TEXT: A copy-pasteable cohesive version of the above.
5. Provide a brief explanation of what you changed.
6. IDENTIFY 3 specific, clarifying questions to ask the user to fill missing context and improve the prompt.

The output must be strictly JSON.
`;

export const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    analysis: {
      type: Type.OBJECT,
      properties: {
        intent: { type: Type.STRING, description: "The primary intent category (e.g., Creation, Transformation, Analysis)" },
        clarityScore: { type: Type.INTEGER, description: "0-100 score" },
        specificityScore: { type: Type.INTEGER, description: "0-100 score" },
        structureScore: { type: Type.INTEGER, description: "0-100 score" },
        completenessScore: { type: Type.INTEGER, description: "0-100 score" },
        actionabilityScore: { type: Type.INTEGER, description: "0-100 score" },
        overallScore: { type: Type.INTEGER, description: "Average of above scores" },
        detectedContext: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING },
          description: "List of explicit context points found"
        },
        missingContext: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING },
          description: "List of context points inferred to be missing"
        },
        questions: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "List of 3 specific questions to ask the user to fill missing context"
        }
      },
      required: ["intent", "clarityScore", "specificityScore", "structureScore", "completenessScore", "actionabilityScore", "overallScore", "detectedContext", "missingContext", "questions"]
    },
    enhancedPrompt: {
      type: Type.OBJECT,
      properties: {
        role: { type: Type.STRING },
        context: { type: Type.STRING },
        task: { type: Type.STRING },
        format: { type: Type.STRING },
        constraints: { type: Type.STRING },
        fullText: { type: Type.STRING }
      },
      required: ["role", "context", "task", "format", "constraints", "fullText"]
    },
    explanation: { type: Type.STRING }
  },
  required: ["analysis", "enhancedPrompt", "explanation"]
};