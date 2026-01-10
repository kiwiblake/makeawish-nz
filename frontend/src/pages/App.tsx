import React, { useEffect, useState } from "react";
import { builder, BuilderContent, BuilderComponent } from "@builder.io/react";
import { useLocation, Link } from "react-router-dom"; // Import useLocation and Link
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import { Button } from "@/components/ui/button"; // Import Button

import { registerBuilderComponents } from "@/utils/builderRegistry";

// Use the public Builder API Key directly
const BUILDER_API_KEY = "2cd2fafa05294fe78a360593ee6469ca"; // Public key

// Define the Home page component (which now acts as the Builder renderer)
export default function App() {
  const [builderContent, setBuilderContent] = useState<BuilderContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const location = useLocation(); // Get location object

  // Initialize Builder and register components on mount
  // This useEffect only runs once to initialize and register components
  useEffect(() => {
    console.log("App: Initializing Builder and registering components...");
    builder.init(BUILDER_API_KEY);
    registerBuilderComponents();
    console.log("App: Builder initialized and components registered.");
  }, []); // Empty dependency array ensures this runs only once

  // Fetch Builder content based on the relative path
  // This useEffect runs when the location changes
  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      setError(null);
      setBuilderContent(null); // Clear previous content on new fetch

      // Get the relative path directly from React Router's location object
      let relativeUrlPath = location.pathname;
      console.log(`App: Using location.pathname directly: '${relativeUrlPath}'`);

      // Normalize if it's empty or just '/' (representing the base path)
      // NOTE: In Databutton dev env, base path might be complex, but for Builder targeting, '/' usually works.
      // If running deployed without a subpath, '/' should represent the root.
      // If deployed WITH a subpath, Builder targeting might need adjustment or ensure router handles it.
      if (relativeUrlPath === "" || relativeUrlPath === "/") {
        relativeUrlPath = "/"; // Target the root in Builder
        console.log("App: Path is root, using '/' for Builder.");
      }
      // Ensure it starts with a slash if it's not the root (e.g., 'fundraise' -> '/fundraise')
      else if (!relativeUrlPath.startsWith("/")) {
         relativeUrlPath = `/${relativeUrlPath}`;
         console.log(`App: Added leading slash: '${relativeUrlPath}'`);
      }

      console.log(`App: Final relativeUrlPath for Builder targeting: ${relativeUrlPath}`);

      // --- START: Added Redirect Check ---
      try {
        console.log(`App: Checking for redirects for path: ${relativeUrlPath}`);
        // Corrected: getAll returns the promise directly
        const redirects = await builder.getAll("url-redirects", {
          // Querying the 'url-redirects' model data interface
          query: {
            "data.sourceUrl": relativeUrlPath,
          },
          limit: 1, // We only need the first match
          // options: { cachebust: true } // Optional: Add if experiencing caching issues
        }); // <<< REMOVED .promise()

        if (redirects && redirects.length > 0 && redirects[0].data?.destinationUrl) {
          const destinationUrl = redirects[0].data.destinationUrl;
          console.log(`App: Redirect found! Path '${relativeUrlPath}' -> '${destinationUrl}'. Redirecting...`);
          window.location.replace(destinationUrl);
          return; // Exit the fetchContent function early if redirecting
        } else {
           console.log(`App: No redirect found for path: ${relativeUrlPath}`);
        }
      } catch (redirectErr) {
        // Log errors during redirect check, but don't prevent page content fetch
        console.error("App: Error checking for Builder.io redirects:", redirectErr);
      }
      // --- END: Added Redirect Check ---

      // --- START: Existing Page Fetch ---
      try {
        // Log added for clarity
        console.log(`App: Fetching 'page' content for path: ${relativeUrlPath}`);
        const content = await builder
          .get("page", { // Fetching the 'page' model
            userAttributes: { urlPath: relativeUrlPath },
             // Add cachebust: true during development if you experience caching issues
             // options: { cachebust: true } 
          })
          .promise();

        // Check if the fetched 'page' content itself is a redirect
        if (content?.data?.redirectUrl) {
          console.log(`App: Page model redirect detected! Path '${relativeUrlPath}' -> '${content.data.redirectUrl}'. Redirecting...`);
          window.location.replace(content.data.redirectUrl);
          return; // Stop further execution in fetchContent if redirecting
        }

        console.log("App: Builder content fetched:", content);
        setBuilderContent(content || null); // Set to null if content is undefined/null
        if (!content) {
          console.warn(`App: No Builder content found for path: ${relativeUrlPath}`);
          // No error, just show 'not found' message later
        }
      } catch (err) {
        console.error("App: Error fetching Builder content:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch content"));
        setBuilderContent(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [location.pathname]); // Re-run effect when pathname changes

  // NOTE: We removed the hardcoded <NavigationBar>, <HeroSection>, etc.
  // The BuilderComponent will render these based on the fetched content.
  // Ensure your Builder 'page' model includes Navbar/Footer or handle layout separately.

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Main content area where Builder renders */}
      <main className="flex-grow">
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-64 space-y-4 p-4">
             {/* Placeholder for loading content */}
             <Skeleton className="h-8 w-3/4 rounded-md" />
             <Skeleton className="h-4 w-full rounded-md" />
             <Skeleton className="h-4 w-5/6 rounded-md" />
          </div>
        )}
        {error && (
          <div className="text-destructive bg-destructive/10 border border-destructive/50 rounded p-4 m-4">
            <p>Error loading Builder content: {error.message}</p>
          </div>
        )}
        {!isLoading && !error && builderContent && (
          // Render the Builder page content
          <BuilderComponent model="page" content={builderContent} />
        )}
        {!isLoading && !error && !builderContent && (
          // Display message if no content found (and no error)
          // Consider creating a default "Not Found" page in Builder for the '/' route
          // or adding default components here if needed.
          <div className="flex flex-col items-center justify-center text-center p-8 pt-16">
            <h1 className="text-4xl font-bold text-primary mb-4">404 - Page Not Found</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              Oops! We couldn't find the specific content for this page ({location.pathname}) in our system. 
              Let's get you back on track.
            </p>
            <Link to="/">
              <Button variant="default" size="lg">
                Go Back Home
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
