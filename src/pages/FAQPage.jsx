import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    title: "🔶 For Clients / Buyers",
    faqs: [
      {
        question:
          "What makes Creative Hut different from other freelancing platforms?",
        answer:
          "Creative Hut is focused exclusively on showcasing skilled freelancers from Bangladesh. We offer competitive pricing, high-quality work, and a deep talent pool—all while supporting local economic growth.",
      },
      {
        question:
          "Can I hire freelancers even if I’m located outside of Bangladesh?",
        answer:
          "Absolutely! Creative Hut connects global clients with Bangladeshi freelancers. Whether you’re in the USA, UK, or elsewhere, you can easily post jobs and hire.",
      },
      {
        question: "Is my payment secure?",
        answer:
          "Yes. We use an escrow-based system. Payments are only released to freelancers once you're satisfied with the delivery.",
      },
      {
        question: "How do I communicate with freelancers?",
        answer:
          "You can chat directly through our built-in messaging system. Share files, feedback, and even schedule meetings easily.",
      },
      {
        question: "What if I’m not happy with the work delivered?",
        answer:
          "You can request revisions or file a dispute. Our support team will step in to ensure a fair resolution.",
      },
    ],
  },
  {
    title: "🔷 For Freelancers",
    faqs: [
      {
        question: "Who can join as a freelancer on Creative Hut?",
        answer:
          "Any Bangladeshi freelancer skilled in development, design, writing, marketing, etc. can join our platform.",
      },
      {
        question: "How much commission does Creative Hut take?",
        answer:
          "We charge a lower commission compared to platforms like Fiverr or Upwork—so you earn more!",
      },
      {
        question: "Can I work with clients from other countries?",
        answer:
          "Yes! That’s what we’re built for—connecting local talent to international opportunities.",
      },
      {
        question: "How do I get paid?",
        answer:
          "You can withdraw earnings via bKash, Nagad, Rocket, or direct bank transfer.",
      },
      {
        question: "How do I increase my chances of getting hired?",
        answer:
          "Complete your profile, show off your work, reply fast, and maintain great ratings through quality service.",
      },
    ],
  },
];

function FaqAccordion({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="border border-blue-200 rounded-xl bg-white shadow-sm mb-3"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full p-4 text-left"
      >
        <span className="font-medium text-gray-800">{question}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-5 w-5 text-blue-500" />
        </motion.div>
      </button>
      {open && (
        <motion.div
          className="px-4 pb-4 text-gray-600"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {answer}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function FAQPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-[#6fa1bd] p-6">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-[#6fa1bd] mt-24 mb-10 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Frequently Asked Questions
        </motion.h1>

        {faqData.map((section, i) => (
          <div key={i} className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              {section.title}
            </h2>
            {section.faqs.map((faq, index) => (
              <FaqAccordion key={index} {...faq} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
