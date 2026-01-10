















// src/utils/builderRegistry.ts

// Import the Builder class for static registration
import { Builder } from "@builder.io/react";

// --- Import adapted components ---
import { ContactForm } from "@/components/ContactForm"; // Added ContactForm
import { BlockQuote } from "@/components/BlockQuote";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import TextBlock from "@/components/TextBlock";
import { WishJourneyStages } from "@/components/WishJourneyStages"; // Added import
import { ActionCards } from "@/components/ActionCards";
import { CTASection } from "@/components/CTASection";
import { FeaturedWishStories } from "@/components/FeaturedWishStories";
import { Footer } from "@/components/Footer"; // Added
import { FundraiseOptionsCards } from "@/components/FundraiseOptionsCards";
import { Header } from "@/components/Header"; // Added
import Heading from "@/components/Heading"; // Corrected import
import { ImpactShowcase } from "@/components/ImpactShowcase";
import { InfoSectionWithImage } from "@/components/InfoSectionWithImage"; 
import { KnowAChildCTA } from "@/components/KnowAChildCTA"; 
import { HeroSection } from "@/components/HeroSection";
import { MissionStatement } from "@/components/MissionStatement";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { NewsUpdates } from "@/components/NewsUpdates";
import { WishStories } from "@/components/WishStories";
import { FAQSection } from "@/components/FAQSection"; // Added import
import BannerPhoto from "@/components/BannerPhoto"; // Added import
import PartnersLogoSection from "@/components/PartnersLogoSection";

