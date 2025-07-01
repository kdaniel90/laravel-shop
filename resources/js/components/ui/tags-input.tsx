import React, {useState, ChangeEvent} from "react";
import {Input} from '@/components/ui/input';
import {NullableIdAndName} from "@/types";

interface TagInterface {
    tags: NullableIdAndName[];
    addTag: (tag: string) => void;
    removeTag: (tag: string) => void;
    inputName?: string,
}

export const TagsInput = ({tags, addTag, removeTag, inputName = 'tags-input'}: TagInterface) => {

    const [userInput, setUserInput] = useState<string>("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent form submission or new line creation
            addTag(userInput);
            setUserInput(""); // Clear the input after adding a tag
        }
    };

    return (
        <div className="flex flex-col">
            <Input
                name={inputName}
                type="text"
                placeholder="Add attribute values"
                className="w-full border border-gray-300 rounded-md px-4 py-2"
                onKeyDown={handleKeyPress}
                onChange={handleInputChange}
                value={userInput}
            />
            <div className="flex flex-row flex-wrap gap-3 mt-4">
                {tags.map((tag: NullableIdAndName, index: number) => (
                    <span
                        key={`${index}-${tag.id}`}
                        className="inline-flex items-start justify-start px-3 py-2 rounded-[32px] text-sm shadow-sm font-medium bg-blue-100 text-blue-800 mr-2"
                    >
                        {tag.name}
                        <button
                            className="ml-2 hover:text-blue-500"
                            onClick={() => removeTag(tag.name)}
                            title={`Remove ${tag.name}`}
                        >
                        &times;
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
};
