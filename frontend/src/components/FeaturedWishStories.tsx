import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle } from 'lucide-react';

interface StoryProps {
  childName: string;
  wishTitle: string;
  storyText: string;
  readMoreText: string;
  readMoreLink: string;
  imageUrl: string;
  imageAlt: string;
  highlightColor?: string; // Color class for highlights, e.g., 'text-pink-500'
  buttonGradient?: string; // Gradient class for button, e.g., 'from-blue-600 to-blue-700'
  buttonHoverGradient?: string; // Hover gradient class, e.g., 'hover:from-blue-700 hover:to-blue-800'
  isVideo?: boolean; // Whether this is a video story
  videoEmbedUrl?: string; // YouTube embed URL if it's a video
  reverseLayout?: boolean; // Whether to reverse the layout (image right, text left)
}

interface Props {
  stories?: StoryProps[];
}

export const FeaturedWishStories: React.FC<Props> = ({
  stories = [
    // Default story 1: Amelie
    {
      childName: "Amelie",
      wishTitle: "I Wish To Have A Grand Piano",
      storyText: "Amelie's entire life changed when she was diagnosed with a mixed germ cell tumour – an extremely rare form of brain cancer – at age 12...",
      readMoreText: "Read More",
      readMoreLink: "/wish-stories/amelie",
      imageUrl: "https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/Amelie-playing-piano.webp",
      imageAlt: "Amelie playing her grand piano",
      highlightColor: "text-destructive",
      buttonGradient: "from-primary to-blue-700", // Default blue gradient
      buttonHoverGradient: "hover:from-blue-700 hover:to-blue-800", // Default blue hover gradient
      isVideo: false,
      reverseLayout: false
    },
    // Default story 2: Caiden (Video)
    {
      childName: "Caiden",
      wishTitle: "See the Power of A Wish",
      storyText: "Caiden's childhood changed when he was diagnosed with a brain stem tumour. Watch his powerful wish for a bird aviary come true in the video!",
      readMoreText: "Read Caiden's Story",
      readMoreLink: "/wish-stories/caiden",
      imageUrl: "", // Not used for video
      imageAlt: "Caiden's wish video",
      highlightColor: "text-destructive", // Default to Brand Red
      buttonGradient: "from-secondary to-teal-600", // Default teal gradient
      buttonHoverGradient: "hover:from-teal-600 hover:to-teal-700", // Default teal hover gradient
      isVideo: true,
      videoEmbedUrl: "https://www.youtube.com/embed/RG-6m10tHSc",
      reverseLayout: true
    }
  ]
}) => {
  return (
    <>
      {stories.map((story, index) => (
        <section key={index} className={`py-8 ${index > 0 ? 'mt-12' : ''}`}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-8 relative">
              {/* Content */}
              <div className={`w-full lg:w-1/2 ${story.reverseLayout ? 'lg:order-2' : 'lg:order-1'} bg-card p-8 rounded-lg shadow-lg relative z-10`}>
                {/* Star Decoration using uploaded SVG */}
                <img
                  src="https://static.databutton.com/public/70b6a46a-5403-4152-84ce-6a9ec9a87a0f/file.svg"
                  alt="" // Decorative
                  aria-hidden="true"
                  className={`absolute -top-4 ${story.reverseLayout ? '-left-4' : '-right-4'} w-10 h-10 opacity-50 z-20`} // Retained positioning and size, adjust opacity if needed
                />
                
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  <span className={story.highlightColor || 'text-destructive'}>
                    {story.childName}'s Story: {story.wishTitle}
                  </span>
                </h2>
                
                {!story.isVideo && (
                  <h3 className="text-xl font-bold text-foreground mb-4">Check out {story.childName}'s amazing story!</h3>
                )}
                
                <p className="text-muted-foreground mb-6">
                  {story.storyText}
                </p>
                
                <Link 
                  to={story.readMoreLink} 
                  className={`inline-block text-white font-medium px-8 py-3 rounded-full shadow-md transition duration-300 hover:shadow-lg bg-gradient-to-r ${story.buttonGradient || 'from-primary to-blue-700'} ${story.buttonHoverGradient || 'hover:from-blue-700 hover:to-blue-800'}`}
                >
                  {story.readMoreText}
                </Link>
              </div>
              
              {/* Image or Video */}
              <div className={`w-full lg:w-1/2 ${story.reverseLayout ? 'lg:order-1' : 'lg:order-2'} mb-6 lg:mb-0 relative`}>
                {story.isVideo ? (
                  // Video container
                  <>
                    <div className="absolute -bottom-4 -left-4 w-full h-full bg-secondary/10 rounded-lg transform -rotate-1"></div>
                    <div className="absolute -top-4 -right-4 w-full h-full bg-primary/10 rounded-lg transform rotate-1"></div>
                    <div className="relative rounded-lg overflow-hidden shadow-lg aspect-video z-10">
                      <iframe 
                        className="absolute inset-0 w-full h-full" 
                        src={story.videoEmbedUrl}
                        title={`YouTube video player - ${story.childName}'s Wish`}
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" 
                        allowFullScreen
                      ></iframe>
                    </div>
                  </>
                ) : (
                  // Image container
                  <>
                    <div className="absolute -top-4 -left-4 w-full h-full bg-destructive/10 rounded-lg transform rotate-2"></div>
                    <div className="absolute -bottom-4 -right-4 w-full h-full bg-accent/10 rounded-lg transform -rotate-2"></div>
                    <img 
                      src={story.imageUrl}
                      alt={story.imageAlt}
                      className="w-full h-auto rounded-lg shadow-lg object-cover aspect-[3/2] relative z-10"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};
