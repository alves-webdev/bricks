"use client";

import { Button } from "./ui/button";
import { useModelStore, type LLMModel } from "@/store/model";
import { 
  Brain, 
  Bot, 
  Sparkles, 
  MessageSquare 
} from "lucide-react";

const models: { id: LLMModel; name: string; icon: React.ReactNode }[] = [
  { id: 'gemini', name: 'Gemini', icon: <Sparkles className="h-4 w-4" /> },
  { id: 'claude', name: 'Claude', icon: <Brain className="h-4 w-4" /> },
  { id: 'deepseek', name: 'DeepSeek', icon: <Bot className="h-4 w-4" /> },
  { id: 'chatgpt', name: 'ChatGPT', icon: <MessageSquare className="h-4 w-4" /> },
];

export default function ModelSelector() {
  const { selectedModel, setSelectedModel } = useModelStore();

  return (
    <div className="flex items-center gap-2">
      {models.map((model) => (
        <Button
          key={model.id}
          variant={selectedModel === model.id ? "default" : "outline"}
          size="sm"
          className="gap-2"
          onClick={() => setSelectedModel(model.id)}
        >
          {model.icon}
          {model.name}
        </Button>
      ))}
    </div>
  );
} 