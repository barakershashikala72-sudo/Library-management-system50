import { GoogleGenAI } from "@google/genai";
import { getBooks } from "../lib/db";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `You are the KLE Library AI Assistant, a helpful and professional chatbot for the KLE Library Management System.
Your goals:
1. Help students find books in the catalog.
2. Answer questions about library policies (e.g., membership, borrowing limits, late fees).
3. Help users navigate the website sections (Home, Categories, Portal, Search).
4. Provide due date information (simulated, as real user data is unavailable).

Catalog Context:
- We have books in categories: Engineering, Literature, History, Strategy, Blog.
- Popular titles include: "Heli Hogu Kaarana" (Kannada Literature), "Modern Control Engineering", "The Great Gatsby", "Sapiens".

Tone: Professional, supportive, and efficient.

If you don't know something, be honest. Do not make up book IDs or links.
For searching books, format your response to include the book titles.`;

export async function getChatResponse(history: { role: "user" | "model"; parts: { text: string }[] }[], message: string) {
  try {
    const books = getBooks();
    const booksSummary = books.map(b => `${b.title} by ${b.author} (${b.category})`).join(", ");
    
    const contextInstruction = `${SYSTEM_INSTRUCTION}

Current Catalog:
${booksSummary}`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [...history, { role: "user", parts: [{ text: message }] }],
      config: {
        systemInstruction: contextInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("AI Service Error:", error);
    return "The library system is currently offline. Please try again later.";
  }
}
