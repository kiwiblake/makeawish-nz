// ui/src/components/MissionStatement.tsx
import React from "react";
import { Builder } from "@builder.io/react"; // Import Builder if needed for logic (e.g., visibility)

// Define props for Builder.io editing
interface Props {
  title: string;
  text: string;
}

export function MissionStatement({
  // Provide defaults matching the original hardcoded content
  title = "Our Mission",
  text = "Make-A-Wish New Zealand creates life-changing wishes for children with critical illnesses. We believe a wish experience can be a game-changer for a child, bringing joy, hope, and strength when they need it most.",
}: Props) {
  return (
    <section className="bg-white pt-0 pb-0"> {/* Maintain padding adjustments */}
      <div className="relative pt-20 pb-10 px-4 sm:px-6 lg:px-8 bg-white text-center overflow-hidden rounded-lg"> {/* Maintain padding/style adjustments */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-2">
            {title} {/* Use prop for title */}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-8 rounded-full"></div>
          
          {/* Use dangerouslySetInnerHTML to render rich text from Builder */}
          <div 
            className="mt-4 text-xl text-gray-700 leading-relaxed prose prose-xl max-w-none" // Added prose classes
            dangerouslySetInnerHTML={{ __html: text }} 
          />

        </div>
      </div>
    </section>
  );
}
