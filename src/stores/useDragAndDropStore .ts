// store/useDragAndDropStore.ts
import { create } from "zustand";

export interface Shard {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;
}

export interface BlockData {
    id: number;
    elements: Shard[];
}

const initialData: BlockData[] = [
    {
        id: 1,
        elements: [
            { id: 101, x: 50, y: 50, width: 100, height: 100, zIndex: 1 },
            { id: 102, x: 200, y: 100, width: 150, height: 150, zIndex: 2 },
        ],
    },
    {
        id: 2,
        elements: [
            { id: 201, x: 100, y: 200, width: 120, height: 120, zIndex: 1 },
        ],
    },
    {
        id: 3,
        elements: [
            { id: 301, x: 300, y: 300, width: 200, height: 100, zIndex: 1 },
        ],
    },
];

interface DragAndDropStore {
    blocks: BlockData[];
    addBlock: () => void;
    removeBlock: (blockId: number) => void;
    updateBlock: (updatedBlock: BlockData) => void;
}

export const useDragAndDropStore = create<DragAndDropStore>((set, get) => ({
    blocks: initialData,
    addBlock: () => {
        const newBlock: BlockData = {
            id: Date.now(),
            elements: [
                {
                    id: Date.now() + 1,
                    x: 50,
                    y: 50,
                    width: 100,
                    height: 100,
                    zIndex: 1,
                },
            ],
        };
        set({ blocks: [...get().blocks, newBlock] });
    },
    removeBlock: (blockId: number) =>
        set({ blocks: get().blocks.filter((block) => block.id !== blockId) }),
    updateBlock: (updatedBlock: BlockData) =>
        set({
            blocks: get().blocks.map((block) =>
                block.id === updatedBlock.id ? updatedBlock : block
            ),
        }),
}));
