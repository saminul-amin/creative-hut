import { motion } from "framer-motion";

const Section = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    viewport={{ once: true }}
    className="mb-8"
  >
    <h3 className="text-xl font-semibold text-[#6fa1bd] mb-2">{title}</h3>
    <div className="text-gray-700 space-y-2">{children}</div>
  </motion.div>
);

export default function PrivacyPolicy() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-[#d6e4ec] min-h-screen py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-center text-[#4687ab] mb-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Privacy Policy
        </motion.h1>

        <Section title="1. Information We Collect">
          <div>
            <strong className="text-[#6fa1bd]">a. Personal Information</strong>
            <ul className="list-disc pl-5">
              <li>Name, email address, phone number</li>
              <li>Address, country, and national ID (for verification)</li>
              <li>Payment details (e.g., bank account, mobile wallet)</li>
              <li>Profile information (bio, skills, portfolio)</li>
            </ul>
          </div>
          <div>
          <strong className="text-[#6fa1bd]">b. Usage Information</strong>
            <ul className="list-disc pl-5">
              <li>IP address, device info, browser type</li>
              <li>Pages visited, time spent, and user interactions</li>
            </ul>
          </div>
          <div>
          <strong className="text-[#6fa1bd]">c. Communication Data</strong>
            <ul className="list-disc pl-5">
              <li>Messages between users</li>
              <li>Support requests and emails</li>
            </ul>
          </div>
        </Section>

        <Section title="2. How We Use Your Information">
          <ul className="list-disc pl-5">
            <li>Create and manage user accounts</li>
            <li>Match freelancers with relevant jobs</li>
            <li>Process payments securely</li>
            <li>Improve our services and user experience</li>
            <li>Detect and prevent fraud or illegal activities</li>
            <li>Respond to inquiries and support requests</li>
          </ul>
        </Section>

        <Section title="3. How We Share Information">
          <p>We do not sell or rent your personal data.</p>
          <p>We may share limited data with:</p>
          <ul className="list-disc pl-5">
            <li>Payment processors (to complete transactions)</li>
            <li>Verification partners (for identity checks)</li>
            <li>Legal authorities (if required by law)</li>
          </ul>
        </Section>

        <Section title="4. Data Security">
          <p>
            We use strong encryption, firewalls, and secure servers to protect
            your data. Access to your personal information is restricted to
            authorized personnel only.
          </p>
        </Section>

        <Section title="5. Your Rights">
          <ul className="list-disc pl-5">
            <li>Access, update, or delete your data</li>
            <li>Request data portability</li>
            <li>Withdraw consent at any time</li>
            <li>
              Report concerns to the Bangladesh Data Protection Authority (if
              applicable)
            </li>
          </ul>
        </Section>

        <Section title="6. Cookies and Tracking">
          <p>
            We use cookies to improve your browsing experience, remember your
            preferences, and track usage analytics. You can disable cookies in
            your browser settings.
          </p>
        </Section>

        <Section title="7. Third-Party Links">
          <p>
            Our site may include links to third-party services. We are not
            responsible for their privacy practices.
          </p>
        </Section>

        <Section title="8. Children’s Privacy">
          <p>
            Creative Hut is not intended for users under the age of 18. We do
            not knowingly collect data from minors.
          </p>
        </Section>

        <Section title="9. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. We’ll notify
            users of significant changes through email or on the platform.
          </p>
        </Section>

        <Section title="10. Contact Us">
          <p>
            If you have questions about this Privacy Policy, please contact us
            at:
          </p>
          <p className="text-[#4687ab] font-medium">
            <strong>Email:</strong> support@creativehut.com
          </p>
        </Section>
      </div>
    </section>
  );
}
