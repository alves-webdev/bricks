"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useInputStore } from "@/store/inputs";
import ColorPicker from "./ColorPicker";
import ImageInput from "./ImageInput";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ChatInputProps {
  onGenerate: (prompt: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onGenerate }) => {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { colors, images, clearInputs } = useInputStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim()) {
      const prompt = `${message.trim()}\n\nColors:\n${Object.entries(colors)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n")}\n\nImages:\n${images.join("\n")}`;
      onGenerate(prompt);
      setMessage("");
      clearInputs();
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4">
      <Card className="p-4 shadow-lg border-brick-border dark:border-brick-darkborder">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Describe your landing page... (e.g., 'Create a modern landing page for a tech startup with a dark theme')"
              className={`
                w-full h-32 p-4 
                bg-white dark:bg-gray-800
                text-gray-900 dark:text-gray-100
                placeholder-gray-400 dark:placeholder-gray-500
                border rounded-lg
                focus:outline-none focus:ring-2 focus:ring-brick-accent
                transition-all duration-200
                resize-none
                ${isFocused ? 'shadow-lg' : 'shadow-sm'}
              `}
            />
            <div className="absolute right-4 bottom-4 flex items-center gap-2">
              <span className="text-sm text-gray-400 dark:text-gray-500">
                {message.length}/500
              </span>
              <Button
                type="submit"
                disabled={!message.trim()}
                className={`
                  bg-brick-accent hover:bg-brick-accent/90
                  text-white font-semibold
                  px-6 py-2
                  rounded-full
                  shadow-md
                  transition-all duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${!message.trim() ? 'hover:bg-brick-accent' : ''}
                `}
              >
                Generate
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="w-full flex items-center justify-between"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <span>Advanced Options</span>
              {showAdvanced ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>

            {showAdvanced && (
              <div className="space-y-6 pt-4 border-t">
                <ColorPicker />
                <ImageInput />
              </div>
            )}
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Tip: Be specific about your requirements for better results
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ChatInput;
