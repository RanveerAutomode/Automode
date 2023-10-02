"use Client"

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import AddIcon from "@/public/outline-icons/add-filter-icon.svg";
import CloseIcon from "@/public/outline-icons/close-circle.svg";
import Input from "../input/Input";

type TagInputProps = {
    label?: string;
    onChange?: ((checked: any) => void);
    value?: string;
};

const inputTagSelectData = [
    {name: "Parth Goswami", id: 1, email: "parthgoswami@automode.ai"},
    {name: "Ranveer Singh", id: 2, email: "ranveersingh@automode.ai"},
    {name: "Vikas Jyani", id: 3, email: "vikasjyani@automode.ai"}
]

const TagInput: React.FC<TagInputProps> = ({ label, value }) => {
    const [tagData, setTagData] = useState<string[]>([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef(null);

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && inputValue.trim() !== "") {
            setTagData((prevTagData) => [...prevTagData, inputValue.trim()]);
            setInputValue("");
        }
    };

    const handleAddClick = () => {
        if (inputValue.trim() !== "") {
            setTagData((prevTagData) => [...prevTagData, inputValue.trim()]);
            setInputValue("");
        }
    }

    const handleTagRemove = (index: number) => {
        setTagData((prevTagData) => prevTagData.filter((_, i) => i !== index));
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (inputRef.current && !(inputRef.current as any).contains(event.target)) {
                setInputVisible(false);
            }
        };

        window.addEventListener("mousedown", handleOutsideClick);

        return () => {
            window.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <div className="flex items-center gap-2">
            <div className="w-max flex gap-2 max-w-[460px] flex-wrap">
                {tagData.map((tag, index) => (
                    <div key={index} className="flex items-center py-[5px] px-2 text-secondary-700 font-medium text-b2">
                        <span className="text-sm text-gray-600">{tag}</span>
                        <Image
                            src={CloseIcon}
                            alt="icon"
                            className="ml-2 cursor-pointer"
                            onClick={() => handleTagRemove(index)}
                        />
                    </div>
                ))}
            </div>
            <div ref={inputRef} className="flex items-center">
            {inputVisible && (
                <Input
                    type="text"
                    className="!w-max !min-w-2"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                />
                
            )}
            <Image src={AddIcon} alt="icon" onClick={() => {setInputVisible(true); handleAddClick() }} className="cursor-pointer"/>
            </div>
        </div>
    );
};

export default TagInput;