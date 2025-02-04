// pages/DragAndDropPage.tsx
"use client";

import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Block from "./Block";
import { useDragAndDropStore } from "@/stores/useDragAndDropStore";
import { useUserStore } from "@/stores/useUserStore";
import { supabase } from "@/lib/supabaseClient";

const DragAndDropPage = () => {
  // Access blocks state and functions from the drag-and-drop store.
  const blocks = useDragAndDropStore((state) => state.blocks);
  const addBlock = useDragAndDropStore((state) => state.addBlock);
  const removeBlock = useDragAndDropStore((state) => state.removeBlock);
  const updateBlock = useDragAndDropStore((state) => state.updateBlock);

  // Access user state. In a real app, you’d probably load the user info upon login.
  const { userId, currentPage, setUser, updateCurrentPageBlocks } = useUserStore();

  // For demonstration, if there’s no user, we set one with an initial page.
  useEffect(() => {
    if (!userId) {
      // Initialize with a dummy user (id 1) and one page.
      setUser(1, [{ id: Date.now(), name: "Page 1", blocks }]);
    }
  }, [userId, setUser, blocks]);

  // Whenever blocks change, update the current page in the user store.
  useEffect(() => {
    updateCurrentPageBlocks(blocks);
  }, [blocks, updateCurrentPageBlocks]);

  // Save handler: writes the current page’s blocks to Supabase.
  const handleSave = async () => {
    if (!currentPage || !userId) {
      console.error("User or current page not set.");
      return;
    }
    const { data, error } = await supabase
      .from('pages')
      .upsert({
        id: currentPage.id,
        user_id: userId,
        blocks, // Save the blocks state as JSON (ensure your column is of type JSONB)
      });
    if (error) {
      console.error("Error saving page:", error);
    } else {
      console.log("Page saved successfully:", data);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F4F1DE] text-[#3D405B]">
      <Header />
      <div className="flex-1 overflow-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Manage Blocks</h2>
          <div className="space-x-2">
            <Button onClick={addBlock} className="bg-[#81B29A] text-white">
              Add Block
            </Button>
            <Button onClick={handleSave} className="bg-blue-500 text-white">
              Save
            </Button>
          </div>
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
