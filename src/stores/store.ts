import { create } from 'zustand';

interface Shard {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;
}

export interface Block {
    id: number;
    elements: Shard[];
}

interface Page {
    id: number;
    blocks: Block[];
}

interface StoreState {
    pages: Page[];
    addPage: () => void;
    addBlock: (pageId: number) => void;
    removeBlock: (pageId: number, blockId: number) => void;
    addElement: (pageId: number, blockId: number) => void;
    updateElement: (pageId: number, blockId: number, elementId: number, data: Partial<Shard>) => void;
}

export const usePagesStore = create<StoreState>((set) => ({
    pages: [{ id: 1, blocks: [] }],

    addPage: () => set((state) => ({ pages: [...state.pages, { id: Date.now(), blocks: [] }] })),

    addBlock: (pageId) =>
        set((state) => ({
            pages: state.pages.map((page) =>
                page.id === pageId
                    ? { ...page, blocks: [...page.blocks, { id: Date.now(), elements: [] }] }
                    : page
            ),
        })),

    removeBlock: (pageId, blockId) =>
        set((state) => ({
            pages: state.pages.map((page) =>
                page.id === pageId
                    ? { ...page, blocks: page.blocks.filter((block) => block.id !== blockId) }
                    : page
            ),
        })),

    addElement: (pageId, blockId) =>
        set((state) => ({
            pages: state.pages.map((page) =>
                page.id === pageId
                    ? {
                        ...page,
                        blocks: page.blocks.map((block) =>
                            block.id === blockId
                                ? { ...block, elements: [...block.elements, { id: Date.now(), x: 50, y: 50, width: 100, height: 100, zIndex: 1 }] }
                                : block
                        ),
                    }
                    : page
            ),
        })),

    updateElement: (pageId, blockId, elementId, data) =>
        set((state) => ({
            pages: state.pages.map((page) =>
                page.id === pageId
                    ? {
                        ...page,
                        blocks: page.blocks.map((block) =>
                            block.id === blockId
                                ? {
                                    ...block,
                                    elements: block.elements.map((element) =>
                                        element.id === elementId ? { ...element, ...data } : element
                                    ),
                                }
                                : block
                        ),
                    }
                    : page
            ),
        })),
}));
