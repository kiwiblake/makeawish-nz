// ui/src/components/FAQSection.tsx
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Define the shape of each FAQ item
interface FAQItem {
  question: string;
  answer: string; // Expecting rich text HTML string from Builder.io
}

// Define the props for the component
interface Props {
  title?: string;
  faqs?: FAQItem[];
  // --- Customization Props ---
  titleColor?: string;      // Tailwind class for section title color
  questionColor?: string;   // Tailwind class for question color
  answerColor?: string;     // Tailwind class for answer color
  backgroundColor?: string; // Tailwind class for section background
}

// Define default FAQs to ensure content is visible for styling
const defaultFaqs: FAQItem[] = [
    {
      question: "What is Make-A-Wish New Zealand?",
      answer: "<p>Make-A-Wish® New Zealand creates life-changing wishes for children with critical illnesses. We aim to bring hope, strength, and joy into their lives during challenging times.</p>"
    },
    {
      question: "How can I refer a child for a wish?",
      answer: "<p>If you know a child dealing with a critical illness who might benefit from a wish, please visit our <a href='/apply-for-a-wish' class='text-primary hover:underline'>Refer a Child</a> page for eligibility criteria and the application process.</p>"
    },
    {
      question: "What kind of wishes do you grant?",
      answer: "<p>Wishes often fall into categories like \"I wish to go...\", \"I wish to be...\", \"I wish to meet...\", or \"I wish to have...\". Each wish is unique and tailored to the child's imagination!</p>"
    },
    {
      question: "How is Make-A-Wish funded?",
      answer: "<p>We rely entirely on the generosity of individual donors, corporate partners, community groups, and volunteers. We do not receive government funding. Visit our <a href='/donate' class='text-primary hover:underline'>Donate page</a> to contribute.</p>"
    }
];

export function FAQSection({
  title = "Frequently Asked Questions",
  faqs = defaultFaqs, // Use the default list
  // --- Default Colors/Styles ---
  titleColor = "text-primary",      // Default title to primary blue
  questionColor = "text-secondary",  // Default question to secondary teal
  answerColor = "text-foreground", // Default answer to standard text color
  backgroundColor = "bg-background" // Default to standard background
}: Props) {
  return (
    // Section with background color prop
    <section className={`py-16 md:py-24 ${backgroundColor}`}>
      {/* Centered container */}
      <div className="container mx-auto px-4">

        {/* Optional Title with color prop */}
        {title && (
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${titleColor}`}>
            {title}
          </h2>
        )}

        {/* Accordion - Full width within the container */}
        {faqs && faqs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                {/* Trigger (Question) with color prop */}
                <AccordionTrigger className={`text-lg font-medium text-left hover:no-underline ${questionColor}`}>
                  {faq.question}
                </AccordionTrigger>
                {/* Content (Answer) - Apply overflow hidden here too */}
                <AccordionContent className="overflow-hidden"> {/* Keep overflow hidden here */}
                  {/* Inner div to render HTML - Force width and hide overflow */}
                  <div
                    className={`w-full overflow-hidden ${answerColor}`} // Re-apply width and overflow fix
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          // Fallback if no FAQs are provided
          <p className="text-center text-muted-foreground">No FAQs available.</p>
        )}
      </div>
    </section>
  );
}
