import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About - Mycroft',
  description: 'Mycroft — What AI Can and Can\'t Do. A 5-course series from Bear Brown & Company.',
}

export default function AboutPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tighter mb-8">About the Series</h1>

        <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
          <section>
            <p>
              Mycroft is a 5-course series from Bear Brown &amp; Company.
              Each course develops a specific tier of human
              intelligence that AI cannot replicate. The series asks: what remains irreducibly
              human in an age of increasingly capable AI?
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Author</h2>
            <p>
              <strong>Nik Bear Brown</strong>, Bear Brown &amp; Company. Creator of the
              Mycroft curriculum.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">The Thesis</h2>
            <p>
              AI excels at pattern matching, statistical correlation, and content generation.
              It does not reason causally, exercise moral judgment, commit to creative
              decisions, or teach through embodied presence. These capacities are not gaps
              to be closed — they are the defining features of human intelligence.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">The Five Courses</h2>
            <ul>
              <li>
                <Link href="/notes/Irreducibly-Human/Irreducibly-Human-Botspeak" className="text-primary hover:underline">BotSpeak</Link> — Tier 4: Creative Authorship
              </li>
              <li>
                <Link href="/notes/Irreducibly-Human/Irreducibly-Human-Causal-Reasoning" className="text-primary hover:underline">Causal Reasoning</Link> — Tier 5: Causal Reasoning
              </li>
              <li>
                <Link href="/notes/Irreducibly-Human/Irreducibly-Human-Ethical-Play" className="text-primary hover:underline">Ethical Play</Link> — Tier 3: Ethical Play
              </li>
              <li>
                <Link href="/notes/Irreducibly-Human/Irreducibly-Human-AImagineering" className="text-primary hover:underline">AIMagineering</Link> — Tier 4: Creative Authorship
              </li>
              <li>
                <Link href="/notes/Embodied-Teaching/Irreducibly-Human-Embodied-Teaching" className="text-primary hover:underline">Embodied Teaching</Link> — Tier 2: Embodied Teaching
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <p>
              Enquiries may be directed to{' '}
              <a href="mailto:bear@bearbrown.co" className="text-primary hover:underline">bear@bearbrown.co</a>.
            </p>
            <p className="mt-2 text-muted-foreground">
              Bear Brown &amp; Company
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
