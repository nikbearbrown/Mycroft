import type { Metadata } from "next";
import Link from "next/link";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";

export const metadata: Metadata = {
  title: "Causal Reasoning and World Modeling - Mycroft",
  description: "Tier 5 depth. DAG construction, the backdoor criterion, and the identification layer. Students build defensible causal models.",
};

export default function CausalReasoningPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* ===== HERO SECTION ===== */}
        <div className="mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-3">Course 2 · Tier 5</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Causal Reasoning and World Modeling</h1>
          <p className="text-xl text-muted-foreground mb-8">
            AI finds correlations. Humans build causal models. This course operates at Tier 5 — the deepest level in the series — because causal reasoning is the capacity that most decisively separates human cognition from statistical pattern matching.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/videoseries?si=caS7A9UMCFewuuRB&amp;list=PLgOGgHS58rB-sBjm4oEfMfFXcYZf89IDo?enablejsapi=1"
              title="Causal Reasoning - Mycroft"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="grid gap-12">
          {/* ===== DAG CONSTRUCTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">DAG Construction</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                A Directed Acyclic Graph (DAG) is the formal representation of a causal model. Students learn to construct DAGs from domain knowledge — not from data. This is the critical distinction: data can tell you what happened, but only a human can propose why.
              </p>

              <p>
                The course walks through the full process of building a DAG: identifying variables, specifying directed edges that represent causal claims, and — most importantly — defending the exclusion of edges. Every missing arrow is an assertion that two variables are not directly causally related, and every such assertion must be justified.
              </p>

              <ul>
                <li>Variable selection from domain expertise, not data mining</li>
                <li>Edge specification as causal claims requiring justification</li>
                <li>Missing edges as testable assumptions</li>
                <li>Iterative refinement through peer critique and empirical challenge</li>
              </ul>
            </div>
          </section>

          {/* ===== IDENTIFICATION LAYER ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">The Backdoor Criterion and Identification</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Once a DAG is constructed, the identification layer determines whether a causal effect can be estimated from observational data. The backdoor criterion provides a systematic method: if you can block all backdoor paths between treatment and outcome by conditioning on a set of variables, the causal effect is identified.
              </p>

              <p>
                This is where the course reaches Tier 5. Students must reason about confounding, collider bias, and mediation — concepts that require genuine counterfactual thinking. No current AI system can construct a defensible causal model from scratch, because doing so requires knowledge of the world that is not contained in the data.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Confounding</h3>
                  <p className="text-muted-foreground">
                    A common cause of both treatment and outcome creates a spurious association. Students learn to identify confounders from the DAG structure and condition on them appropriately — or recognize when conditioning introduces new bias.
                  </p>
                </div>

                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Collider Bias</h3>
                  <p className="text-muted-foreground">
                    Conditioning on a common effect of two variables opens a non-causal path between them. This is counterintuitive and routinely missed by automated analyses. Recognizing collider structures requires understanding the causal story, not just the statistical associations.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ===== RESOURCES SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Continue the Sequence</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="/notes/Irreducibly-Human/Irreducibly-Human-Ethical-Play">
                Next: Ethical Play
              </PrimaryButton>
              <SecondaryButton href="/courses">
                All Courses
              </SecondaryButton>
            </div>

            <div className="mt-8 text-center">
              <h3 className="text-lg font-semibold mb-2">Questions about Causal Reasoning?</h3>
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
