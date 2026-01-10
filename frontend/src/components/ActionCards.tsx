import React from 'react';
import { Link } from 'react-router-dom';

// Interface for individual card properties
interface CardProps {
  title: string;
  description: string;
  buttonText?: string; // Made optional
  buttonLink?: string; // Made optional
  bgColor: string; // Expecting Tailwind background class e.g., 'bg-blue-700'
  imageUrl: string;
  imageAlt: string;
}

// Interface for the main component props
interface Props {
  sectionTitle?: string; // Optional title for the whole section
  cards: CardProps[];
}

// Internal functional component for a single card
const ActionCard: React.FC<CardProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  bgColor,
  imageUrl,
  imageAlt,
}) => {
  // Determine text and button colors based on bgColor
  let textColor = 'text-primary-foreground'; // Default for primary/darker colors
  let buttonTextColor = 'text-primary'; // Default button text for light background

  if (bgColor.includes('orange')) { // Orange 
    textColor = 'text-primary-foreground'; // User request: White text 
    buttonTextColor = 'text-primary';      // User request: Blue button text
  } else if (bgColor.includes('secondary')) { // Teal is secondary
    textColor = 'text-secondary-foreground'; // Default: White text on teal
    buttonTextColor = 'text-primary';      // User request: Blue button text on teal
  } else if (bgColor.includes('destructive')) { // Red is destructive
    textColor = 'text-destructive-foreground';
    buttonTextColor = 'text-destructive';
  } else if (bgColor.includes('accent')) { // Yellow (if used elsewhere)
      textColor = 'text-primary-foreground'; 
      buttonTextColor = 'text-primary';      
  }
  // Assuming bg-primary (Blue) uses default textColor='text-primary-foreground' and buttonTextColor='text-primary'

  return (
    <div className={`${bgColor} rounded-lg overflow-hidden shadow-lg flex flex-col h-full`}>
      <div className="h-64 overflow-hidden flex-shrink-0">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className={`text-xl font-bold ${textColor} mb-3`}>{title}</h3>
        <p className={`${textColor} mb-6 flex-grow`}>{description}</p>
        {/* Conditionally render the button only if buttonText AND buttonLink exist */}
        {buttonText && buttonLink && (
          <Link
            to={buttonLink}
            className={`inline-block self-start bg-primary-foreground ${buttonTextColor} font-medium px-6 py-2 rounded-full hover:bg-primary-foreground/90 transition duration-300`}
          >
            {buttonText}
          </Link>
        )}
      </div>
    </div>
  );
};

// Exported component accepting props
export const ActionCards: React.FC<Props> = ({
  sectionTitle,
  cards = [
    // Default cards based on original hardcoded content
    {
      title: "How to Help",
      description: "There are lots of fantastic ways you can support Make-A-Wish New Zealand. Find out how you can make a meaningful difference to a Kiwi child.",
      buttonText: "Find Out More",
      buttonLink: "/how-to-help",
      bgColor: "bg-primary",
      imageUrl: "https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/howtohelp.png",
      imageAlt: "Stylized graphic representing helping hands"
    },
    {
      title: "Our Wishes",
      description: "Behind each wish is a journey of a child and their family dealing with a critical illness. Discover the magic of wish granting.",
      buttonText: "Explore More",
      buttonLink: "/wish-stories",
      bgColor: "bg-orange", // User request: Orange
      imageUrl: "https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/ourwishes.png",
      imageAlt: "Stylized graphic representing a wish story"
    },
    {
      title: "Corporate Fundraising",
      description: "Many businesses throughout New Zealand partner with us to make a difference and grant more wishes.",
      buttonText: "Learn More",
      buttonLink: "/corporate-fundraising",
      bgColor: "bg-secondary", // Teal
      imageUrl: "https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/corporatefundraising.jpg",
      imageAlt: "Team members collaborating for fundraising"
    }
  ],
}) => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {sectionTitle && (
          <h2 className="text-3xl font-bold text-center text-foreground mb-10">
            {sectionTitle}
          </h2>
        )}
        <div className="flex flex-wrap justify-center gap-8">
          {cards.map((card, index) => (
            <div key={index} className="w-full sm:basis-[calc(50%-1rem)] lg:basis-[calc(33.33333%-1.33333rem)]">
              <ActionCard {...card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
