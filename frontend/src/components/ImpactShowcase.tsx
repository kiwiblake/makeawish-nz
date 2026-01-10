import React from 'react';
import { Link } from 'react-router-dom';
import { Builder } from '@builder.io/react';

// Interface for button properties
interface ButtonProps {
  text: string;
  link: string;
  primary?: boolean; // True for primary style, false for secondary
}

// Interface for the main component props
interface Props {
  title: string;
  text: string; // Changed to single string, expect rich text or HTML from Builder
  imageUrl: string;
  imageAlt: string;
  buttons?: ButtonProps[];
}

export const ImpactShowcase: React.FC<Props> = ({
  title = "Together we can make a difference for children.",
  text = `<p className="text-lg text-gray-700 mb-6">
            Make-A-Wish New Zealand exists for one reason only – to grant the wishes of children with critical medical conditions, to bring hope, strength and happiness.
          </p>
          <p className="text-lg text-gray-700 mb-8">
            Since 1986, Make-A-Wish has granted wishes to more than 2,300 brave Kiwi children dealing with critical illness, aged 3-17 years.
          </p>`, // Default with HTML structure
  imageUrl = "https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/photo puppy.png",
  imageAlt = "Children enjoying their wish experience",
  buttons = [
    { text: "About Us", link: "/about-us", primary: true },
    { text: "Read Wish Stories", link: "/wish-stories", primary: false },
  ]
}) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Image Section (Fixed Layout: Left) */}
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <img 
              src={imageUrl} 
              alt={imageAlt} 
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          
          {/* Text Section (Fixed Layout: Right) */}
          <div className="w-full md:w-1/2 md:pl-8">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
              {title}
            </h2>
            {/* Render text content - use dangerouslySetInnerHTML for Builder rich text */}
            <div dangerouslySetInnerHTML={{ __html: Builder.isEditing || Builder.isPreviewing ? text || '' : text }} />

            {buttons && buttons.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-8"> {/* Added mt-8 based on original structure */} 
                {buttons.map((button, index) => (
                  <Link
                    key={index}
                    to={button.link}
                    className={`inline-block font-medium px-6 py-3 rounded-full transition duration-300 ${ 
                      button.primary 
                      ? 'bg-blue-700 hover:bg-blue-800 text-white' 
                      : 'bg-transparent border-2 border-blue-700 text-blue-700 hover:bg-blue-50'
                    }`}
                  >
                    {button.text}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
