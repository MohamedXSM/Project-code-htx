
import { GoogleGenAI } from "@google/genai";

// Fix: Per coding guidelines, initialize directly and assume process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateCaptionForImage = async (base64Image: string): Promise<string> => {
  // Fix: The API key check is removed as we assume it's always configured.
  try {
    const imagePart = {
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64Image,
      },
    };

    const textPart = {
      text: "صف هذه الصورة لتعليق على وسائل التواصل الاجتماعي. كن مبدعًا وجذابًا وموجزًا. أضف الرموز التعبيرية ذات الصلة."
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
    });

    // Fix: Per coding guidelines, `response.text` is the correct way to get the text.
    return response.text;
  } catch (error) {
    console.error("Error generating caption with Gemini API:", error);
    return "لا يمكن إنشاء تعليق بالذكاء الاصطناعي في هذا الوقت.";
  }
};
