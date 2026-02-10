
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async editImage(base64Image: string, prompt: string): Promise<string> {
    // Remove metadata prefix if present
    const cleanBase64 = base64Image.split(',')[1] || base64Image;

    const response: GenerateContentResponse = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: cleanBase64,
              mimeType: 'image/png'
            }
          },
          {
            text: prompt
          }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    if (!response.candidates || response.candidates.length === 0) {
      throw new Error("No candidates returned from Gemini API");
    }

    const imagePart = response.candidates[0].content.parts.find(p => p.inlineData);
    
    if (!imagePart || !imagePart.inlineData) {
      const textPart = response.candidates[0].content.parts.find(p => p.text);
      throw new Error(textPart?.text || "Model failed to generate an image response.");
    }

    return `data:image/png;base64,${imagePart.inlineData.data}`;
  }
}

export const geminiService = new GeminiService();
