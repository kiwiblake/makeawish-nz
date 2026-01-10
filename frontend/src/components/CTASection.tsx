import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  text: string;
  buttonText: string;
  buttonLink: string;
  backgroundImageUrl?: string; // Optional background image URL
  backgroundImageAlt?: string; // Optional alt text for background image
  backgroundColor?: string; // e.g., 'bg-destructive', used if no background image
  textColor?: string; // e.g., 'text-destructive-foreground', 'text-blue-800'
  buttonBgColor?: string; // e.g., 'bg-destructive-foreground', 'bg-pink-500'
  buttonTextColor?: string; // e.g., 'text-blue-800', 'text-white'
}

export const CTASection: React.FC<Props> = ({
  title = "Ready to Make a Difference?", // Default title
  text = "Your support helps grant life-changing wishes for children with critical illnesses across New Zealand.", // Default text
  buttonText = "Donate Today", // Default button text
  buttonLink = "/donate", // Default button link
  backgroundImageUrl, // No default background image
  backgroundImageAlt = "", // Default empty alt text
  backgroundColor = 'bg-destructive', // Default background color if no image (Brand Red)
  textColor = 'text-white', // Default text color
  buttonBgColor = 'bg-white', // Default button background
  buttonTextColor = 'text-blue-800' // Default button text color
}) => {
  const sectionStyle = backgroundImageUrl
    ? {
        backgroundImage: `url(${backgroundImageUrl})`,
      }
    : {};

  const sectionClasses = `py-16 px-4 text-center relative ${backgroundColor || 'bg-destructive'} ${textColor || 'text-destructive-foreground'}`;

  return (
    <section className={sectionClasses} style={sectionStyle} role="region" aria-label={backgroundImageAlt || title}>
      {/* Optional overlay for better text readability on images */}
      {backgroundImageUrl && <div className="absolute inset-0 bg-black opacity-30"></div>}

      <div className="container mx-auto px-4 text-center relative z-10">
          {/* Subtle star motif using brand yellow */}
          <svg aria-hidden="true" className="absolute top-4 left-4 w-8 h-8 text-brand-yellow opacity-50 transform rotate-12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"/></svg>
          <svg aria-hidden="true" className="absolute bottom-4 right-4 w-12 h-12 text-brand-yellow opacity-30 transform -rotate-12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"/></svg>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {title}
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          {text}
        </p>
        <Link
          to={buttonLink}
          className={`inline-block ${buttonBgColor || 'bg-destructive-foreground'} ${buttonTextColor || 'text-destructive'} font-medium py-3 px-8 rounded-full transition duration-300`}
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
};
