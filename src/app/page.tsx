"use client"; // This line is crucial

import ChatInput from "@/components/ChatInput";
import LandingSkeleton from "@/components/LandingSkeleton";
import { generate } from "@/lib/gemini";

export default function Home() {
  return (
    <div>
      <div onClick={() => generate("fala oi")}>aqui</div>
      <LandingSkeleton />
      <ChatInput />
    </div>
  );
}
