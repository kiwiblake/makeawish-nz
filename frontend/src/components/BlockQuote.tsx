import React from "react";
import { Quote } from "lucide-react";

interface Props {
  quote?: string; // Made optional for placeholder default
  author?: string;
  source?: string;
  backgroundColor?: string; // e.g., 'bg-blue-100'
  textColor?: string;       // e.g., 'text-gray-800'
  quoteColor?: string;      // e.g., 'text-primary'
}

export const BlockQuote: React.FC<Props> = ({
  quote = "Placeholder: This is where the inspiring quote will go. It speaks to the heart of our mission, offering hope and strength.", // Default placeholder
  author = "Placeholder Author", // Default placeholder
  source = "Placeholder Source (Title/Org)", // Default placeholder
  backgroundColor = "bg-secondary/10", // Brand light teal background
  textColor = "text-foreground",
  quoteColor = "text-primary", // Brand blue icon
}) => {
  return (
    <div className={`p-8 rounded-lg shadow-md ${backgroundColor}`}>
      <Quote className={`w-12 h-12 mb-4 ${quoteColor}`} aria-hidden="true" />
      <blockquote className={`text-xl italic ${textColor} mb-4`}>
        "{quote}"
      </blockquote>
      {(author || source) && (
        <footer className={`text-right ${textColor}`}>
          {author && <p className="font-semibold">{author}</p>}
          {source && <p className="text-sm text-muted-foreground mt-1">{source}</p>}
        </footer>
      )}
    </div>
  );
};
