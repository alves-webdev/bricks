"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Block from "./Block";
import Header from "@/components/Header";

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
    <div className="flex flex-col h-screen bg-[#F4F1DE] text-[#3D405B]">
      <Header />
      <div className="flex-1 overflow-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Manage Blocks</h2>
          <Button onClick={addBlock} className="bg-[#81B29A] text-white">Add Block</Button>
        </div>
        <div className="grid gap-4 auto-rows-min">
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
    </div>
  );
};

export default DragAndDropPage;
