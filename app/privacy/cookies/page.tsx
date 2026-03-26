import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy - Mycroft',
  description: 'Cookie policy for Mycroft and mycroft.site',
}

export default function CookiePolicyPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Cookie Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: March 2026</p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you visit a website.
              They are widely used to make websites work more efficiently and to provide information to website owners.
              This Cookie Policy explains how <strong>Mycroft</strong> uses cookies and similar technologies on{' '}
              <strong>mycroft.site</strong>.
            </p>
            <ul className="list-none pl-0 mt-4 space-y-1 text-base">
              <li><strong>Company:</strong> Mycroft</li>
              <li><strong>Address:</strong> 30 N Gould St Ste N, Sheridan, WY 82801</li>
              <li><strong>Email:</strong>{' '}
                <a href="mailto:bear@bearbrown.co" className="text-primary hover:underline">bear@bearbrown.co</a>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Cookies We Use</h2>
            <p>
              We believe in minimal data collection. Our website uses only the following cookies:
            </p>

            <h3 className="text-lg font-semibold mt-6 mb-3">Strictly Necessary / Functional Cookies</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4 font-semibold">Cookie</th>
                    <th className="text-left py-2 pr-4 font-semibold">Purpose</th>
                    <th className="text-left py-2 pr-4 font-semibold">Duration</th>
                    <th className="text-left py-2 font-semibold">Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono text-xs">theme</td>
                    <td className="py-2 pr-4">Stores your dark/light mode preference so it persists across visits</td>
                    <td className="py-2 pr-4">1 year</td>
                    <td className="py-2">Functional</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2 pr-4 font-mono text-xs">admin_session</td>
                    <td className="py-2 pr-4">Authenticates site administrators for the admin dashboard. Not set for regular visitors.</td>
                    <td className="py-2 pr-4">Session</td>
                    <td className="py-2">Strictly necessary (admin only)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Cookies We Do NOT Use</h2>
            <p>We do not use any of the following:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Advertising cookies</strong> — We do not serve ads or participate in ad networks</li>
              <li><strong>Remarketing / retargeting cookies</strong> — We do not track you across other websites</li>
              <li><strong>Cross-site tracking cookies</strong> — We do not share browsing data with third parties</li>
              <li><strong>Social media tracking pixels</strong> — We do not embed tracking pixels from social platforms</li>
              <li><strong>Analytics cookies that identify individuals</strong> — Vercel Analytics is privacy-focused and does not use cookies to track individual users</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
            <p>
              Our website includes embedded content from third-party services. When these embeds load, the
              third-party provider may set their own cookies in your browser. These cookies are not controlled
              by Mycroft.
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>
                <strong>Substack embeds</strong> — Newsletter content imported from Substack may include references
                to Substack services. See{' '}
                <a href="https://substack.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Substack&apos;s Privacy Policy
                </a>.
              </li>
              <li>
                <strong>Claude.site embeds</strong> — Tool embeds from Anthropic&apos;s Claude artifacts platform may
                set cookies. See{' '}
                <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Anthropic&apos;s Privacy Policy
                </a>.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How to Manage Cookies</h2>
            <p>
              You can control and delete cookies through your browser settings. Here&apos;s how in the most common browsers:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
              <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
              <li><strong>Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies</li>
            </ul>
            <p className="mt-4">
              Please note that disabling cookies may affect your experience on our website. Specifically:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Your dark/light mode theme preference will not persist between visits</li>
              <li>Third-party embeds (tools) may not function correctly</li>
              <li>The core website content will remain fully accessible</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Do Not Track</h2>
            <p>
              Some browsers include a &ldquo;Do Not Track&rdquo; (DNT) feature. Since we do not use tracking cookies
              or advertising technologies, our website effectively honors DNT signals by default — there is no
              tracking behavior to disable.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or
              our data practices. Any changes will be posted on this page with an updated date. We encourage you to
              periodically review this page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have questions about our use of cookies, please contact Mycroft:
            </p>
            <ul className="list-none pl-0 mt-4 space-y-1 text-base">
              <li><strong>Email:</strong>{' '}
                <a href="mailto:bear@bearbrown.co" className="text-primary hover:underline">bear@bearbrown.co</a>
              </li>
              <li><strong>Address:</strong> 30 N Gould St Ste N, Sheridan, WY 82801</li>
            </ul>
          </section>
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Link href="/privacy" className="text-primary hover:underline">
              ← Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-primary hover:underline">
              Terms of Service →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
