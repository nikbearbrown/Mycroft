"use client"

import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

export default function GoFundMeWidget({ size = "medium" }: { size?: "large" | "medium" | "small" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [embedLoaded, setEmbedLoaded] = useState(false);

  useEffect(() => {
    // Try to load the GoFundMe embed script
    const script = document.createElement("script");
    script.src = "https://www.gofundme.com/static/js/embed.js";
    script.defer = true;
    script.onload = () => {
      // Check if embed loaded successfully after a delay
      setTimeout(() => {
        if (ref.current && ref.current.children.length > 0) {
          setEmbedLoaded(true);
        }
      }, 2000);
    };
    
    if (ref.current) {
      ref.current.appendChild(script);
    }

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const campaignUrl = "https://www.gofundme.com/f/support-the-volunteers-social-impact";
  const embedUrl = `${campaignUrl}/widget/${size}`;

  return (
    <div className="space-y-4">
      {/* GoFundMe Embed Container */}
      <div ref={ref} className="gfm-embed" data-url={embedUrl}></div>
      
      {/* Fallback Button - Always show for now since embed might not work */}
      <div className="text-center">
        <button 
          onClick={() => window.open(campaignUrl, '_blank', 'noopener,noreferrer')}
          className="inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-black text-white shadow hover:bg-gray-800 dark:border dark:border-input dark:bg-background dark:shadow-sm dark:hover:bg-accent dark:hover:text-accent-foreground gap-2"
        >
          Donate on GoFundMe
          <ExternalLink className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
} 