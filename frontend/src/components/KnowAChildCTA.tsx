import React from 'react';
import { Link } from 'react-router-dom';
import { Builder } from '@builder.io/react';

interface Props {
  title: string; // Use richText for potential line breaks
  buttonText: string;
  buttonLink: string;
  backgroundColor?: string; // Use Builder color picker
  textColor?: string; // Use Builder color picker
  buttonBgColor?: string; // Use Builder color picker
  buttonTextColor?: string; // Use Builder color picker
}

export const KnowAChildCTA: React.FC<Props> = ({
  title = "Do you know a child fighting a critical illness,<br />who could benefit from a life-changing wish?",
  buttonText = "Apply for a Wish",
  buttonLink = "/apply-for-a-wish",
  backgroundColor = '#1d4ed8', // Default blue-700
  textColor = '#ffffff', // Default white
  buttonBgColor = 'bg-destructive', // Brand Red
  buttonTextColor = 'text-destructive-foreground' // Contrast color for red
}) => {
  return (
    <section className="py-12" style={{ backgroundColor }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between md:flex-row gap-6">
          <div className="md:mr-8 text-center md:text-left">
            <h2 
              className="text-2xl md:text-3xl font-bold"
              style={{ color: textColor }} 
              // Render title - use dangerouslySetInnerHTML for Builder rich text
              dangerouslySetInnerHTML={{ __html: Builder.isEditing || Builder.isPreviewing ? title || '' : title }}
            />
          </div>
          <div className="flex-shrink-0">
            <Link
              to={buttonLink}
              // REMOVE: Inline style for button colors
              // style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
              // ADD: Tailwind classes for button colors
              className={`inline-block font-medium px-8 py-3 rounded-full transition duration-300 hover:opacity-90 ${buttonBgColor || 'bg-destructive'} ${buttonTextColor || 'text-destructive-foreground'}`}
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
