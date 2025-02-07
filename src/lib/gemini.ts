import { GoogleGenerativeAI } from '@google/generative-ai';

export async function generate(prompt: string) {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_KEY); // Correct usage

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }], // Correct request format
        });

        if (result.response && result.response.candidates && result.response.candidates.length > 0) {
            console.log(result.response.candidates[0].content.parts[0].text); // Access the text correctly
        } else {
            console.error("Unexpected response format:", result);
        }

    } catch (error) {
        console.error("Error generating content:", error);
    }
}