import type { Metadata } from "next";
import Link from "next/link";
import PrimaryButton from "@/components/ui/primary-button";
import SecondaryButton from "@/components/ui/secondary-button";

export const metadata: Metadata = {
  title: "Embodied Teaching and Mentorship - Mycroft",
  description: "Tier 2 depth. AI integration planning for domains where learning happens in the body. The handoff vs. protect distinction.",
};

export default function EmbodiedTeachingPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        {/* ===== HERO SECTION ===== */}
        <div className="mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-3">Course 5 · Tier 2</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Embodied Teaching and Mentorship</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Teaching is irreducibly human. This course covers presence, improvisation, emotional attunement, and the embodied skills that make mentorship effective — none of which transfer to a language model. Students develop AI integration plans for domains where learning happens in the body.
          </p>
          <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/videoseries?si=caS7A9UMCFewuuRB&amp;list=PLgOGgHS58rB-sBjm4oEfMfFXcYZf89IDo?enablejsapi=1"
              title="Embodied Teaching - Mycroft"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="grid gap-12">
          {/* ===== HANDOFF VS PROTECT ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">The Handoff vs. Protect Distinction</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Not every teaching task should be handed to AI, and not every task needs to be protected from it. The central framework of this course is the handoff vs. protect distinction: a systematic method for deciding which parts of a teaching practice can be delegated to AI tools and which must remain in human hands.
              </p>

              <p>
                Handoff candidates are tasks where AI can perform adequately and where the human element does not meaningfully change the outcome — grading multiple-choice exams, generating practice problems, summarizing readings. Protect candidates are tasks where the human presence is the pedagogy — reading a room, adjusting pace in real time, responding to a student&apos;s confusion with the right question at the right moment.
              </p>

              <ul>
                <li>Handoff: administrative, repetitive, and content-delivery tasks</li>
                <li>Protect: relational, improvisational, and presence-dependent tasks</li>
                <li>Gray zone: tasks that seem delegable but lose critical value when automated</li>
                <li>The integration plan: a structured document mapping each task to handoff or protect</li>
              </ul>
            </div>
          </section>

          {/* ===== EMBODIED DOMAINS ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Learning in the Body</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Some domains teach through the body: music, athletics, surgery, dance, martial arts, physical therapy. In these fields, the mentor&apos;s physical presence, demonstration, and real-time adjustment are not supplementary — they are the primary medium of instruction.
              </p>

              <p>
                This course operates at Tier 2 depth because the skills it addresses are among the most obviously irreducible. No AI system can physically demonstrate a technique, feel a student&apos;s tension, or adjust a hand position. The pedagogical challenge is not whether AI can replace embodied teaching — it clearly cannot — but how to integrate AI tools without eroding the embodied core.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Presence</h3>
                  <p className="text-muted-foreground">
                    A teacher&apos;s physical and emotional presence shapes the learning environment in ways that cannot be replicated through a screen, let alone a text interface. Students examine what &quot;presence&quot; means operationally and why it matters pedagogically.
                  </p>
                </div>

                <div className="p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Improvisation</h3>
                  <p className="text-muted-foreground">
                    Effective teaching is improvisational. The plan is a starting point, but the real teaching happens in response to what the students actually do. AI cannot improvise in this sense because it cannot read the room.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ===== RESOURCES SECTION ===== */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Back to the Beginning</h2>
            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <PrimaryButton href="/notes/Irreducibly-Human/Irreducibly-Human-Botspeak">
                Start Over: BotSpeak
              </PrimaryButton>
              <SecondaryButton href="/courses">
                All Courses
              </SecondaryButton>
            </div>

            <div className="mt-8 text-center">
              <h3 className="text-lg font-semibold mb-2">Questions about Embodied Teaching?</h3>
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
