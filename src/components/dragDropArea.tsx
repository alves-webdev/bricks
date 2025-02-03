// pages/DragAndDropPage.tsx (or your corresponding file)
"use client";

import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Block from "./Block";
import { useDragAndDropStore } from "@/stores/useDragAndDropStore "

const DragAndDropPage = () => {
  // Access blocks and methods from the Zustand store
  const blocks = useDragAndDropStore((state) => state.blocks);
  const addBlock = useDragAndDropStore((state) => state.addBlock);
  const removeBlock = useDragAndDropStore((state) => state.removeBlock);
  const updateBlock = useDragAndDropStore((state) => state.updateBlock);

  return (
    <div className="flex flex-col h-screen bg-[#F4F1DE] text-[#3D405B]">
      <Header />
      <div className="flex-1 overflow-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Manage Blocks</h2>
          <Button onClick={addBlock} className="bg-[#81B29A] text-white">
            Add Block
          </Button>
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
