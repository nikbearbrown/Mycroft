import type { Metadata } from "next";
import Link from "next/link";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";

export const metadata: Metadata = {
  title: "Template Page",
  description: "A template for creating new pages",
};

export default function TemplatePage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* ===== HERO SECTION ===== */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Template Page Title</h1>
          <p className="text-xl text-muted-foreground mb-8">
            This is a template page that you can use as a starting point for creating new pages. It includes a hero section with a video, placeholder sections for content, and a resources section.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/videoseries?si=caS7A9UMCFewuuRB&amp;list=PLgOGgHS58rB-sBjm4oEfMfFXcYZf89IDo?enablejsapi=1"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="grid gap-12">
          {/* ===== PLACEHOLDER SECTION 1 ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Section 1 Title</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                This is a placeholder for your first section. You can replace this with actual content when creating a new page. Include paragraphs, lists, images, or any other content you need.
              </p>
              
              <p>
                You can add multiple paragraphs to provide detailed information. This template ensures consistent styling and layout across different pages.
              </p>
              
              <ul>
                <li>List item one</li>
                <li>List item two</li>
                <li>List item three</li>
              </ul>
            </div>
          </section>

          {/* ===== PLACEHOLDER SECTION 2 ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Section 2 Title</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                This is a placeholder for your second section. You can have as many sections as needed for your content. Each section is separated with appropriate spacing.
              </p>
              
              <p>
                Consider using different content formats in different sections to keep your page visually interesting. Options include:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Card Title 1</h3>
                  <p className="text-muted-foreground">
                    This is example card content. You can use cards to present information in a visually distinct way.
                  </p>
                </div>
                
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Card Title 2</h3>
                  <p className="text-muted-foreground">
                    This is example card content. Cards work well for presenting related pieces of information side by side.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ===== RESOURCES SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Further Resources</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="https://github.com">
                GitHub Repository
              </PrimaryButton>
              <SecondaryButton href="mailto:bear@bearbrown.co">
                Send Correspondence
              </SecondaryButton>
            </div>
            
            <div className="mt-8 text-center">
              <h3 className="text-lg font-semibold mb-2">Contact Mycroft</h3>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <a
                  href="mailto:bear@bearbrown.co"
                  className="text-sm text-primary hover:underline"
                >
                  bear@bearbrown.co
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  GitHub
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
