import { GoogleGenAI } from "@google/genai";
// import prompt from 'marked'

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

async function main(prompt) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
    });
    return response.text
}

export default main