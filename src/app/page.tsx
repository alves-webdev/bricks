"use client";
//src/app/page.tsx

import ChatInput from "@/components/ChatInput";
import LandingSkeleton from "@/components/LandingSkeleton";
import ModelSelector from "@/components/ModelSelector";
import { generate } from "@/lib/gemini";
import { usePageStorage } from "@/store/page";
import { useModelStore } from "@/store/model";

export default function Home() {
  const { html, loading, setHtml, setLoading } = usePageStorage();
  const { selectedModel } = useModelStore();

  const handleGenerate = async (prompt: string) => {
    setLoading(true);
    try {
      const generatedHtml = await generate(prompt, selectedModel);
      if (generatedHtml) {
        setHtml(generatedHtml);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="py-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">Create Beautiful</span>
            <span className="block text-brick-accent">Landing Pages</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Generate stunning landing pages instantly using AI. Just describe what you want, and we'll create it for you.
          </p>
          <div className="mt-6 flex justify-center">
            <ModelSelector />
          </div>
        </div>

        {/* Preview Section */}
        <div className="mt-8 mb-24">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
            {loading ? (
              <LandingSkeleton />
            ) : html ? (
              <div 
                className="animate-fade-in"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : (
              <div className="h-96 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <p className="text-lg">Your generated landing page will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ChatInput onGenerate={handleGenerate} />
    </main>
  );
}
