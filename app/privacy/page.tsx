import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy - Mycroft',
  description: 'Privacy policy for Mycroft and mycroft.site',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container px-4 md:px-6 mx-auto py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: March 2026</p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p>
              Welcome to <strong>mycroft.site</strong>, operated by <strong>Mycroft</strong>. We are committed to protecting your
              personal information and your right to privacy. If you have any questions or concerns about this privacy
              policy or our practices with regard to your personal information, please contact us at{' '}
              <a href="mailto:bear@bearbrown.co" className="text-primary hover:underline">bear@bearbrown.co</a>.
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
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p>
              We collect personal information that you voluntarily provide to us when you contact us through our
              website, express an interest in obtaining information about us or our financial services, participate
              in activities on the website, or otherwise contact us.
            </p>
            <p className="mt-4">
              The personal information we collect depends on the context of your interactions with us and the website,
              the choices you make, and the services you use. The personal information we collect may include:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Name and Contact Data:</strong> We collect your name, email address, and other similar contact data when you reach out to us via correspondence or email.</li>
              <li><strong>Inquiry Content:</strong> We collect the content of messages, questions, and inquiries you send through the site.</li>
              <li><strong>Engagement Data:</strong> When engaging our financial services, we may collect business information, account requirements, and related professional details as governed by separate agreements.</li>
            </ul>
            <p className="mt-4">
              We also automatically collect certain information when you visit our website, including standard analytics
              data (page views, browser type, referring pages, device information) through Vercel Analytics. This data
              is aggregated and does not personally identify you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <p>We use the information we collect or receive:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>To respond to your inquiries and provide support</li>
              <li>To deliver financial services you have engaged</li>
              <li>To send administrative information, such as updates to our terms or policies</li>
              <li>To send relevant updates about our services and publications (only with your consent)</li>
              <li>To improve our website, content, and services</li>
              <li>To understand site usage through aggregated analytics</li>
              <li>To protect our services and enforce our terms</li>
              <li>To respond to legal requests and prevent harm</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Sharing Your Information</h2>
            <p>
              We do not sell, rent, or trade any of your personal information with third parties for their
              promotional purposes.
            </p>
            <p className="mt-4">
              We may process or share your data based on the following legal bases:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Consent:</strong> We may process your data if you have given us specific consent to use your personal information for a specific purpose.</li>
              <li><strong>Legitimate Interests:</strong> We may process your data when it is reasonably necessary to achieve our legitimate business interests, such as improving our services or responding to inquiries.</li>
              <li><strong>Performance of a Contract:</strong> Where we have entered into an agreement or other contract with you, we may process your personal information to fulfill the terms of that agreement.</li>
              <li><strong>Legal Obligations:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
              <li><strong>Vital Interests:</strong> We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to safety, or as evidence in litigation.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
            <p>This website integrates with the following third-party services, each with its own privacy policy:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li><strong>Vercel:</strong> Website hosting and privacy-focused analytics</li>
              <li><strong>Neon:</strong> PostgreSQL database infrastructure</li>
              <li><strong>Substack:</strong> Newsletter publishing and distribution platform</li>
              <li><strong>Anthropic:</strong> AI-powered tools</li>
              <li><strong>GitHub:</strong> Source code hosting and collaboration</li>
            </ul>
            <p className="mt-4">
              We encourage you to review the privacy policies of these third-party services. Mycroft is not
              responsible for the privacy practices of external services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking Technologies</h2>
            <p>
              We use minimal cookies and do not use advertising or cross-site tracking technologies. For detailed
              information about the cookies we use and how to manage them, please see our{' '}
              <Link href="/privacy/cookies" className="text-primary hover:underline">Cookie Policy</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p>
              We have implemented appropriate technical and organizational security measures designed to protect the
              security of any personal information we process. This includes using encrypted connections (HTTPS),
              secure cloud infrastructure providers, and access controls on administrative systems.
            </p>
            <p className="mt-4">
              However, please remember that no method of transmission over the Internet or method of electronic
              storage is 100% secure. While we strive to use commercially acceptable means to protect your personal
              information, we cannot guarantee its absolute security. Transmission of personal information to and
              from our website is at your own risk. You should only access our services within a secure environment.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
            <p>
              We will only keep your personal information for as long as it is necessary for the purposes set out
              in this privacy policy, unless a longer retention period is required or permitted by law (such as tax,
              accounting, or other legal requirements).
            </p>
            <p className="mt-4">
              When we have no ongoing legitimate business need to process your personal information, we will either
              delete or anonymize such information, or, if this is not possible (for example, because your personal
              information has been stored in backup archives), then we will securely store your personal information
              and isolate it from any further processing until deletion is possible.
            </p>
            <p className="mt-4">
              Analytics data is retained in aggregated, non-identifiable form and is not subject to individual
              deletion requests.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Privacy Rights</h2>
            <p>
              Depending on your location, you may have certain rights under applicable data protection laws.
              These may include the right:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>To request access and obtain a copy of your personal information</li>
              <li>To request rectification or erasure of your personal information</li>
              <li>To restrict the processing of your personal information</li>
              <li>If applicable, to data portability</li>
              <li>To withdraw consent at any time for processing based on consent</li>
            </ul>
            <p className="mt-4">
              In certain circumstances, you may also have the right to object to the processing of your personal
              information. To make such a request, please contact us using the details provided below. We will
              consider and act upon any request in accordance with applicable data protection laws and will respond
              within 30 days.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Children&apos;s Privacy</h2>
            <p>
              Our website and services are not directed at children under the age of 13. We do not knowingly
              collect personal information from children under 13. If you are a parent or guardian and believe
              your child has provided us with personal information, please contact us and we will promptly
              delete such information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update this privacy policy from time to time in order to reflect changes to our practices or
              for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the
              new privacy policy on this page with an updated date. You are advised to review this privacy policy
              periodically for any changes. Changes to this privacy policy are effective when they are posted on
              this page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have questions or comments about this privacy policy, please contact Mycroft:
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
            <Link href="/terms-of-service" className="text-primary hover:underline">
              ← Terms of Service
            </Link>
            <Link href="/privacy/cookies" className="text-primary hover:underline">
              Cookie Policy →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
