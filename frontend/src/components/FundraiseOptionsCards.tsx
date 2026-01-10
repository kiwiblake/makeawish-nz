import React from "react";
import { Button } from "@/components/ui/button";

interface FundraiseOptionCardProps {
  imageUrl: string;
  hoverImageUrl?: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

interface FundraiseOptionsCardsProps {
  cards: FundraiseOptionCardProps[];
}

export const FundraiseOptionsCards: React.FC<FundraiseOptionsCardsProps> = ({
  cards = [],
}) => {
  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative h-64 w-full" style={{ perspective: "1000px" }}>
                {card.hoverImageUrl ? (
                  <div className="relative h-full w-full transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)]" style={{ transformStyle: "preserve-3d" }}>
                    {/* Front side */}
                    <div className="absolute h-full w-full" style={{ backfaceVisibility: "hidden" }}>
                      <img
                        src={card.imageUrl}
                        alt={card.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    {/* Back side */}
                    <div className="absolute h-full w-full [transform:rotateY(180deg)]" style={{ backfaceVisibility: "hidden" }}>
                      <img
                        src={card.hoverImageUrl}
                        alt={`${card.title} hover`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-2xl font-bold text-gray-900">{card.title}</h3>
                <p className="text-muted-foreground mt-2 flex-grow">
                  {card.description}
                </p>
                {card.buttonText && (
                  <Button
                    asChild
                    className="mt-4 w-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    <a href={card.buttonLink}>{card.buttonText}</a>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// The component is now registered in `builderRegistry.ts` to ensure it's available to Builder.io on app load.
// Builder.registerComponent(FundraiseOptionsCards, { ... });
