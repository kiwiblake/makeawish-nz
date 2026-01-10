import React, { useState } from 'react';

// Define Tailwind color classes based on Make-A-Wish theme mapping
// (Assuming blue=primary, red=destructive, yellow=accent, teal=secondary, orange=orange)
const themeColors = {
  blue: {
    bg: 'bg-primary',
    text: 'text-primary',
    border: 'border-primary',
    shadow: 'shadow-primary/50', // Example shadow, adjust as needed
  },
  red: {
    bg: 'bg-destructive',
    text: 'text-destructive',
    border: 'border-destructive',
    shadow: 'shadow-destructive/50',
  },
  orange: {
    bg: 'bg-orange', // Custom orange color
    text: 'text-orange', // Assuming text-orange exists or use text-primary-foreground if dark bg
    border: 'border-orange',
    shadow: 'shadow-orange/50',
  },
  yellow: {
    bg: 'bg-accent',
    text: 'text-accent-foreground', // Usually dark text on yellow
    border: 'border-accent',
    shadow: 'shadow-accent/50',
  },
  teal: {
    bg: 'bg-secondary',
    text: 'text-secondary',
    border: 'border-secondary',
    shadow: 'shadow-secondary/50',
  },
};

const stages = [
  {
    id: 1,
    title: "Wish Capture",
    description: "Make-A-Wish volunteers visit each child to capture their greatest wish, getting to the heart of what kids truly want and why. This profound insight is part of what makes Make-A-Wish unique, giving children full creative control and helping to shape their entire Wish Journey.",
    themeColor: themeColors.blue,
    iconUrl: "https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/step1-icon.png", // Updated icon
  },
  {
    id: 2,
    title: "Wish Design",
    description: "Back at Make-A-Wish HQ, we partner with families, volunteers and medical teams to design the ultimate wish experience - and start rallying our partners and supporters to help make it happen.",
    themeColor: themeColors.red,
    iconUrl: "https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/step2icon.png", // Updated icon
  },
  {
    id: 3,
    title: "Wish Anticipation",
    description: "The excitement builds as children and families count down to their wish day. This period of anticipation brings hope, strength and joy to children during their treatment journey.",
    themeColor: themeColors.yellow,
    iconUrl: "https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/step3icon.png", // Updated icon
  },
  {
    id: 4,
    title: "Wish Realisation",
    description: "The magical moment arrives! This transformative experience brings joy not only to the wish child but to everyone involved. It's a day of celebration, creating cherished memories that will last a lifetime.",
    themeColor: themeColors.teal,
    iconUrl: "https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/step4icon.png", // Updated icon
  },
  {
    id: 5,
    title: "Wish Impact",
    description: "Long after the wish has been granted, the positive impact continues. Families report improved emotional and physical wellbeing, renewed energy, and greater community connection. A wish is more than a moment - it's a lasting influence on a child's life journey.",
    themeColor: themeColors.orange,
    iconUrl: "https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/step5icon.png", // Updated icon
  }
];

// Background star positions
const starPositions = [
  'top-10 left-1/4', 'top-20 right-1/4', 'bottom-10 left-1/3',
  'top-1/2 right-20', 'bottom-1/4 right-1/3'
];

