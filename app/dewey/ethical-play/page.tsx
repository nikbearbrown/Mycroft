import type { Metadata } from "next";
import Link from "next/link";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";

export const metadata: Metadata = {
  title: "Ethical Play and Moral Imagination - Mycroft",
  description: "Tier 3 depth. Ethical frameworks as game mechanics. The AI Ethical Auditor session. The gap between structural analysis and felt moral weight.",
};

export default function EthicalPlayPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* ===== HERO SECTION ===== */}
        <div className="mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-3">Course 3 · Tier 3</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Ethical Play and Moral Imagination</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Moral reasoning under uncertainty, value pluralism, and the limits of rule-based ethics. This course develops the capacity for ethical judgment that cannot be reduced to optimization or alignment — the gap between structural analysis and felt moral weight.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/videoseries?si=caS7A9UMCFewuuRB&amp;list=PLgOGgHS58rB-sBjm4oEfMfFXcYZf89IDo?enablejsapi=1"
              title="Ethical Play - Mycroft"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="grid gap-12">
          {/* ===== FRAMEWORKS AS GAME MECHANICS ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Ethical Frameworks as Game Mechanics</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Ethical Play treats moral frameworks — deontology, consequentialism, virtue ethics, care ethics — not as competing doctrines but as game mechanics. Each framework defines a different set of rules for navigating a moral situation. Students learn to play within each framework fluently before stepping back to ask which game they should be playing.
              </p>

              <p>
                This is the core pedagogical move: ethical reasoning is not about choosing the right framework and applying it. It&apos;s about developing the judgment to know which considerations matter most in a given context, and being honest about the tradeoffs.
              </p>

              <ul>
                <li>Deontological constraints as hard rules — what you must never do</li>
                <li>Consequentialist calculation as optimization — what produces the best outcome</li>
                <li>Virtue ethics as character formation — what kind of person this decision makes you</li>
                <li>Care ethics as relational attention — who is affected and how</li>
              </ul>
            </div>
          </section>

          {/* ===== AI ETHICAL AUDITOR ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">The AI Ethical Auditor Session</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                The centerpiece of the course is the AI Ethical Auditor session. Students present an AI system — real or hypothetical — and submit it to structured ethical audit. The auditor applies each framework in turn, identifies conflicts, and produces a judgment.
              </p>

              <p>
                The critical insight emerges in the debrief: AI can perform the structural analysis. It can identify stakeholders, enumerate consequences, flag rule violations. What it cannot do is feel the moral weight of a decision. The gap between &quot;this analysis identifies a harm&quot; and &quot;this matters&quot; is irreducibly human.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Structural Analysis</h3>
                  <p className="text-muted-foreground">
                    AI can enumerate stakeholders, map consequences, and flag inconsistencies with stated principles. This is useful. But it is the beginning of moral reasoning, not the end.
                  </p>
                </div>

                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Felt Moral Weight</h3>
                  <p className="text-muted-foreground">
                    The experience of a decision mattering — of stakes being real, of consequences falling on actual people — is what converts analysis into judgment. This is what makes ethical reasoning irreducibly human.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ===== RESOURCES SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Continue the Sequence</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="/notes/Irreducibly-Human/Irreducibly-Human-AImagineering">
                Next: AIMagineering
              </PrimaryButton>
              <SecondaryButton href="/courses">
                All Courses
              </SecondaryButton>
            </div>

            <div className="mt-8 text-center">
              <h3 className="text-lg font-semibold mb-2">Questions about Ethical Play?</h3>
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
