//src/app/page.tsx


import ChatInput from "@/components/ChatInput";
import LandingSkeleton from "@/components/LandingSkeleton";

 export default function Home() {
  return (
    <div>
      <LandingSkeleton/>
      <ChatInput />
    </div>
  );
}
