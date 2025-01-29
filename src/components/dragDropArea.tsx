'use client'

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Block from "./Block";

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

const DragAndDropPage = () => {
  const [blocks, setBlocks] = useState<BlockData[]>(initialData);

  const addBlock = () => {
    const newBlock: BlockData = {
      id: Date.now(),
      elements: [{ id: Date.now() + 1, x: 50, y: 50, width: 100, height: 100, zIndex: 1 }],
    };
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (blockId: number) => {
    setBlocks(blocks.filter((block) => block.id !== blockId));
  };

const updateBlock = (updatedBlock: BlockData) => {
  setBlocks(
    blocks.map((block) =>
      block.id === updatedBlock.id
        ? { ...updatedBlock, elements: updatedBlock.elements.map(el => ({ ...el })) }
        : block
    )
  );
};

  return (
    <div className="p-4 space-y-4">
      <Card className="mb-4 p-4 flex gap-4">
        <Button onClick={addBlock}>Add Block</Button>
      </Card>
      <div className="space-y-4 overflow-y-auto h-[80vh]">
        {blocks.map((block) => (
          <Block
            key={block.id}
            block={block}
            removeBlock={removeBlock}
            updateBlock={updateBlock}
          />
        ))}
      </div>
    </div>
  );
};

export default DragAndDropPage;
