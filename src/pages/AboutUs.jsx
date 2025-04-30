import { motion } from "framer-motion";

const SectionBox = ({ icon, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    viewport={{ once: true }}
    className="bg-white rounded-2xl shadow-md p-6 border border-blue-100"
  >
    <h3 className="text-xl font-semibold text-blue-800 mb-2 flex items-center gap-2">
      <span className="text-2xl">{icon}</span> {title}
    </h3>
    <p className="text-gray-700 leading-relaxed">{children}</p>
  </motion.div>
);

export default function AboutUs() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-[#d6e4ec] py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-center text-[#4687ab] mt-18 mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          About Creative Hut
        </motion.h1>
        <motion.p
          className="text-center text-lg text-gray-800 max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Empowering Bangladesh, Connecting the World. We’re not just another
          freelancing platform—we’re a movement to uplift local talent globally.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <SectionBox icon="✨" title="Our Vision">
            To create the most trusted freelancing platform where Bangladeshi
            freelancers thrive and international clients find reliable talent
            with ease.
          </SectionBox>

          <SectionBox icon="🎯" title="Our Mission">
            🧑‍💻 Provide a platform for Bangladeshi freelancers
            <br />
            🌐 Connect with clients globally
            <br />
            💰 Fair commission & transparent policies
            <br />
            📲 Support local payment methods
            <br />
            🎓 Offer training and community support
          </SectionBox>

          <SectionBox icon="💡" title="What Makes Us Unique">
            🇧🇩 100% Bangladeshi workforce
            <br />
            🌐 Global client base
            <br />
            💰 Low commissions
            <br />
            📲 Easy withdrawals via bKash, Nagad, Bank
            <br />
            🔒 Escrow security & transparency
            <br />
            🤝 Community & mentorship support
          </SectionBox>

          <SectionBox icon="🛠️" title="Our Services">
            • Web Development & Software Engineering
            <br />
            • Graphic Design & Branding
            <br />
            • Digital Marketing & SEO
            <br />
            • Content Writing & Copywriting
            <br />
            • Video Editing & Animation
            <br />
            • Virtual Assistance & Data Entry
            <br />
            and much more!
          </SectionBox>

          <SectionBox icon="🚀" title="Our Promise to Freelancers">
            ✔ Work internationally from home
            <br />
            ✔ Fair, timely payments
            <br />
            ✔ Transparent policies & no hidden charges
            <br />
            ✔ Clean platform UI
            <br />✔ Continuous learning opportunities
          </SectionBox>

          <SectionBox icon="🌏" title="Our Promise to Clients">
            ✔ Skilled, vetted freelancers from Bangladesh
            <br />
            ✔ Competitive pricing
            <br />
            ✔ Smooth communication & milestones
            <br />
            ✔ Secure payments & support
            <br />✔ Reliable long-term partnerships
          </SectionBox>
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-[#6fa1bd] mb-2">
            📣 Join Us and Be Part of the Change
          </h2>
          <p className="text-gray-700 max-w-xl mx-auto mb-4">
            Whether you're a Bangladeshi freelancer or a client looking for
            trusted professionals, Creative Hut is your destination.
          </p>
          <button className="bg-[#6fa1bd] text-white px-6 py-2 rounded-full shadow hover:bg-[#5a8aa3] transition cursor-pointer">
            Get Started
          </button>
        </motion.div>
      </div>
    </section>
  );
}
