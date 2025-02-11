"use client";
import React, { useState } from "react";

interface ChatInputProps {
  onGenerate: (prompt: string) => Promise<void>; // Add a prop for the generate function
}

const ChatInput: React.FC<ChatInputProps> = ({ onGenerate }) => {
  // Use the prop
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onGenerate(message); // Call the passed function
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
          className="w-full h-36 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          type="submit"
          className="absolute right-4 bottom-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          CREATE
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
