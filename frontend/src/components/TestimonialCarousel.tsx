import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Quote } from "lucide-react";

// Shape of a single testimonial
interface Testimonial {
  quote: string;
  author: string;
  source?: string;
}

// Placeholder testimonial data
const placeholderTestimonials: Testimonial[] = [
  {
    quote: "Placeholder: Witnessing the joy Make-A-Wish brought was truly magical. An unforgettable experience for our whole family.",
    author: "Grateful Parent",
    source: "Auckland",
  },
  {
    quote: "Placeholder: The wish provided a much-needed escape and created memories we will cherish forever. Thank you, Make-A-Wish!",
    author: "Wish Child's Sibling",
    source: "Wellington",
  },
  {
    quote: "Placeholder: Seeing the impact of a wish firsthand is incredibly powerful. It brings hope during the toughest times.",
    author: "Volunteer",
    source: "Christchurch",
  },
];

interface Props {
  testimonials?: Testimonial[]; // Made optional to use placeholder
  backgroundColor?: string; // Card background (e.g., 'bg-white')
  textColor?: string; // Card text (e.g., 'text-gray-700')
  quoteColor?: string; // Icon color (e.g., 'text-primary')
  arrowBackgroundColor?: string; // Arrow background (e.g., 'bg-primary')
  arrowIconColor?: string; // Arrow icon color (e.g., 'text-white')
}

export const TestimonialCarousel: React.FC<Props> = ({
  testimonials = placeholderTestimonials, // Use placeholders by default
  backgroundColor = "bg-white",
  textColor = "text-foreground",
  quoteColor = "text-primary", // Brand blue icon
  arrowBackgroundColor = "bg-primary", // Brand blue arrows
  arrowIconColor = "text-primary-foreground", // White icon on blue arrows
}) => {
  // Ensure testimonials is always an array, even if null/undefined is passed
  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : placeholderTestimonials;

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-5xl mx-auto"
    >
      <CarouselContent className="-ml-4"> {/* Offset margin for padding */}
        {displayTestimonials.map((testimonial, index) => (
          <CarouselItem key={index} className="md:basis-1/2 pl-4 pb-4"> {/* Two items md+, padding */}
            <div className="p-1 h-full">
              <Card className={`h-full flex flex-col justify-between shadow-lg rounded-lg overflow-hidden ${backgroundColor}`}> 
                <CardContent className={`flex flex-col items-start p-6 ${textColor} flex-grow`}>
                  <Quote className={`w-10 h-10 mb-4 shrink-0 ${quoteColor}`} aria-hidden="true" />
                  <p className="text-base italic mb-4 flex-grow">"{testimonial.quote}"</p>
                  {(testimonial.author || testimonial.source) && (
                    <div className="text-right w-full mt-4 pt-4 border-t border-gray-200"> 
                      {testimonial.author && <p className="font-semibold">{testimonial.author}</p>}
                      {testimonial.source && <p className="text-sm opacity-80">{testimonial.source}</p>}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className={`absolute left-[-20px] md:left-[-50px] top-1/2 -translate-y-1/2 z-10 ${arrowBackgroundColor} ${arrowIconColor} hover:${arrowBackgroundColor}/90`} />
      <CarouselNext className={`absolute right-[-20px] md:right-[-50px] top-1/2 -translate-y-1/2 z-10 ${arrowBackgroundColor} ${arrowIconColor} hover:${arrowBackgroundColor}/90`} />
    </Carousel>
  );
};
