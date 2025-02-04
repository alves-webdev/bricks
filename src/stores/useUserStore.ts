// store/useUserStore.ts
import { create } from 'zustand';
import { BlockData } from './useDragAndDropStore';

export interface Page {
    id: number;
    name: string;
    blocks: BlockData[];
}

interface UserStore {
    userId: number | null;
    pages: Page[];
    currentPage: Page | null;
    setUser: (id: number, pages: Page[]) => void;
    addPage: (page: Page) => void;
    setCurrentPage: (pageId: number) => void;
    updateCurrentPageBlocks: (blocks: BlockData[]) => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
    userId: null,
    pages: [],
    currentPage: null,
    // When you set the user, you can pre-load their pages.
    setUser: (id, pages) =>
        set({ userId: id, pages, currentPage: pages[0] || null }),
    addPage: (page) =>
        set((state) => ({
            pages: [...state.pages, page],
            // Optionally set as current if none exists.
            currentPage: state.currentPage || page,
        })),
    setCurrentPage: (pageId) => {
        const page = get().pages.find((p) => p.id === pageId) || null;
        set({ currentPage: page });
    },
    updateCurrentPageBlocks: (blocks) => {
        const { currentPage, pages } = get();
        if (!currentPage) return;
        const updatedPage = { ...currentPage, blocks };
        set({
            currentPage: updatedPage,
            pages: pages.map((page) =>
                page.id === currentPage.id ? updatedPage : page
            ),
        });
    },
}));
