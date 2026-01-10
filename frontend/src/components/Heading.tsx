import React from "react";
import { cn } from "@/utils/cn"; // Import the cn utility

interface HeadingProps {
  text: string;
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  textColor?: string;
  textSize?: string;
  fontWeight?: string;
}

const Heading: React.FC<HeadingProps> = ({
  text,
  level = "h2",
  textColor = "text-primary",
  textSize = "text-4xl",
  fontWeight = "font-bold",
}) => {
  const Tag = level;
  return (
    <Tag
      className={cn(
        "text-center", // Always centered
        textColor,
        textSize,
        fontWeight
      )}
    >
      {text}
    </Tag>
  );
};

export default Heading;
