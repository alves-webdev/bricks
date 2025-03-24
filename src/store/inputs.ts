import { create } from 'zustand';

interface InputState {
    colors: {
        primary: string;
        secondary: string;
        accent: string;
        background: string;
    };
    images: string[];
    setColors: (colors: Partial<InputState['colors']>) => void;
    addImage: (url: string) => void;
    removeImage: (index: number) => void;
    clearInputs: () => void;
}

export const useInputStore = create<InputState>()((set) => ({
    colors: {
        primary: '#3B82F6',
        secondary: '#6B7280',
        accent: '#10B981',
        background: '#FFFFFF',
    },
    images: [],
    setColors: (colors) => set((state) => ({ 
        colors: { ...state.colors, ...colors } 
    })),
    addImage: (url) => set((state) => ({ 
        images: [...state.images, url] 
    })),
    removeImage: (index) => set((state) => ({
        images: state.images.filter((_, i) => i !== index)
    })),
    clearInputs: () => set({
        colors: {
            primary: '#3B82F6',
            secondary: '#6B7280',
            accent: '#10B981',
            background: '#FFFFFF',
        },
        images: [],
    }),
})); 