import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Courses - Mycroft",
  description: "The Mycroft course sequence from Bear Brown & Company. Each course develops a specific tier of human intelligence that AI cannot replicate.",
};

const COURSES = [
  {
    title: "BotSpeak",
    subtitle: "Fluency in AI Communication",
    description:
      "Fluency in AI communication. How to talk to machines — and know when they're talking past you. Prompt engineering, model limitations, hallucination detection, and the rhetorical gap between human intent and machine output.",
    href: "/notes/Irreducibly-Human/Irreducibly-Human-Botspeak",
    tier: "Tier 4",
  },
  {
    title: "Causal Reasoning",
    subtitle: "Causal Reasoning and World Modeling",
    description:
      "AI finds correlations. Humans build causal models. Counterfactual thinking, interventionist reasoning, and the kind of \"why\" questions that statistical models cannot answer.",
    href: "/notes/Irreducibly-Human/Irreducibly-Human-Causal-Reasoning",
    tier: "Tier 5",
  },
  {
    title: "Ethical Play",
    subtitle: "Ethical Play and Moral Imagination",
    description:
      "Moral reasoning under uncertainty, value pluralism, and the limits of rule-based ethics. Developing the capacity for ethical judgment that cannot be reduced to optimization or alignment.",
    href: "/notes/Irreducibly-Human/Irreducibly-Human-Ethical-Play",
    tier: "Tier 3",
  },
  {
    title: "AIMagineering",
    subtitle: "Creative Intelligence",
    description:
      "Generative AI produces outputs. Humans produce meaning. Creative process, aesthetic judgment, conceptual blending, and the difference between novelty and genuine originality.",
    href: "/notes/Irreducibly-Human/Irreducibly-Human-AImagineering",
    tier: "Tier 4",
  },
  {
    title: "Embodied Teaching",
    subtitle: "Embodied Teaching and Mentorship",
    description:
      "Teaching is irreducibly human. Presence, improvisation, emotional attunement, and the embodied skills that make mentorship effective — none of which transfer to a language model.",
    href: "/notes/Embodied-Teaching/Irreducibly-Human-Embodied-Teaching",
    tier: "Tier 2",
  },
  {
    title: "Conducting AI",
    subtitle: "Supervisory Intelligence",
    description:
      "The five supervisory capacities: plausibility auditing, problem formulation, tool orchestration, interpretive judgment, and executive integration. The course that teaches you to conduct the orchestra, not play every instrument.",
    href: "/notes/Irreducibly-Human/Irreducibly-Human-Conducting-AI",
    tier: "Tier 4",
  },
  {
    title: "The AI Sherpa",
    subtitle: "Experiential Learning Guide",
    description:
      "A practitioner's guide for experiential learning. The full 18-chapter arc — from design failure diagnosis through the Sherpa infrastructure to domain field guides for co-op, study abroad, clinical, trades, and corporate early career programs.",
    href: "/notes/AI-Sherpa/Irreducibly-Human-AI-Sherpa",
    tier: "Guide",
  },
];

export default function CoursesPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
          The Courses
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Each course targets a distinct human capacity that remains beyond the
          reach of current AI. Taken together, they form a map of what makes
          human intelligence irreducible.
        </p>
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/R2X2-_USSVY?si=mIyL7XqejJGbtizL"
            title="Mycroft"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {COURSES.map((course) => (
          <Link
            key={course.title}
            href={course.href}
            className="rounded-lg border bg-card p-8 shadow-sm flex flex-col hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-lg font-bold tracking-wide">
                {course.title}
              </h2>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                {course.tier}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {course.subtitle}
            </p>
            <p className="text-muted-foreground leading-relaxed flex-1">
              {course.description}
            </p>
            <span className="mt-6 text-sm font-medium text-foreground">
              View course →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
