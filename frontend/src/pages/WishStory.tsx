t// ui/src/pages/WishStory.tsx
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BuilderComponent, builder } from '@builder.io/react';
import { registerBuilderComponents } from "@/utils/builderRegistry";

const BUILDER_API_KEY = "2cd2fafa05294fe78a360593ee6469ca";

export default function WishStory() {
  const [searchParams] = useSearchParams();
  const storyIdentifier = searchParams.get('story');

  useEffect(() => {
    // Still need to init builder and register components
    builder.init(BUILDER_API_KEY);
    registerBuilderComponents();
    console.log("WishStory page: Builder initialized and components registered.");
  }, []);

  if (!storyIdentifier) {
     return <div className="p-8 text-center text-red-600">Error: Wish story identifier missing in URL (?story=...).</div>;
  }

  // Let BuilderComponent handle fetching the model and applying the data query
  // based on the context we provide
  console.log(`WishStory page: Rendering BuilderComponent for model 'wish-stories-page' with context:`, { storySlug: storyIdentifier });
  return (
    <BuilderComponent
      model="wish-stories-page" // Specify the model to fetch
      context={{ storySlug: storyIdentifier }} // Provide context for the data query
      options={{ cachebust: true }} // Optional: keep cachebust for testing
      // BuilderComponent has built-in handling for not found/error states,
      // but we might need custom UI later if desired.
      // Example placeholders:
      // loading={<div className="p-8 text-center">Loading...</div>}
      // contentError={error => <div className="p-8 text-center text-red-600">Error: {error.message}</div>}
    />
  );
}
