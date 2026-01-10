import React from 'react';
import { Link } from 'react-router-dom';
import { Builder } from '@builder.io/react';

interface Props {
  title: string;
  titleColor?: string; // Tailwind class
  text: string; // Use richText from Builder
  bodyColor?: string; // Tailwind class
  bulletPointsText?: string; // Optional multi-line string for bullet points
  richTextBelowBullets?: string; // Optional rich text below bullets
  bulletColor?: string; // Tailwind class
  imageUrl: string;
  imageAlt: string;
  buttonText?: string; // Optional button
  buttonLink?: string; // Optional button link
  reverseLayout?: boolean; // To alternate image/text position
  backgroundColor?: string; // Optional Tailwind background class, e.g., 'bg-background' or 'bg-muted'
}

export const InfoSectionWithImage: React.FC<Props> = ({
  title = "Default Title",
  titleColor = "text-primary", // Default title color
  text = "<p>Default paragraph text. Replace this in the Builder editor.</p>",
  bodyColor = "text-foreground", // Default body text color
  bulletPointsText = "", // Default to empty string
  richTextBelowBullets = "", // Default to empty
  bulletColor = "text-foreground", // Default bullet text color
  imageUrl = "https://via.placeholder.com/600x400.png?text=Placeholder+Image",
  imageAlt = "Placeholder Image",
  buttonText,
  buttonLink,
  reverseLayout = false,
  backgroundColor = 'bg-background' // Default to page background
}) => {
  const textOrder = reverseLayout ? 'lg:order-1' : 'lg:order-2';
  const imageOrder = reverseLayout ? 'lg:order-2' : 'lg:order-1';

  // Split bullet points string into an array, filtering out empty lines
  const bulletList = bulletPointsText ? bulletPointsText.split('\n').filter(point => point.trim() !== '') : [];

  return (
    <section className={`py-16 ${backgroundColor || 'bg-background'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Text Section */}
          <div className={`w-full lg:w-7/12 ${textOrder}`}>
            <h2 className={`text-3xl md:text-4xl font-bold ${titleColor} mb-6`}>
              {title}
            </h2>
            {/* Render rich text content */}
            <div 
              className={`prose prose-lg max-w-none ${bodyColor} mb-6`}
              dangerouslySetInnerHTML={{ __html: Builder.isEditing || Builder.isPreviewing ? text || '' : text }}
            />

            {/* Render optional bullet points from multi-line text */}
            {bulletList.length > 0 && (
              <ul className={`list-disc pl-5 mb-6 space-y-2 ${bulletColor}`}>
                {bulletList.map((point, index) => (
                  <li key={index}>{point.trim()}</li>
                ))}
              </ul>
            )}

            {/* Render optional rich text below bullets */}
            {richTextBelowBullets && (
              <div
                className={`prose prose-lg max-w-none ${bodyColor} mt-6 mb-6`}
                dangerouslySetInnerHTML={{ __html: Builder.isEditing || Builder.isPreviewing ? richTextBelowBullets || '' : richTextBelowBullets }}
              />
            )}

            {/* Optional CTA Button */}
            {buttonText && buttonLink && (
              <Link
                to={buttonLink}
                className="inline-block mt-4 bg-destructive hover:bg-destructive/90 text-destructive-foreground font-medium px-8 py-3 rounded-full transition duration-300"
              >
                {buttonText}
              </Link>
            )}
          </div>

          {/* Image Section */}
          <div className={`w-full lg:w-5/12 ${imageOrder} mb-8 lg:mb-0`}>
            <img 
              src={imageUrl} 
              alt={imageAlt} 
              className="w-full h-auto max-h-[450px] rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};