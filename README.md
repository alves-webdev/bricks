# Bricks AI - Landing Page Generator

Bricks AI is an open-source project that helps you generate beautiful landing pages using AI technology. Built with Next.js, it streamlines the process of creating professional landing pages for your projects.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Setting up AI Models

Bricks AI supports multiple language models to generate your landing pages. You can choose to use any of the following:

### Google Gemini
1. Visit the [Google AI Studio](https://makersuite.google.com/app/apikey) to get your API key
2. Add to your `.env.local`:
   ```env
   NEXT_PUBLIC_GEMINI_KEY=your_api_key_here
   ```

### OpenAI GPT-4
1. Get your API key from [OpenAI's platform](https://platform.openai.com/api-keys)
2. Add to your `.env.local`:
   ```env
   NEXT_PUBLIC_OPENAI_KEY=your_api_key_here
   ```

### Anthropic Claude
1. Get your API key from [Anthropic's console](https://console.anthropic.com/)
2. Add to your `.env.local`:
   ```env
   NEXT_PUBLIC_CLAUDE_KEY=your_api_key_here
   ```

You can configure one or more of these models - Bricks AI will use whichever ones you have set up.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
