"use client";
import React, { useState } from "react";

interface ChatInputProps {
  onGenerate: (prompt: string) => Promise<void>;
}

const ChatInput: React.FC<ChatInputProps> = ({ onGenerate }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onGenerate(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4"
    >
      <div className="relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your prompt..."
          className={`
            w-full h-36 p-4 
            border border-brick-border dark:border-brick-darkborder 
            rounded-lg 
            bg-white dark:bg-brick-dark 
            text-gray-800 dark:text-gray-100 
            placeholder-gray-400 dark:placeholder-gray-300 
            resize-none 
            focus:outline-none focus:ring-2 focus:ring-brick-accent 
            transition
          `}
        />
        <button
          type="submit"
          className={`
            absolute right-4 bottom-4 
            bg-brick-accent hover:bg-brick-accent/90 
            text-white font-semibold 
            px-6 py-2 rounded-full 
            shadow 
            focus:outline-none focus:ring-2 focus:ring-brick-accent 
            transition
          `}
        >
          CREATE
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
