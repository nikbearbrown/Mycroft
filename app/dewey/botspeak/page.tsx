import type { Metadata } from "next";
import Link from "next/link";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";

export const metadata: Metadata = {
  title: "BotSpeak: Fluency in AI Communication - Mycroft",
  description: "The Nine Pillars of AI Fluency. Tier 4 depth. Five Modes framework, tier taxonomy, AI collaboration as professional competency. The series entry point.",
};

export default function BotSpeakPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* ===== HERO SECTION ===== */}
        <div className="mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-3">Course 1 · Tier 4</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">BotSpeak: The Nine Pillars of AI Fluency</h1>
          <p className="text-xl text-muted-foreground mb-8">
            How to talk to machines — and know when they&apos;re talking past you. This is the series entry point: the course that establishes AI collaboration as a professional competency, not a novelty.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/videoseries?si=caS7A9UMCFewuuRB&amp;list=PLgOGgHS58rB-sBjm4oEfMfFXcYZf89IDo?enablejsapi=1"
              title="BotSpeak - Mycroft"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="grid gap-12">
          {/* ===== THE FIVE MODES FRAMEWORK ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">The Five Modes Framework</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                BotSpeak organizes AI interaction into five distinct modes of engagement. Each mode demands a different kind of human judgment — from formulating precise queries to evaluating whether the output actually answers the question you meant to ask.
              </p>

              <p>
                The framework treats prompt engineering not as a trick or a hack, but as a communication discipline. Students learn to recognize when a model is confidently wrong, when it&apos;s hedging because it doesn&apos;t know, and when the output is structurally sound but semantically empty.
              </p>

              <ul>
                <li>Mode 1: Directed Query — asking the right question in the right form</li>
                <li>Mode 2: Iterative Refinement — shaping output through structured dialogue</li>
                <li>Mode 3: Constraint Specification — defining what the model must not do</li>
                <li>Mode 4: Evaluation and Audit — assessing output against human standards</li>
                <li>Mode 5: Collaborative Synthesis — combining human and machine contributions</li>
              </ul>
            </div>
          </section>

          {/* ===== TIER TAXONOMY ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">The Tier Taxonomy</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Not all human capacities are equally resistant to automation. The tier taxonomy provides a framework for assessing which skills AI can approximate, which it can assist, and which remain entirely beyond its reach.
              </p>

              <p>
                BotSpeak introduces this taxonomy at Tier 4 depth — meaning students engage with the material at a level that requires genuine critical analysis, not just recall or application. The taxonomy itself becomes a tool for evaluating every subsequent course in the series.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Hallucination Detection</h3>
                  <p className="text-muted-foreground">
                    Models produce plausible-sounding outputs that are factually wrong. Students learn systematic methods for identifying hallucinations — not by checking every fact, but by recognizing the structural patterns that indicate confabulation.
                  </p>
                </div>

                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">The Rhetorical Gap</h3>
                  <p className="text-muted-foreground">
                    The distance between what you intend to communicate and what the model interprets. BotSpeak trains students to close this gap — not by dumbing down their prompts, but by understanding how models parse intent.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ===== RESOURCES SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Continue the Sequence</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="/notes/Irreducibly-Human/Irreducibly-Human-Causal-Reasoning">
                Next: Causal Reasoning
              </PrimaryButton>
              <SecondaryButton href="/courses">
                All Courses
              </SecondaryButton>
            </div>

            <div className="mt-8 text-center">
              <h3 className="text-lg font-semibold mb-2">Questions about BotSpeak?</h3>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <a
                  href="mailto:bear@bearbrown.co"
                  className="text-sm text-primary hover:underline"
                >
                  bear@bearbrown.co
                </a>
                <Link
                  href="/notes/Irreducibly-Human/Irreducibly-Human-Project"
                  className="text-sm text-primary hover:underline"
                >
                  About the Series
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
