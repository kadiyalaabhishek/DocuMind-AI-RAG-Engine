
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

export async function queryGemini(question: string, context: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  // We simulate a RAG architecture by feeding relevant context to the model.
  // In a large-scale system, we would perform a vector search first to get 'top_k' chunks.
  // Here, we provide the extracted text as a direct knowledge base.
  
  const systemInstruction = `
    You are an expert Document Analyst. 
    Use the provided DOCUMENT CONTEXT to answer the user's question accurately.
    If the answer isn't in the context, say "I don't have enough information in this document to answer that."
    Keep your responses professional, concise, and insightful.
    
    DOCUMENT CONTEXT:
    ${context.slice(0, 30000)} // Limiting to first 30k chars for demonstration
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction,
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
