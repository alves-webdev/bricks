"use client";

import { useState } from "react";
import { useInputStore } from "@/store/inputs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { X, Image as ImageIcon } from "lucide-react";

export default function ImageInput() {
    const { images, addImage, removeImage } = useInputStore();
    const [url, setUrl] = useState("");

    const handleAddImage = () => {
        if (url.trim()) {
            addImage(url.trim());
            setUrl("");
        }
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label className="text-sm text-gray-600 dark:text-gray-400">
                    Image Links
                </Label>
                <div className="flex gap-2">
                    <Input
                        type="url"
                        placeholder="Enter image URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="flex-1"
                    />
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={handleAddImage}
                        disabled={!url.trim()}
                    >
                        <ImageIcon className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {images.map((imageUrl, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={imageUrl}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg"
                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                    const target = e.currentTarget;
                                    target.src = "https://via.placeholder.com/300x200?text=Invalid+Image";
                                }}
                            />
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeImage(index)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
} 