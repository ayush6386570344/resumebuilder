import "dotenv/config"; import { GoogleGenAI } from "@google/genai"; 
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY, });
export default ai;
//  async function InvokeGeminiAI() {
//     const response = await ai.models.generateContent({model: "gemini-3.5-flash", contents: "Hello Gemini, explain what an interview is.", });
//     console.log(response.text);
// }; 
// export default InvokeGeminiAI;
