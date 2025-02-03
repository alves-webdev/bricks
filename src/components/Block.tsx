// components/Block.tsx
import { Rnd } from "react-rnd";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BlockData, Shard } from "@/stores/useDragAndDropStore ";

interface BlockProps {
  block: BlockData;
  removeBlock: (blockId: number) => void;
  updateBlock: (updatedBlock: BlockData) => void;
}

const Block = ({ block, removeBlock, updateBlock }: BlockProps) => {
  const addElement = () => {
    const newElement: Shard = {
      id: Date.now(),
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      zIndex: block.elements.length + 1,
    };
    updateBlock({ ...block, elements: [...block.elements, newElement] });
  };

  const updateElement = (elementId: number, data: Partial<Shard>) => {
    const updatedElements = block.elements.map((element) =>
      element.id === elementId ? { ...element, ...data } : element
    );
    updateBlock({ ...block, elements: updatedElements });
  };

  const changeZIndex = (elementId: number, direction: "up" | "down") => {
    const elements = [...block.elements];
    const index = elements.findIndex((el) => el.id === elementId);
    if (index === -1) return;

    const swapIndex = direction === "up" ? index + 1 : index - 1;
    if (swapIndex < 0 || swapIndex >= elements.length) return;

    [elements[index], elements[swapIndex]] = [elements[swapIndex], elements[index]];
    elements.forEach((el, idx) => {
      el.zIndex = idx + 1;
    });

    updateBlock({ ...block, elements });
  };

  return (
    <Card className="p-4 bg-gray-50 border relative">
      <div className="mb-4 flex justify-between items-center">
        <h3>Block {block.id}</h3>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => removeBlock(block.id)}
        >
          Remove Block
        </Button>
      </div>
      <div
        className="relative w-full h-[400px] bg-gray-100 rounded-xl border border-gray-300 overflow-hidden"
        style={{ position: "relative" }}
      >
        {block.elements.map((element) => (
          <Rnd
            key={element.id}
            size={{ width: element.width, height: element.height }}
            position={{ x: element.x, y: element.y }}
            style={{ zIndex: element.zIndex }}
            onDragStop={(e, d) =>
              updateElement(element.id, { x: d.x, y: d.y })
            }
            onResizeStop={(e, direction, ref, delta, position) => {
              updateElement(element.id, {
                width: ref.offsetWidth,
                height: ref.offsetHeight,
                ...position,
              });
            }}
            bounds="parent"
            className="border border-gray-400 bg-white shadow-md"
          >
            <div className="w-full h-full flex items-center justify-center relative">
              <Button
                size="sm"
                className="absolute top-0 right-0 m-1"
                onClick={() =>
                  updateBlock({
                    ...block,
                    elements: block.elements.filter((el) => el.id !== element.id),
                  })
                }
              >
                ✕
              </Button>
              <div className="absolute bottom-0 left-0 flex gap-1 p-1">
                <Button size="sm" onClick={() => changeZIndex(element.id, "up")}>
                  ↑
                </Button>
                <Button size="sm" onClick={() => changeZIndex(element.id, "down")}>
                  ↓
                </Button>
              </div>
              Resizable & Draggable
            </div>
          </Rnd>
        ))}
      </div>
      <Button className="mt-4" onClick={addElement}>
        Add Element
      </Button>
    </Card>
  );
};

export default Block;
