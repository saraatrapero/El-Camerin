
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `Eres un asistente virtual experto en la historia, tradiciones y devoción a la Virgen de la Cabeza (Andújar, Jaén, España).
Tu objetivo es ayudar a los visitantes y peregrinos a conocer mejor el Santuario, la Romería (la más antigua de España) y la historia de la "Morenita".
- Responde con tono respetuoso, cálido y acogedor.
- Si te preguntan por la historia, menciona al pastor Juan de Rivas y el año 1227.
- Proporciona detalles sobre la Romería del último domingo de abril.
- Mantén tus respuestas concisas pero informativas.
- No inventes hechos históricos; si no sabes algo, invita a consultar las fuentes oficiales de la Cofradía Matriz de Andújar.
- Habla siempre en español.`;

export async function getAssistantResponse(prompt: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "Lo siento, no he podido procesar tu solicitud en este momento.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Ha ocurrido un error al conectar con el asistente. Por favor, inténtalo de nuevo más tarde.";
  }
}