// Star SVG Component (for background and hover)
const StarIcon = ({ className = "", colorClass = "text-muted-foreground/20" }: { className?: string, colorClass?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={`${className} ${colorClass}`}>
    <path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
  </svg>
);

export const WishJourneyStages = () => {
  const [activeStage, setActiveStage] = useState(1);
  const [hoverStage, setHoverStage] = useState<number | null>(null);

  const currentThemeColor = stages[activeStage - 1].themeColor;

  return (
    <div className="relative max-w-6xl mx-auto px-4 py-12 overflow-hidden">
      {/* Background stars */}
      {starPositions.map((position, i) => (
        <StarIcon 
          key={i} 
          className={`absolute ${position} w-8 h-8 transform rotate-12 pointer-events-none z-0`}
          colorClass="text-muted-foreground/10" // Use a subtle theme color
        />
      ))}
      
      {/* Main title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold inline-flex items-center text-secondary"> {/* Apply theme color to whole title */}
          Wish Journey Stages
        </h2>
      </div>
      
      {/* Timeline */}
      <div className="flex flex-col md:flex-row justify-between mb-4 md:mb-10 relative">
        {/* Connecting line Removed */}
        {/* <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-border z-0"></div> */}
        
        {stages.map((stage) => {
          const isCurrent = activeStage === stage.id;
          const isHovered = hoverStage === stage.id;
          const isActive = isCurrent || isHovered;
          const stageColor = stage.themeColor;
          
          return (
            <div 
              key={stage.id} 
              // UPDATED: flex-col by default, items-center, md:w-auto adjusted spacing
              className={`group relative flex flex-col items-center mb-6 md:mb-0 cursor-pointer transition-all duration-300 ease-in-out z-10 md:w-1/5 px-2`}
              onClick={() => setActiveStage(stage.id)}
              onMouseEnter={() => setHoverStage(stage.id)}
              onMouseLeave={() => setHoverStage(null)}
            >
              {/* Icon Container - Slightly increased size */}
              <div 
                className={`
                  relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-background shadow-md border-2
                  transition-all duration-300 ease-in-out z-10
                  ${isActive ? 'transform scale-110 shadow-xl border-4' : 'border-border'} // Enhanced shadow/border
                  ${isActive ? stageColor.border : 'border-border'}
                `}
              >
                {/* Placeholder Image */}
                 <img 
                  src={stage.iconUrl} 
                  alt={`${stage.title} icon`} 
                  className={`w-10 h-10 md:w-12 md:h-12 object-contain transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-60'}`} 
                />
                
                {/* Glow effect on active/hover - subtle shadow */}
                <div 
                  className={`
                    absolute -inset-1 rounded-full blur-sm 
                    ${isActive ? stageColor.shadow : ''} ${isActive ? 'opacity-50' : 'opacity-0'}
                    transition-all duration-300
                  `}
                ></div>
              </div>
              
              {/* Title - Centered text, increased top margin */}
              <div className="mt-3 text-center"> {/* UPDATED: text-center, mt-3 */}
                <span 
                  className={`
                    font-bold transition-all duration-300 ease-in-out
                    ${isActive ? 'text-lg' : 'text-base'}
                    ${isActive ? stageColor.text : 'text-foreground/80'}
                  `}
                >
                  <span className="mr-1">{stage.id}.</span>
                  <span>{stage.title}</span>
                </span>
              </div>
              
              {/* Small floating star on hover/active */}
               <StarIcon 
                  className={`
                    absolute -top-3 -right-3 w-6 h-6 transform rotate-12
                    transition-all duration-300 ease-in-out
                    ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                  `}
                  colorClass={isActive ? stageColor.text : 'text-transparent'} 
               />

              {/* Mobile-only Description (NEW) */}
              <div
                className={`
                  md:hidden w-full mt-4 transition-all duration-300 ease-in-out overflow-hidden
                  ${isCurrent ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                `}
              >
                <p className="text-foreground/80 text-sm leading-relaxed p-3 border rounded-md shadow-sm" style={{ borderColor: stageColor.border }}>
                  {stage.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Content Panel (Hidden on Mobile) */}
      <div className="hidden md:block bg-background rounded-xl shadow-lg p-6 md:p-8 relative overflow-hidden border"> {/* Use background and add border */}
        {/* Accent color bar */}
        <div
          className={`absolute top-0 left-0 w-2 h-full transition-colors duration-300 ease-in-out ${currentThemeColor.bg}`}
        ></div>
        
        {/* Content - Use relative positioning and transitions for fade effect */}
        <div className="ml-4 relative h-48 md:h-32"> {/* Adjust height as needed */}
          {stages.map((stage) => (
            <div 
              key={stage.id}
              className={`
                absolute inset-0 transition-all duration-500 ease-in-out
                ${activeStage === stage.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
              `}
            >
                <p className="text-gray-700 text-base md:text-lg leading-relaxed"> {/* Use body copy grey */}
                  {stage.description}
                </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Export for use in other components and registration
export default WishJourneyStages; // Use default export for components
