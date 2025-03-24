import { create } from 'zustand';

export type LLMModel = 'gemini' | 'claude' | 'deepseek' | 'chatgpt';

interface ModelState {
    selectedModel: LLMModel;
    setSelectedModel: (model: LLMModel) => void;
}

export const useModelStore = create<ModelState>()((set) => ({
    selectedModel: 'gemini',
    setSelectedModel: (model) => set({ selectedModel: model }),
})); 