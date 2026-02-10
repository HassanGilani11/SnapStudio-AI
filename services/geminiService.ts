
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const IMAGE_MODELS = [
  'gemini-2.5-flash-image',
  'gemini-3-pro-image-preview'
];

export class GeminiService {
  async editImage(base64Image: string, prompt: string): Promise<{ data: string; modelUsed: string }> {
    // We create the AI instance right before the call to ensure it uses the latest key
    // (potentially from the user selection dialog if fallback to Pro happens)
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    // Remove metadata prefix if present
    const cleanBase64 = base64Image.split(',')[1] || base64Image;
    let lastError: any = null;

    for (const modelName of IMAGE_MODELS) {
      try {
        const response: GenerateContentResponse = await ai.models.generateContent({
          model: modelName,
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
          throw new Error(`Model ${modelName} returned no candidates.`);
        }

        const imagePart = response.candidates[0].content.parts.find(p => p.inlineData);
        
        if (!imagePart || !imagePart.inlineData) {
          const textPart = response.candidates[0].content.parts.find(p => p.text);
          throw new Error(textPart?.text || `Model ${modelName} failed to generate an image.`);
        }

        return {
          data: `data:image/png;base64,${imagePart.inlineData.data}`,
          modelUsed: modelName
        };
      } catch (err: any) {
        lastError = err;
        const errorMsg = err.message || "";
        
        // If it's a quota error (429) or the entity is not found (often means key issues with specific models)
        // we try the next model in the list.
        if (errorMsg.includes('429') || errorMsg.includes('quota') || errorMsg.includes('exhausted')) {
          console.warn(`Model ${modelName} quota exhausted, trying fallback...`);
          continue;
        }
        
        // If it's not a quota error, throw it immediately
        throw err;
      }
    }

    throw lastError || new Error("All image models failed to process the request.");
  }
}

export const geminiService = new GeminiService();
