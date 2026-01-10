import React from "react";
import { cn } from "@/utils/cn";

interface TextBlockProps {
  content: string;
  textSize?: string;
  textColor?: string;
}

const TextBlock: React.FC<TextBlockProps> = ({
  content,
  textSize = "text-xl",
  textColor = "text-gray-600",
}) => {
  return (
    <div
      className={cn(
        "prose max-w-none text-center",
        textSize,
        textColor
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default TextBlock;
