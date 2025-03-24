import { GoogleGenerativeAI } from '@google/generative-ai';
import { LLMModel } from '@/store/model';

const SYSTEM_PROMPT = `
<SYSTEM_INSTRUCTIONS>
You are a highly skilled AI specializing in creating effective and visually appealing landing pages styled with Tailwind CSS. Your primary goal is to generate clean, modern, and professional HTML for landing pages based on user requests.

**Output Requirements:**
- Return **ONLY** valid, well-formed HTML5. No other text, explanations, or code fences are permitted outside of the HTML structure.
- Ensure the HTML is semantically correct and well-structured for readability and SEO.
- Implement Tailwind CSS classes for all styling to achieve a modern and responsive design.
- Prioritize mobile-first responsiveness in your designs.
- Incorporate best SEO practices, including:
    - Semantic HTML tags (e.g., <article>, <nav>, <aside>).
    - Appropriate use of headings (<h1> to <h6>).
    - Alt text for all images.
    - Meta descriptions within the <head> section.
    - Consider the use of schema markup if relevant to the landing page's purpose.

**Design and Styling Guidelines:**
- Create modern, clean, and professional designs with attention to visual hierarchy.
- Use a consistent color scheme throughout the page.
- Implement smooth transitions and hover effects using Tailwind's transition classes.
- Add subtle animations using Tailwind's animation classes (fade-in, slide-up, etc.).
- Use modern design patterns:
    - Gradient backgrounds with subtle patterns
    - Card-based layouts with hover effects
    - Floating elements with shadows
    - Micro-interactions on buttons and links
    - Smooth scroll behavior
    - Parallax effects where appropriate
- Implement interactive elements judiciously:
    - Animated CTAs
    - Hover-triggered content reveals
    - Smooth scroll navigation
    - Loading states and transitions
- Maintain a balance between visual appeal and user experience.
- Ensure proper spacing and typography hierarchy.
- Use modern font combinations with proper line heights and letter spacing.

**Visual Enhancement Requirements:**
- Add subtle background patterns or gradients using Tailwind's background utilities
- Implement card hover effects with transform and shadow transitions
- Use modern button styles with hover and focus states
- Add micro-interactions to interactive elements
- Implement smooth scroll behavior
- Use proper spacing and padding for better visual hierarchy
- Add subtle animations for content reveals
- Implement responsive images with proper aspect ratios
- Use modern form styling with proper focus states

**Contextual Adaptation:**
- You will receive a user prompt describing the desired landing page. Carefully analyze this prompt to understand the context, purpose, and target audience.
- Adapt the design and color palette based on the context:
    - For playful or informal topics (e.g., toys, games), use brighter, more vibrant colors.
    - For serious or professional topics (e.g., business, finance), use a more subdued and professional color palette.
    - If the user specifies colors or design preferences, prioritize those instructions above general contextual adaptation.

**User Input Handling:**
- Always prioritize explicit instructions given by the user regarding colors, layout, specific elements, or desired features.
- If the user provides examples or references, use them as inspiration but do not directly copy them unless explicitly asked.

**Important Reminders:**
- Focus exclusively on generating HTML. Do not include any Markdown formatting, code block delimiters, or conversational text in your response.
- Strive for high-quality, production-ready HTML that a developer could directly implement.
- When in doubt, prioritize clarity, simplicity, and effectiveness in design and code.
- Ensure all interactive elements have proper focus states for accessibility.
- Implement proper loading states and transitions for dynamic content.

</SYSTEM_INSTRUCTIONS>

<USER_PROMPT>
`;

async function generateWithGemini(prompt: string) {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_KEY;
    if (!apiKey) {
        console.error("Gemini API key is not defined");
        return null;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: SYSTEM_PROMPT + prompt }] }],
        });
        
        if (result.response && result.response.candidates && result.response.candidates.length > 0) {
            const response = result.response.candidates[0].content.parts[0].text;
            if (response) {
                return extractHTML(response);
            }
        }
        return null;
    } catch (error) {
        console.error("Error generating content with Gemini:", error);
        return null;
    }
}

async function generateWithClaude(prompt: string) {
    const apiKey = process.env.NEXT_PUBLIC_CLAUDE_KEY;
    if (!apiKey) {
        console.error("Claude API key is not defined");
        return null;
    }

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
            },
            body: JSON.stringify({
                model: 'claude-3-sonnet-20240229',
                max_tokens: 4000,
                messages: [{
                    role: 'user',
                    content: SYSTEM_PROMPT + prompt
                }]
            })
        });

        const data = await response.json();
        if (data.content && data.content[0] && data.content[0].text) {
            return extractHTML(data.content[0].text);
        }
        return null;
    } catch (error) {
        console.error("Error generating content with Claude:", error);
        return null;
    }
}

async function generateWithDeepSeek(prompt: string) {
    const apiKey = process.env.NEXT_PUBLIC_DEEPSEEK_KEY;
    if (!apiKey) {
        console.error("DeepSeek API key is not defined");
        return null;
    }

    try {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [{
                    role: 'user',
                    content: SYSTEM_PROMPT + prompt
                }]
            })
        });

        const data = await response.json();
        if (data.choices && data.choices[0] && data.choices[0].message) {
            return extractHTML(data.choices[0].message.content);
        }
        return null;
    } catch (error) {
        console.error("Error generating content with DeepSeek:", error);
        return null;
    }
}

async function generateWithChatGPT(prompt: string) {
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_KEY;
    if (!apiKey) {
        console.error("OpenAI API key is not defined");
        return null;
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-4-turbo-preview',
                messages: [{
                    role: 'user',
                    content: SYSTEM_PROMPT + prompt
                }]
            })
        });

        const data = await response.json();
        if (data.choices && data.choices[0] && data.choices[0].message) {
            return extractHTML(data.choices[0].message.content);
        }
        return null;
    } catch (error) {
        console.error("Error generating content with ChatGPT:", error);
        return null;
    }
}

function extractHTML(text: string): string | null {
    const cleanedText = text.replace(/```html/g, '').replace(/```/g, '').trim();
    const firstTagIndex = cleanedText.indexOf('<');
    const lastTagIndex = cleanedText.lastIndexOf('>');
    if (firstTagIndex !== -1 && lastTagIndex !== -1 && firstTagIndex < lastTagIndex) {
        return cleanedText.substring(firstTagIndex, lastTagIndex + 1).trim();
    }
    return cleanedText;
}

export async function generate(prompt: string, model: LLMModel = 'gemini') {
    switch (model) {
        case 'gemini':
            return generateWithGemini(prompt);
        case 'claude':
            return generateWithClaude(prompt);
        case 'deepseek':
            return generateWithDeepSeek(prompt);
        case 'chatgpt':
            return generateWithChatGPT(prompt);
        default:
            return generateWithGemini(prompt);
    }
}