import type { Metadata } from "next";
import Link from "next/link";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";

export const metadata: Metadata = {
  title: "AIMagineering: Creative Intelligence - Mycroft",
  description: "The Full Design Pipeline. Tier 4 depth. Empathize, Define, Ideate, Prototype, Test, Commit — the Commit stage that Design Thinking omits.",
};

export default function AIMagineeringPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* ===== HERO SECTION ===== */}
        <div className="mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-3">Course 4 · Tier 4</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">AIMagineering: The Full Design Pipeline</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Generative AI produces outputs. Humans produce meaning. This course covers the full design pipeline — including the Commit stage that standard Design Thinking omits — and the difference between novelty and genuine originality.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/videoseries?si=caS7A9UMCFewuuRB&amp;list=PLgOGgHS58rB-sBjm4oEfMfFXcYZf89IDo?enablejsapi=1"
              title="AIMagineering - Mycroft"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="grid gap-12">
          {/* ===== THE PIPELINE ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">The Six-Stage Pipeline</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Standard Design Thinking runs five stages: Empathize, Define, Ideate, Prototype, Test. AIMagineering adds a sixth — Commit — because the decision to ship, to stand behind a design, to accept responsibility for its consequences, is where human judgment becomes non-negotiable.
              </p>

              <p>
                AI can assist in every stage of the pipeline. It can synthesize user research, generate variations, build prototypes, and even simulate test scenarios. But it cannot commit. Commitment requires ownership, accountability, and the willingness to be wrong — capacities that have no equivalent in a generative model.
              </p>

              <ul>
                <li>Empathize — understand the problem from inside the user&apos;s experience</li>
                <li>Define — frame the problem in terms that make it solvable</li>
                <li>Ideate — generate possibilities without premature evaluation</li>
                <li>Prototype — make ideas concrete enough to test</li>
                <li>Test — expose the prototype to reality and learn from the collision</li>
                <li>Commit — decide, ship, and take responsibility for the outcome</li>
              </ul>
            </div>
          </section>

          {/* ===== THE COMMIT STAGE ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">The Commit Stage</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Design Thinking typically ends at Test. The assumption is that iteration continues indefinitely — you test, learn, and loop back. But real design requires a moment of commitment: this is what we&apos;re building. This is what we stand behind.
              </p>

              <p>
                The Commit stage is where creative intelligence becomes irreducibly human. It requires integrating aesthetic judgment, ethical consideration, practical constraint, and personal conviction into a single decision. No model can do this, because no model has stakes.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Novelty vs. Originality</h3>
                  <p className="text-muted-foreground">
                    Generative AI excels at novelty — producing outputs that are statistically unlikely given the training data. Originality requires something more: a perspective, a reason, a point of view that the work embodies. Students learn to distinguish between the two.
                  </p>
                </div>

                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Conceptual Blending</h3>
                  <p className="text-muted-foreground">
                    Human creativity often works by combining concepts from different domains in ways that create new meaning. This is not the same as interpolation. Students practice conceptual blending as a deliberate creative method.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ===== RESOURCES SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Continue the Sequence</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="/notes/Embodied-Teaching/Irreducibly-Human-Embodied-Teaching">
                Next: Embodied Teaching
              </PrimaryButton>
              <SecondaryButton href="/courses">
                All Courses
              </SecondaryButton>
            </div>

            <div className="mt-8 text-center">
              <h3 className="text-lg font-semibold mb-2">Questions about AIMagineering?</h3>
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
