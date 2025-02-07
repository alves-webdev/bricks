// src/store/page.ts
import { create } from 'zustand';

interface PageState {
    html: string;
    loading: boolean;
    setHtml: (html: string) => void;
    setLoading: (isLoading: boolean) => void;
}

export const usePageStorage = create<PageState>()((set) => ({
    html: '', // Initialize as empty string
    loading: false,
    setHtml: (html) => set({ html }), // Simplified setHtml
    setLoading: (isLoading) => set({ loading: isLoading }), // Simplified setLoading
}));