// --- Function to register components ---
export function registerBuilderComponents() {
  console.log("Attempting to register Builder.io components: HeroSection, MissionStatement, NewsletterSignup, NewsUpdates, WishStories, Heading, TextBlock, BannerPhoto");

Builder.registerComponent(PartnersLogoSection, {
  name: "Partners Logo Section",
  description:
    "Displays partner logos grouped by sponsorship tiers with coloured stars.",
  inputs: [
    {
      name: "title",
      type: "text",
      defaultValue: "Partner Ecosystem",
    },
    {
      name: "tiers",
      type: "list",
      defaultValue: [
        {
          name: "Wish Master Partners",
          starColor: "#5485BE",
          outlineColor: "#B8D4EC",
          logos: [],
        },
        {
          name: "Dream Builders Partners",
          starColor: "#E89241",
          outlineColor: "#F9D7B0",
          logos: [],
        },
        {
          name: "Magic Maker Partners",
          starColor: "#E5CD6B",
          outlineColor: "#F8EBBC",
          logos: [],
        },
        {
          name: "Rising Star Partners",
          starColor: "#4AAFA5",
          outlineColor: "#B8E1DC",
          logos: [],
        },
        {
          name: "Sparkle Whisperer Partners",
          starColor: "#7BA3D2",
          outlineColor: "#C4D5EB",
          logos: [],
        },
      ],
      subFields: [
        {
          name: "name",
          type: "text",
          defaultValue: "Tier Name",
        },
        {
          name: "starColor",
          type: "color",
          defaultValue: "#3B82F6",
          helperText: "Darker colour for the star background.",
        },
        {
          name: "outlineColor",
          type: "color",
          defaultValue: "#E5E7EB",
          helperText: "Lighter colour for the box outline.",
        },
        {
          name: "logos",
          type: "list",
          subFields: [
            {
              name: "imageUrl",
              type: "file",
              allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
            },
            {
              name: "altText",
              type: "text",
              defaultValue: "Partner Logo",
            },
            {
              name: "link",
              type: "url",
              helperText:
                "Optional: URL to link to when logo is clicked (opens in new tab).",
            },
          ],
        },
      ],
    },
  ],
});

  Builder.registerComponent(BannerPhoto, {
    name: "Banner Photo",
    description: "A full-width image banner.",
    inputs: [
      {
        name: "imageUrl",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "svg", "webp"],
        required: true,
        helperText: "Upload the banner image.",
      },
      {
        name: "altText",
        type: "string",
        required: true,
        defaultValue: "Banner image",
        helperText: "Descriptive text for screen readers.",
      },
    ],
  });

  Builder.registerComponent(TextBlock, {
    name: "Text Block",
    description: "A block for rendering rich text content.",
    inputs: [
      {
        name: "content",
        type: "richText",
        required: true,
        defaultValue: "<p>This is a default text block. Edit this to add your own content.</p>",
      },
      {
        name: "textSize",
        type: "string",
        helperText: "Select the size of the text.",
        defaultValue: "text-xl",
        enum: [
          { label: "Normal", value: "text-base" },
          { label: "Large", value: "text-lg" },
          { label: "XL", value: "text-xl" },
          { label: "2XL", value: "text-2xl" },
        ],
      },
      {
        name: "textColor",
        type: "string",
        helperText: "Select the color of the text.",
        defaultValue: "text-gray-600",
        enum: [
          { label: "Default", value: "text-foreground" },
          { label: "Muted", value: "text-muted-foreground" },
          { label: "Gray", value: "text-gray-600" },
          { label: "White", value: "text-white" },
        ],
      },
    ],
  });

  Builder.registerComponent(Heading, {
    name: "Heading",
    description: "A standalone heading element with configurable level, size, and color.",
    inputs: [
      {
        name: "text",
        type: "string",
        required: true,
        defaultValue: "Your Heading Here",
      },
      {
        name: "level",
        type: "string",
        enum: ["h1", "h2", "h3", "h4", "h5", "h6"],
        defaultValue: "h2",
        helperText: "Determines the semantic heading tag (e.g., H1, H2)."
      },
      {
        name: "textColor",
        type: "string", // Changed from 'text'
        defaultValue: "text-primary",
        helperText: "Select the text color for the heading.",
        enum: [
          { label: "Primary (Blue)", value: "text-primary" },
          { label: "Secondary (Teal)", value: "text-secondary" },
          { label: "Destructive (Red)", value: "text-destructive" },
          { label: "Foreground (Default)", value: "text-foreground" },
          { label: "Muted", value: "text-muted-foreground" },
          { label: "White", value: "text-white" },
        ],
      },
      {
        name: "textSize",
        type: "string", // Changed from 'text'
        defaultValue: "text-4xl",
        helperText: "Select the size of the heading text.",
        enum: [
          { label: "XL", value: "text-xl" },
          { label: "2XL", value: "text-2xl" },
          { label: "3XL", value: "text-3xl" },
          { label: "4XL", value: "text-4xl" },
          { label: "5XL", value: "text-5xl" },
          { label: "6XL", value: "text-6xl" },
        ],
      },
      {
        name: "fontWeight",
        type: "text",
        defaultValue: "font-bold",
        helperText: "Tailwind font weight. Examples: 'font-normal', 'font-semibold', 'font-bold'."
      },
    ],
  });

  Builder.registerComponent(HeroSection, {
    name: "Hero Section",
    description: "Main hero with title, image, optional button, and background options.", // Updated description
    inputs: [
      // --- Title --- 
      {
        name: "title",
        type: "richText", // Use richText for better formatting control
        required: true,
        defaultValue: "Turn Wishes into Wonderful Realities",
        helperText: "Main headline (use standard formatting tools or <br /> for line breaks)",
      },
      {
        name: "titleColor",
        type: "text",
        defaultValue: "text-primary-foreground",
        helperText: "Tailwind text color for the main title (e.g., 'text-white', 'text-primary', 'text-gray-800'). Defaults to light text suitable for dark/colored backgrounds.",
      },
      // --- Button --- 
      {
        name: "buttonText",
        type: "text",
        defaultValue: "Donate Now & Make a Difference",
        helperText: "Optional: Text for the button. Leave empty to hide."
      },
      {
        name: "buttonLink",
        type: "url",
        defaultValue: "/donate",
        helperText: "Optional: URL the button links to.",
      },
      {
        name: "buttonBgColor",
        type: "text",
        defaultValue: "bg-destructive",
        helperText: "Tailwind background class for the button (e.g., 'bg-destructive', 'bg-primary', 'bg-white', 'bg-orange-500').",
      },
      {
        name: "buttonTextColor",
        type: "text",
        defaultValue: "text-destructive-foreground",
        helperText: "Tailwind text color class for the button (e.g., 'text-white', 'text-primary', 'text-destructive-foreground').",
      },
      // --- Image --- 
       {
        name: "imageUrl",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "gif", "svg", "webp"],
        // required: true, // No longer required if removeImage is true
        defaultValue: "https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/Jaspers-Wish.webp",
        helperText: "Main image (usually displayed on the right). Hidden if 'Remove Image' is checked.",
      },
      {
        name: "imageAlt",
        type: "text",
        defaultValue: "Child receiving a wish",
        helperText: "Alt text for the main image (important for accessibility).",
      },
      {
        name: "removeImage",
        type: "boolean",
        defaultValue: false,
        helperText: "Check to hide the main image and center the text content.",
      },
      // --- Layout --- 
      {
        name: "reverseLayout",
        type: "boolean",
        defaultValue: false,
        helperText: "Check to put the image on the left and text on the right (ignored if image is removed).",
      },
      // --- Background --- 
      {
        name: "backgroundImageUrl",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "gif", "svg", "webp"],
        helperText: "Optional: Background image for the entire section. Overrides background color choice.",
      },
      {
        name: "backgroundColor",
        type: "text",
        helperText: "Optional: Tailwind background class (e.g., 'bg-primary', 'bg-secondary', 'bg-white', 'bg-gray-100'). Used only if NO background image is set. Defaults to primary blue.",
      },
    ],
  });

  Builder.registerComponent(MissionStatement, {
      name: "Mission Statement Section",
      description: "Displays the mission statement.",
      inputs: [
          {
              name: "title",
              type: "text",
              required: true,
              defaultValue: "Our Mission",
              helperText: "The main title for the section",
          },
          {
              name: "text",
              type: "richText", // Use richText for potential formatting
              required: true,
              defaultValue: "Make-A-Wish New Zealand creates life-changing wishes for children with critical illnesses. We believe a wish experience can be a game-changer for a child, bringing joy, hope, and strength when they need it most.",
              helperText: "The body text of the mission statement",
          },
      ],
  });

  // Registration for ActionCards
  Builder.registerComponent(ActionCards, {
    name: "Action Cards Section",
    description: "Displays multiple cards with images, text, and buttons, usually in 3 columns.",
    inputs: [
      {
        name: "sectionTitle",
        type: "text",
        helperText: "Optional title displayed above the cards.",
      },
      {
        name: "cards",
        type: "list",
        required: true,
        defaultValue: [
          {
            title: "How to Help",
            description: "There are lots of fantastic ways you can support Make-A-Wish New Zealand. Find out how you can make a meaningful difference to a Kiwi child.",
            buttonText: "Find Out More",
            buttonLink: "/how-to-help",
            bgColor: "bg-blue-700",
            imageUrl: "https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/howtohelp.png",
            imageAlt: "Stylized graphic representing helping hands"
          },
          {
            title: "Our Wishes",
            description: "Behind each wish is a journey of a child and their family dealing with a critical illness. Discover the magic of wish granting.",
            buttonText: "Explore More",
            buttonLink: "/wish-stories",
            bgColor: "bg-yellow-500",
            imageUrl: "https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/ourwishes.png",
            imageAlt: "Stylized graphic representing a wish story"
          },
          {
            title: "Corporate Fundraising",
            description: "Many businesses throughout New Zealand partner with us to make a difference and grant more wishes.",
            buttonText: "Learn More",
            buttonLink: "/corporate-fundraising",
            bgColor: "bg-teal-500",
            imageUrl: "https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/corporatefundraising.jpg",
            imageAlt: "Team members collaborating for fundraising"
          }
        ],
        subFields: [
          { name: "title", type: "text", required: true },
          { name: "description", type: "longText", required: true },
          { name: "buttonText", type: "text", required: false },
          { name: "buttonLink", type: "url", required: false },
          {
            name: "bgColor",
            type: "text",
            required: true,
            helperText: "Tailwind class. Brand Colors: 'bg-primary' (Blue), 'bg-destructive' (Red), 'bg-secondary' (Teal), 'bg-orange-500' (Orange).",
          },
          {
            name: "imageUrl",
            type: "file",
            allowedFileTypes: ["jpeg", "jpg", "png", "gif", "svg", "webp"],
            required: true,
            helperText: "Image for the card.",
          },
          { name: "imageAlt", type: "text", required: true, defaultValue: "Card image" },
        ],
      },
    ],
  });

  // Registration for CTASection
  Builder.registerComponent(CTASection, {
    name: "Call To Action Section",
    description: "A section with text and a button, with optional background image or color.",
    inputs: [
      { name: "title", type: "text", required: true, defaultValue: "Ready to Make a Difference?" },
      { name: "text", type: "longText", required: true, defaultValue: "Your support helps grant life-changing wishes..." },
      { name: "buttonText", type: "text", required: true, defaultValue: "Donate Today" },
      { name: "buttonLink", type: "url", required: true, defaultValue: "/donate" },
      {
        name: "backgroundImageUrl",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "gif", "svg", "webp"],
        helperText: "Optional background image. Overrides background color.",
      },
      { name: "backgroundImageAlt", type: "text", helperText: "Alt text for background image (important for accessibility)." },
      {
        name: "backgroundColor",
        // CHANGE: type from 'color' to 'text'
        type: "text",
        // CHANGE: defaultValue to Tailwind class from component
        defaultValue: "bg-destructive",
        // CHANGE: helperText to guide Tailwind class input
        helperText: "Tailwind background class (e.g., 'bg-primary', 'bg-secondary', 'bg-destructive'). Used if no image.",
      },
      {
        name: "textColor",
        // CHANGE: type from 'color' to 'text'
        type: "text",
        // CHANGE: defaultValue to Tailwind class from component
        defaultValue: "text-white",
         // CHANGE: helperText to guide Tailwind class input
        helperText: "Tailwind text color class (e.g., 'text-white', 'text-primary-foreground', 'text-gray-800').",
      },
      {
        name: "buttonBgColor",
         // CHANGE: type from 'color' to 'text'
        type: "text",
        // CHANGE: defaultValue to Tailwind class from component
        defaultValue: "bg-white",
         // CHANGE: helperText to guide Tailwind class input
        helperText: "Tailwind background class for the button (e.g., 'bg-white', 'bg-primary').",
      },
      {
        name: "buttonTextColor",
        // CHANGE: type from 'color' to 'text'
        type: "text",
        // CHANGE: defaultValue to Tailwind class from component
        defaultValue: "text-blue-800",
        // CHANGE: helperText to guide Tailwind class input
        helperText: "Tailwind text color class for the button (e.g., 'text-blue-800', 'text-white').",
      },
    ],
  });

    // Registration for FeaturedWishStories
  Builder.registerComponent(FeaturedWishStories, {
    name: "Featured Wish Stories",
    description: "Showcase wish stories with images or videos.",
    inputs: [
      {
        name: "stories",
        type: "list",
        required: true,
        defaultValue: [
          {
            childName: "Amelie",
            wishTitle: "I Wish To Have A Grand Piano",
            storyText: "Amelie's entire life changed when she was diagnosed with a mixed germ cell tumour – an extremely rare form of brain cancer – at age 12...",
            readMoreText: "Read More",
            readMoreLink: "/wish-stories/amelie",
            imageUrl: "https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/Amelie-playing-piano.webp",
            imageAlt: "Amelie playing her grand piano",
            highlightColor: "text-destructive",
            isVideo: false,
            reverseLayout: false
          },
        ],
        subFields: [
          { name: "childName", type: "text", required: true },
          { name: "wishTitle", type: "text", required: true },
          { name: "storyText", type: "longText", required: true },
          { name: "readMoreText", type: "text", required: true },
          { name: "readMoreLink", type: "url", required: true },
          { 
            name: "highlightColor", 
            type: "text", 
            defaultValue: "text-destructive",
            helperText: "Tailwind text color class. Brand Colors: 'text-primary' (Blue), 'text-destructive' (Red), 'text-secondary' (Teal). Defaults to red."
          },
          { 
            name: "buttonGradient", 
            type: "text", 
            defaultValue: "from-blue-600 to-blue-700",
            helperText: "Tailwind gradient classes for button (e.g., 'from-blue-600 to-blue-700')."
          },
          { 
            name: "buttonHoverGradient", 
            type: "text", 
            defaultValue: "hover:from-blue-700 hover:to-blue-800",
            helperText: "Tailwind hover gradient classes for button (e.g., 'hover:from-blue-700 hover:to-blue-800')."
          },
          { 
            name: "isVideo", 
            type: "boolean", 
            defaultValue: false,
            helperText: "Whether this is a video story. If true, provide a YouTube embed URL in videoEmbedUrl."
          },
          { 
            name: "videoEmbedUrl", 
            type: "text", 
            helperText: "YouTube embed URL (e.g., https://www.youtube.com/embed/VIDEO_ID). Only used if isVideo is true.",
            visibleInUI: (value: any, formData: any) => formData?.isVideo
          },
          { 
            name: "imageUrl", 
            type: "file", 
            allowedFileTypes: ["jpeg", "jpg", "png", "gif", "svg", "webp"],
            helperText: "Image for the story. Not used if isVideo is true.",
            visibleInUI: (value: any, formData: any) => !formData?.isVideo
          },
          { 
            name: "imageAlt", 
            type: "text", 
            required: true,
            helperText: "Alt text for the image or video."
          },
          { 
            name: "reverseLayout", 
            type: "boolean", 
            defaultValue: false,
            helperText: "Whether to reverse the layout (image on left, text on right)."
          },
        ],
      },
    ],
  });

  // Registration for FundraiseOptionsCards is now handled within its own file
  // to ensure the component's inputs are always up-to-date.
  // No registration needed here anymore.

  Builder.registerComponent(FundraiseOptionsCards, {
    name: "Fundraise Options Cards",
    inputs: [
      {
        name: "cards",
        type: "list",
        subFields: [
          { name: "imageUrl", type: "file" },
          { 
            name: "hoverImageUrl", 
            type: "file",
            helperText: "Optional: Image to display on hover.",
          },
          { name: "title", type: "string" },
          { name: "description", type: "longText" },
          { name: "buttonText", type: "string" },
          { name: "buttonLink", type: "url" },
        ],
        defaultValue: [
          {
            imageUrl:
              "https://cdn.builder.io/api/v1/image/assets%2F2cd2fafa05294fe78a360593ee6469ca%2F1e56b533f8d3434e883f3e1b8b928f09",
            title: "Fundraise at Work",
            description:
              "Engage your colleagues and foster team spirit by fundraising for a great cause. Your workplace can make a huge impact.",
            buttonText: "Get Your Team Involved",
            buttonLink: "/workplace-fundraising",
          },
        ],
      },
    ],
  });

  // Registration for ImpactShowcase
  Builder.registerComponent(ImpactShowcase, {
    name: "Impact Showcase Section",
    description: "Section with image on left, text and buttons on right.",
    inputs: [
      {
        name: "title",
        type: "text",
        required: true,
        defaultValue: "Together we can make a difference for children.",
      },
      {
        name: "text",
        type: "richText",
        required: true,
        defaultValue: `<p class="text-lg text-gray-700 mb-6">Make-A-Wish New Zealand exists for one reason only...</p><p class="text-lg text-gray-700 mb-8">Since 1986...</p>`,
      },
      {
        name: "imageUrl",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "gif", "svg", "webp"],
        required: true,
        defaultValue: "https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/photo puppy.png",
      },
      {
        name: "imageAlt",
        type: "text",
        required: true,
        defaultValue: "Children enjoying their wish experience",
      },
      {
        name: "buttons",
        type: "list",
        defaultValue: [
          { text: "About Us", link: "/about-us", primary: true },
          { text: "Read Wish Stories", link: "/wish-stories", primary: false },
        ],
        subFields: [
          { name: "text", type: "text", required: true },
          { name: "link", type: "url", required: true },
          {
            name: "primary",
            type: "boolean",
            defaultValue: true,
            helperText: "Check for primary button style (blue), uncheck for secondary (outline).",
          },
        ],
      },
    ],
  });

  // Registration for InfoSectionWithImage
  Builder.registerComponent(InfoSectionWithImage, {
    name: "Info Section with Image",
    description: "Alternating sections with text and an image.",
    inputs: [
      { name: "title", type: "text", required: true, defaultValue: "Default Title" },
      {
        name: "titleColor",
        type: "text",
        defaultValue: "text-primary",
        helperText: "Tailwind text color class for the title (e.g., 'text-primary', 'text-destructive')."
      },
      {
        name: "text",
        type: "richText",
        required: true,
        defaultValue: "<p>Default paragraph text. Replace this in the Builder editor.</p>",
      },
      {
        name: "bodyColor",
        type: "text",
        defaultValue: "text-foreground",
        helperText: "Tailwind text color class for the body text (e.g., 'text-foreground', 'text-muted-foreground')."
      },
      {
        name: "bulletPointsText",
        type: "longText",
        defaultValue: "Run a trivia or quiz night\nHost a bake sale, morning tea, or afternoon tea for your colleagues\nEncourage your team to participate in one of our fundraising events\nHold a team-building event to raise funds\nGet involved in a state or city event like Ride For Wishes, or the City2Surf run.\nPlace charity collection tins in the office\nHold a raffle or sweepstakes",
        helperText: "Optional bullet points. Enter each point on a new line.",
      },
       {
        name: "bulletColor",
        type: "text",
        defaultValue: "text-foreground",
        helperText: "Tailwind text color class for the bullet points (e.g., 'text-foreground')."
      },
      {
        name: "richTextBelowBullets",
        type: "richText",
        defaultValue: "<p>Provide additional details or context after the list.</p>",
        helperText: "Optional rich text to display below the bullet points."
      },
      {
        name: "imageUrl",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "gif", "svg", "webp"],
        required: true,
        defaultValue: "https://via.placeholder.com/600x400.png?text=Placeholder+Image",
      },
      { name: "imageAlt", type: "text", required: true, defaultValue: "Placeholder Image" },
      { name: "buttonText", type: "text", helperText: "Optional button text." },
      { name: "buttonLink", type: "url", helperText: "Optional button link." },
      {
        name: "reverseLayout",
        type: "boolean",
        defaultValue: false,
        helperText: "Check to put image on the left and text on the right.",
      },
      {
        name: "backgroundColor",
        type: "text", // Changed from 'color'
        defaultValue: "bg-background", // Use Tailwind class
        helperText: "Tailwind background class for the section (e.g., 'bg-background', 'bg-muted', 'bg-blue-100').",
      },
    ],
  });

  // Registration for KnowAChildCTA
  Builder.registerComponent(KnowAChildCTA, {
    name: "Know a Child CTA",
    description: "Simple CTA section, often used for wish referrals.",
    inputs: [
      {
        name: "title",
        type: "richText", // Use richText for line breaks
        required: true,
        defaultValue: "Do you know a child fighting a critical illness,<br />who could benefit from a life-changing wish?",
      },
      { name: "buttonText", type: "text", required: true, defaultValue: "Apply for a Wish" },
      { name: "buttonLink", type: "url", required: true, defaultValue: "/apply-for-a-wish" },
      {
        name: "backgroundColor",
        type: "color",
        defaultValue: "#1d4ed8", // Default blue (primary)
      },
      {
        name: "textColor",
        type: "color",
        defaultValue: "#ffffff", // Default white
      },
      {
        name: "buttonBgColor",
        type: "text", // Changed from color
        defaultValue: "bg-destructive", // Changed to Tailwind class
        helperText: "Tailwind background class for the button (e.g., 'bg-destructive', 'bg-primary').", // Added
      },
      {
        name: "buttonTextColor",
        type: "text", // Changed from color
        defaultValue: "text-destructive-foreground", // Changed to Tailwind class
        helperText: "Tailwind text color class for the button (e.g., 'text-destructive-foreground', 'text-white').", // Added
      },
    ],
  });

  // Registration for Header
  Builder.registerComponent(Header, {
    name: "Site Header",
    description: "Main website navigation header with logo, links, dropdowns, and CTA button.",
    inputs: [
      {
        name: "logoUrl",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "gif", "svg", "webp"],
        defaultValue: "https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/logo.webp",
      },
      {
        name: "logoAlt",
        type: "text",
        defaultValue: "Make-A-Wish NZ",
      },
      {
        name: "navLinks",
        type: "list",
        defaultValue: [
          { text: "Our Wishes", link: "/wish-stories" },
          {
            text: "Fundraising", link: "#", children: [
              { text: "Fundraise In Your Community", link: "/fundraise" },
              { text: "Partner With Us", link: "/partner" },
              { text: "Legacies", link: "/legacies" },
              { text: "Regular Givers", link: "/regular-giving" },
            ]
          },
          {
            text: "Ways to donate", link: "#", children: [
              { text: "One-time donation", link: "/donate-1" },
              { text: "Monthly giving", link: "/donate-2" },
              { text: "Gift in memory", link: "/donate-3" },
            ]
          },
          { text: "Volunteer", link: "/volunteer" },
          { text: "About Us", link: "/about-us" },
          { text: "Contact Us", link: "/contact-us" },
        ],
        subFields: [
          { name: "text", type: "text", required: true },
          { name: "link", type: "url", required: true, helperText: "Use # for dropdown parents" },
          {
            name: "children",
            type: "list",
            subFields: [
              { name: "text", type: "text", required: true },
              { name: "link", type: "url", required: true },
            ],
            helperText: "Add sub-items for a dropdown menu.",
          },
        ],
      },
      {
        name: "ctaButton",
        type: "object",
        defaultValue: { // << UPDATE THIS BLOCK
          text: "Donate",
          link: "/donate",
          desktopBgColor: "bg-destructive",         // Use brand red
          desktopTextColor: "text-destructive-foreground", // Use contrast text for red
          desktopHoverBgColor: "hover:bg-destructive/90", // Slightly darker red on hover
          mobileBgColor: "bg-destructive",           // Use brand red
          mobileTextColor: "text-destructive-foreground", // Use contrast text for red
          mobileHoverBgColor: "hover:bg-destructive/90",  // Slightly darker red on hover
        },
        subFields: [
          { name: "text", type: "text", required: true },
          { name: "link", type: "url", required: true },
          { name: "desktopBgColor", type: "text", helperText: "Tailwind class. Brand Colors: 'bg-primary' (Blue), 'bg-destructive' (Red), 'bg-secondary' (Teal), 'bg-orange-500' (Orange)" },
          { name: "desktopTextColor", type: "text", helperText: "Tailwind class. Text Colors: 'text-primary' (Blue), 'text-destructive-foreground' (White on Red), 'text-secondary' (Teal), 'text-white'" },
          { name: "desktopHoverBgColor", type: "text", helperText: "Tailwind class. Hover examples: 'hover:bg-primary/90', 'hover:bg-destructive/90', 'hover:bg-secondary/90'" },
          { name: "mobileBgColor", type: "text", helperText: "Tailwind class. Same brand colors as desktop bg." },
          { name: "mobileTextColor", type: "text", helperText: "Tailwind class. Same text colors as desktop text." },
          { name: "mobileHoverBgColor", type: "text", helperText: "Tailwind class. Same hover options as desktop hover bg." },
        ],
      },
    ],
  });

  // Registration for Footer
  Builder.registerComponent(Footer, {
    name: "Site Footer",
    description: "Main website footer with logo, address, social links, and copyright.",
    inputs: [
      {
        name: "logoUrl",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "gif", "svg", "webp"],
        defaultValue: "https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/logo-footer.webp",
      },
      {
        name: "logoAlt",
        type: "text",
        defaultValue: "Make-A-Wish New Zealand",
      },
      {
        name: "addressInfo",
        type: "richText",
        required: true,
        defaultValue: `<p class="text-sm mb-4">Make-A-Wish® New Zealand national office...</p><p class="text-sm font-bold mb-1">Call us on</p><p class="text-sm mb-4">0800 80 70 80</p>...<p class="text-sm">Charity Registration Number: CC24625</p>`,
      },
      {
        name: "socialLinks",
        type: "list",
        defaultValue: [
          { platform: 'facebook', url: 'https://facebook.com/makeawishnz' },
          { platform: 'instagram', url: 'https://instagram.com/makeawishnz' },
          { platform: 'twitter', url: 'https://twitter.com/makeawishnz' },
          { platform: 'youtube', url: 'https://youtube.com/makeawishnz' },
        ],
        subFields: [
          {
            name: "platform",
            type: "text",
            enum: ['facebook', 'instagram', 'twitter', 'youtube'], // Use enum for dropdown
            required: true
          },
          { name: "url", type: "url", required: true },
        ],
      },
      {
        name: "copyrightText",
        type: "text",
        defaultValue: "© 2025 Make-A-Wish Foundation of New Zealand",
      },
      {
        name: "privacyLink",
        type: "object",
        defaultValue: { text: "Privacy Policy", url: "/privacy-policy" },
        subFields: [
          { name: "text", type: "text", required: true },
          { name: "url", type: "url", required: true },
        ],
      },
    ],
  });

  // Registration for NewsletterSignup
  Builder.registerComponent(NewsletterSignup, {
    name: "Newsletter Signup",
    description: "Email newsletter signup form with heading and subscribe button.",
    inputs: [
      {
        name: "heading",
        type: "text",
        defaultValue: "Sign up to our newsletter to receive the latest updates",
        helperText: "Heading text displayed next to the signup form",
      },
      {
        name: "buttonText",
        type: "text",
        defaultValue: "Subscribe",
        helperText: "Text displayed on the submit button",
      },
      {
        name: "emailPlaceholderText",
        type: "text",
        defaultValue: "Your email address",
        helperText: "Placeholder text for the email input field",
      },
      {
        name: "namePlaceholderText",
        type: "text",
        defaultValue: "Your Name",
        helperText: "Placeholder text for the name input field",
      },
      {
        name: "backgroundColor",
        type: "text",
        defaultValue: "bg-destructive",
        helperText: "Tailwind background color class for the section (e.g., 'bg-destructive', 'bg-primary')", 
      },
      {
        name: "buttonColor",
        type: "text",
        defaultValue: "bg-blue-700 hover:bg-blue-800",
        helperText: "Tailwind classes for button styling",
      },
      {
        name: "successMessage",
        type: "text",
        defaultValue: "Thank you for subscribing!",
        helperText: "Message displayed after successful subscription",
      },
    ],
  });

  // Registration for NewsUpdates
  Builder.registerComponent(NewsUpdates, {
    name: "News Updates",
    description: "Display latest news items in a grid with images and summaries.",
    inputs: [
      {
        name: "sectionTitle",
        type: "text",
        defaultValue: "Latest News",
        helperText: "Main heading for the news section",
      },
      {
        name: "sectionSubtitle",
        type: "text",
        defaultValue: "See what's happening at Make-A-Wish New Zealand",
        helperText: "Subtitle text below the main heading",
      },
      {
        name: "viewAllButtonText",
        type: "text",
        defaultValue: "See More Latest News",
        helperText: "Text for the 'view all' button at the bottom",
      },
      {
        name: "viewAllButtonLink",
        type: "url",
        defaultValue: "/news",
        helperText: "Link for the 'view all' button",
      },
      {
        name: "newsItems",
        type: "list",
        defaultValue: [
          {
            title: "Businesses sponsor Wish Week",
            summary: "We are delighted to announce that several local businesses have committed to supporting our upcoming Wish Week 2025.",
            imageUrl: "https://images.unsplash.com/photo-1585289034189-57f7487a25f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
            linkUrl: "/news/businesses-sponsor-wish-week",
            date: "March 15, 2025"
          },
        ],
        subFields: [
          { name: "title", type: "text", required: true },
          { name: "summary", type: "longText", required: true },
          { 
            name: "imageUrl", 
            type: "file", 
            allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
            required: true 
          },
          { name: "linkUrl", type: "url", required: true },
          { name: "date", type: "text", required: true },
        ],
      },
    ],
  });

  // Registration for WishStories
  Builder.registerComponent(WishStories, {
    name: "Wish Stories Grid",
    description: "Display wish stories in a grid layout with images and summaries.",
    inputs: [
      {
        name: "sectionTitle",
        type: "text",
        defaultValue: "Our Wish Stories",
        helperText: "Main heading for the stories section",
      },
      {
        name: "sectionSubtitle",
        type: "text",
        defaultValue: "See how Make-A-Wish is involved in changing the lives of children across New Zealand",
        helperText: "Subtitle text below the main heading",
      },
      {
        name: "viewAllButtonText",
        type: "text",
        defaultValue: "Read More Wish Stories",
        helperText: "Text for the 'view all' button at the bottom",
      },
      {
        name: "viewAllButtonLink",
        type: "url",
        defaultValue: "/wish-stories",
        helperText: "Link for the 'view all' button",
      },
      {
        name: "cardBackgroundColor",
        type: "text",
        defaultValue: "bg-secondary",
        helperText: "Tailwind background color class for the cards (e.g., 'bg-secondary', 'bg-primary')",
      },
      {
        name: "stories",
        type: "list",
        defaultValue: [
          {
            name: "Amelie",
            title: "I Wish To Have A Grand Piano",
            summary: "Amelie's entire life changed when she was diagnosed with a mixed germ cell tumour – an extremely rare form of brain cancer – at age 12.",
            imageUrl: "https://images.unsplash.com/photo-1516962080544-eaca6a513767?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
            linkUrl: "/wish-stories/amelie"
          },
        ],
        subFields: [
          { name: "name", type: "text", required: true },
          { name: "title", type: "text", required: true },
          { name: "summary", type: "longText", required: true },
          { 
            name: "imageUrl", 
            type: "file", 
            allowedFileTypes: ["jpeg", "jpg", "png", "webp"],
            required: true 
          },
          { name: "linkUrl", type: "url", required: true },
        ],
      },
    ],
  });

  // Registration for ContactForm
  Builder.registerComponent(ContactForm, {
    name: "Contact Form",
    description: "A form for users to send messages, integrates with UseBasin.",
    inputs: [
      {
        name: "formTitle",
        type: "text",
        defaultValue: "Contact Us",
        helperText: "The title displayed at the top of the form.",
      },
      {
        name: "formDescription",
        type: "longText",
        defaultValue: "Fill out the form below and we\'ll get back to you.",
        helperText: "Optional text displayed below the title.",
      },
      {
        name: "useBasinUrl",
        type: "url",
        required: true,
        defaultValue: "https://usebasin.com/f/d3d78a10dc4c",
        helperText: "The UseBasin endpoint URL where form submissions will be sent.",
      },
    ],
  });

  // Registration for FAQSection
  Builder.registerComponent(FAQSection, {
    name: "FAQ Section",
    description: "Displays a list of questions and answers in an accordion style.",
    inputs: [
      {
        name: "title",
        type: "text",
        defaultValue: "Frequently Asked Questions",
        helperText: "Optional title for the FAQ section."
      },
      {
        name: "faqs",
        type: "list",
        subFields: [
          {
            name: "question",
            type: "text",
            required: true,
            defaultValue: "What is Make-A-Wish?",
          },
          {
            name: "answer",
            type: "richText", // Use richText for the answer
            required: true,
            defaultValue: "<p>Make-A-Wish creates life-changing wishes for children with critical illnesses.</p>",
          },
        ],
        defaultValue: [
          {
            question: "How can I donate?",
            answer: "<p>You can donate through our website by clicking the 'Donate' button.</p>",
          },
          {
            question: "How are wishes granted?",
            answer: "<p>Wishes are granted through the support of donors and volunteers. Learn more about the <a href=\"/wish-journey\">Wish Journey</a>.</p>",
          },
        ],
        helperText: "Add question and answer pairs."
      },
      // --- Style Inputs ---
      {
        name: "backgroundColor",
        type: "text",
        defaultValue: "bg-background",
        helperText: "Tailwind background class (e.g., 'bg-background', 'bg-muted', 'bg-blue-50')."
      },
      {
        name: "titleColor",
        type: "text",
        defaultValue: "text-primary",
        helperText: "Tailwind text color class for the main title (e.g., 'text-primary', 'text-secondary', 'text-gray-800')."
      },
      {
        name: "questionColor",
        type: "text",
        defaultValue: "text-secondary",
        helperText: "Tailwind text color class for the FAQ questions (e.g., 'text-secondary', 'text-primary', 'text-gray-700')."
      },
      {
        name: "answerColor",
        type: "text",
        defaultValue: "text-foreground",
        helperText: "Tailwind text color class for the FAQ answers (e.g., 'text-foreground', 'text-muted-foreground', 'text-gray-600')."
      },
    ],
  });

  // Register BlockQuote
  Builder.registerComponent(BlockQuote, {
      name: "BlockQuote",
      inputs: [
          {
              name: "quote",
              type: "longText",
              required: true,
              defaultValue: "This is an inspiring quote about making wishes come true.",
          },
          {
              name: "author",
              type: "text",
              defaultValue: "Author Name",
          },
          {
              name: "source",
              type: "text",
              defaultValue: "Author's Title or Organization",
          },
          {
              name: "backgroundColor",
              type: "text",
              defaultValue: "bg-secondary/10",
              helperText: "Tailwind background color class (e.g., 'bg-blue-100', 'bg-white').",
          },
          {
              name: "textColor",
              type: "text",
              defaultValue: "text-foreground",
              helperText: "Tailwind text color class (e.g., 'text-gray-800').",
          },
          {
               name: "quoteColor",
               type: "text",
               defaultValue: "text-primary",
               helperText: "Tailwind text color class for the quote icon (e.g., 'text-blue-500').",
          }
      ],
      description: "A component to display a single, prominent quote with attribution.",
      image: "https://cdn.builder.io/api/v1/image/assets%2F1ca333461ffc4ce9b6d96f0074a57d0f%2F548d0453442742738cb56d4303c05ae5", // Placeholder icon
  });

  // Register TestimonialCarousel
  Builder.registerComponent(TestimonialCarousel, {
      name: "TestimonialCarousel",
      inputs: [
          {
              name: "testimonials",
              type: "list",
              subFields: [
                  {
                      name: "quote",
                      type: "longText",
                      required: true,
                      defaultValue: "Make-A-Wish provided an unforgettable experience.",
                  },
                  {
                      name: "author",
                      type: "text",
                      required: true,
                      defaultValue: "Grateful Parent",
                  },
                  {
                      name: "source",
                      type: "text",
                      defaultValue: "Wish Family",
                  },
              ],
              defaultValue: [
                  { quote: "The thing I like about make a wish is that children can get to have their say - a laptop or a puppy, a pink party or meeting their sports hero. It's a way of expressing who they are at a time in their lives when they've usually just finished some pretty tough times and they can relax and celebrate.", author: "Dr Siobhan Cross", source: "Paediatric Haematologist/Oncologist CHOC, Waitaha Canterbury" },
                  { quote: "When the going gets tough, and it certainly gets tough, Make-A-Wish provides hope and experiences that help children, adolescents, and whānau keep going.", author: "Dr Andy Wood", source: "Paediatric Haematology-Oncology, Starship Child Health" },
                  { quote: "Another heartfelt testimonial about the impact of a wish.", author: "Wish Recipient", source: "Auckland" }, // Added a third example
              ],
              required: true,
          },
          {
              name: "backgroundColor",
              type: "text",
              defaultValue: "bg-white",
              helperText: "Tailwind background color class for the cards.",
          },
          {
              name: "textColor",
              type: "text",
              defaultValue: "text-foreground",
              helperText: "Tailwind text color class for the card text.",
          },
          {
              name: "quoteColor",
              type: "text",
              defaultValue: "text-primary",
              helperText: "Tailwind text color class for the quote icon.",
          },
           {
              name: "arrowBackgroundColor",
              type: "text",
              defaultValue: "bg-primary",
              helperText: "Tailwind background color class for the navigation arrows.",
          },
          {
              name: "arrowIconColor",
              type: "text",
              defaultValue: "text-primary-foreground",
              helperText: "Tailwind text color class for the arrow icons.",
          },
      ],
      description: "A carousel component to display multiple testimonials.",
      image: "https://cdn.builder.io/api/v1/image/assets%2F1ca333461ffc4ce9b6d96f0074a57d0f%2Fa01d5aa8194e41e59d35b2a5f6a079e2", // Placeholder icon
  });

  // Register WishJourneyStages
  Builder.registerComponent(WishJourneyStages, {
    name: "Wish Journey Stages",
    description: "Interactive component showing the stages of the wish journey.",
    // Add inputs later if customization is needed from Builder.io
    inputs: [], 
  });
  console.log(
    "Successfully registered components: HeroSection, MissionStatement, NewsletterSignup, NewsUpdates, WishStories, Heading, TextBlock, BannerPhoto"
  );
}
