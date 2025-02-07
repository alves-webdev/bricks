"use client";
//src/app/page.tsx

import ChatInput from "@/components/ChatInput";
import LandingSkeleton from "@/components/LandingSkeleton";
import { generate } from "@/lib/gemini";
import { usePageStorage } from "@/store/page";

export default function Home() {
  const { html, loading, setHtml, setLoading } = usePageStorage();

  const handleGenerate = async (prompt: string) => {
    setLoading(true); // Set loading to true *before* calling generate
    try {
      const generatedHtml = await generate(prompt);
      if (generatedHtml) {
        setHtml(generatedHtml);
      }
    } finally {
      setLoading(false); // Set loading to false *after* generate completes, even if it errors
    }
  };

  return (
    <div>
      {loading && <LandingSkeleton />}
      {!loading && html && <div dangerouslySetInnerHTML={{ __html: html }} />}

      <ChatInput onGenerate={handleGenerate} />
    </div>
  );
}
