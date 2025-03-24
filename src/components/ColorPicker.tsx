"use client";

import { useInputStore } from "@/store/inputs";
import { Label } from "./ui/label";

const colorLabels = {
    primary: "Primary Color",
    secondary: "Secondary Color",
    accent: "Accent Color",
    background: "Background Color",
};

export default function ColorPicker() {
    const { colors, setColors } = useInputStore();

    return (
        <div className="grid grid-cols-2 gap-4">
            {Object.entries(colorLabels).map(([key, label]) => (
                <div key={key} className="space-y-2">
                    <Label className="text-sm text-gray-600 dark:text-gray-400">
                        {label}
                    </Label>
                    <div className="flex items-center gap-2">
                        <input
                            type="color"
                            value={colors[key as keyof typeof colors]}
                            onChange={(e) => setColors({ [key]: e.target.value })}
                            className="w-8 h-8 rounded cursor-pointer"
                        />
                        <input
                            type="text"
                            value={colors[key as keyof typeof colors]}
                            onChange={(e) => setColors({ [key]: e.target.value })}
                            className="flex-1 px-2 py-1 text-sm border rounded dark:bg-gray-800 dark:border-gray-700"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
} 