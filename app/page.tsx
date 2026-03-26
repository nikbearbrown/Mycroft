const buttonStyles =
  'inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-black text-white shadow hover:bg-gray-800 dark:border dark:border-input dark:bg-background dark:text-foreground dark:shadow-sm dark:hover:bg-accent dark:hover:text-accent-foreground'

const buttonOutline =
  'inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground'

const COURSES = [
  {
    title: 'BOTSPEAK',
    description:
      'Fluency in AI communication. How to talk to machines — and know when they\'re talking past you. Prompt engineering, model limitations, hallucination detection, and the rhetorical gap between human intent and machine output.',
    link: 'Explore BotSpeak',
    href: '/notes/Irreducibly-Human/Irreducibly-Human-Botspeak',
  },
  {
    title: 'CAUSAL REASONING',
    description:
      'AI finds correlations. Humans build causal models. Counterfactual thinking, interventionist reasoning, and the kind of "why" questions that statistical models cannot answer.',
    link: 'Explore Causal Reasoning',
    href: '/notes/Irreducibly-Human/Irreducibly-Human-Causal-Reasoning',
  },
  {
    title: 'ETHICAL PLAY',
    description:
      'Moral reasoning under uncertainty, value pluralism, and the limits of rule-based ethics. Developing the capacity for ethical judgment that cannot be reduced to optimization or alignment.',
    link: 'Explore Ethical Play',
    href: '/notes/Irreducibly-Human/Irreducibly-Human-Ethical-Play',
  },
  {
    title: 'AIMAGINEERING',
    description:
      'Generative AI produces outputs. Humans produce meaning. Creative process, aesthetic judgment, conceptual blending, and the difference between novelty and genuine originality.',
    link: 'Explore AIMagineering',
    href: '/notes/Irreducibly-Human/Irreducibly-Human-AImagineering',
  },
  {
    title: 'EMBODIED TEACHING',
    description:
      'Teaching is irreducibly human. Presence, improvisation, emotional attunement, and the embodied skills that make mentorship effective — none of which transfer to a language model.',
    link: 'Explore Embodied Teaching',
    href: '/notes/Embodied-Teaching/Irreducibly-Human-Embodied-Teaching',
  },
  {
    title: 'CONDUCTING AI',
    description:
      'The five supervisory capacities: plausibility auditing, problem formulation, tool orchestration, interpretive judgment, and executive integration. The course that teaches you to conduct the orchestra, not play every instrument.',
    link: 'Explore Conducting AI',
    href: '/notes/Irreducibly-Human/Irreducibly-Human-Conducting-AI',
  },
  {
    title: 'THE AI SHERPA',
    description:
      'A practitioner\'s guide for experiential learning. The full 18-chapter arc — from design failure diagnosis through the Sherpa infrastructure to domain field guides for co-op, study abroad, clinical, trades, and corporate early career programs.',
    link: 'Explore The AI Sherpa',
    href: '/notes/AI-Sherpa/Irreducibly-Human-AI-Sherpa',
  },
]

const AUDIENCES = [
  {
    heading: 'FOR ENGINEERS',
    items: [
      'AI-tool-capable but no framework for evaluating outputs',
      'Need to distinguish correlation from causation in model behavior',
      'Building systems that require human judgment at the boundary',
      'Want to understand what their tools actually can\'t do',
    ],
  },
  {
    heading: 'FOR EDUCATORS',
    items: [
      'Deploying AI in embodied, relational domains',
      'Need to preserve what makes teaching human',
      'Designing curricula that develop irreducibly human skills',
      'Preparing students for a world shaped by AI',
    ],
  },
  {
    heading: 'FOR DESIGNERS',
    items: [
      'Need judgment before and after the tool runs',
      'Distinguishing generative novelty from genuine originality',
      'Building creative processes that use AI without depending on it',
      'Developing aesthetic criteria that machines cannot replicate',
    ],
  },
]

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Mycroft
              </h1>
              <p className="text-lg text-muted-foreground">
                By Bear Brown &amp; Company
              </p>
              <p className="max-w-[540px] text-lg leading-relaxed">
                A curriculum series, production pipeline, and measurement infrastructure
                for the cognitive capacities the AI era most urgently requires humans to
                develop — demonstrated by the method used to build it. The argument evolves
                through conversation with{' '}
                <a href="https://marley.bearbrown.co/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground/80">Dewey</a>.
                The curriculum takes shape as the design is debated. What you&apos;re looking
                at is the working document, not the finished product. That&apos;s the point.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a href="/courses" className={buttonStyles}>
                  Explore the Courses
                </a>
                <a href="/notes/Irreducibly-Human/Irreducibly-Human-Project" className={buttonOutline}>
                  About the Series
                </a>
              </div>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/R2X2-_USSVY?si=mIyL7XqejJGbtizL"
                title="Mycroft"
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Series Section */}
      <section className="w-full py-16 md:py-24 bg-muted/40">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-3">
              The Series
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Five courses, each targeting a distinct human capacity that remains
              beyond the reach of current AI. Taken together, they form a map of
              what makes human intelligence irreducible.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {COURSES.map((course) => (
              <div
                key={course.title}
                className="rounded-lg border bg-card p-8 shadow-sm flex flex-col"
              >
                <h3 className="text-lg font-bold tracking-wide mb-3">
                  {course.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed flex-1">
                  {course.description}
                </p>
                <a
                  href={course.href}
                  className="mt-6 text-sm font-medium text-foreground hover:underline"
                >
                  {course.link} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className="w-full py-16 md:py-24 bg-foreground text-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-background/60 mb-3">
              Who This Is For
            </h2>
            <p className="text-lg text-background/70 max-w-2xl mx-auto">
              This series is for practitioners who already use AI and need a
              framework for understanding where it stops and human judgment begins.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {AUDIENCES.map((audience) => (
              <div
                key={audience.heading}
                className="rounded-lg border border-background/10 bg-background/5 p-8"
              >
                <h3 className="text-lg font-bold tracking-wide mb-4">
                  {audience.heading}
                </h3>
                <ul className="space-y-3">
                  {audience.items.map((item) => (
                    <li
                      key={item}
                      className="text-background/80 text-sm leading-relaxed flex gap-2"
                    >
                      <span className="text-background/40 shrink-0">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24 bg-[var(--bb-2)] text-white">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-sm font-semibold tracking-widest uppercase text-white/60 mb-3">
            Begin the Sequence
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
            The series starts with BotSpeak — learning to communicate with AI systems
            clearly, critically, and without illusion. Each subsequent course builds on
            the last, developing the human capacities that no model can replicate.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/notes/Irreducibly-Human/Irreducibly-Human-Botspeak"
              className="inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-bold tracking-wide transition-colors bg-white text-[var(--bb-2)] shadow hover:bg-white/90"
            >
              START WITH BOTSPEAK
            </a>
            <a
              href="/notes/Irreducibly-Human/Irreducibly-Human-Project"
              className="inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-bold tracking-wide transition-colors border border-white/30 text-white hover:bg-white/10"
            >
              ABOUT THE SERIES
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full py-16 md:py-24 bg-foreground text-background">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
            Bear Brown &amp; Company
          </h2>
          <p className="max-w-[600px] mx-auto text-background/70 text-lg mb-8">
            Mycroft is a production of Bear Brown &amp; Company.
            For questions, reach out directly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:bear@bearbrown.co"
              className="inline-flex h-10 items-center justify-center rounded-md px-8 text-sm font-medium transition-colors border border-background/30 text-background hover:bg-background/10"
            >
              bear@bearbrown.co
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
