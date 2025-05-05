import { motion } from "framer-motion";
import { FaUserPlus, FaSearch, FaHandshake, FaRocket } from "react-icons/fa";

const steps = [
  {
    id: 1,
    title: "Create Your Account",
    icon: <FaUserPlus className="text-3xl text-white" />,
    description:
      "Sign up in minutes and set up your profile with your skills or hiring needs.",
    color: "bg-blue-600",
  },
  {
    id: 2,
    title: "Explore Freelancers & Projects",
    icon: <FaSearch className="text-3xl text-white" />,
    description:
      "Browse through top talents or exciting tasks based on your goal.",
    color: "bg-purple-600",
  },
  {
    id: 3,
    title: "Connect & Collaborate",
    icon: <FaHandshake className="text-3xl text-white" />,
    description:
      "Communicate easily, set terms, and begin working together with confidence.",
    color: "bg-green-600",
  },
  {
    id: 4,
    title: "Get Paid or Receive Results",
    icon: <FaRocket className="text-3xl text-white" />,
    description:
      "Secure payment and verified results ensure satisfaction for both sides.",
    color: "bg-pink-600",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const HowItWorks = () => {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-20 px-4 md:px-10">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-3">
          How It Works
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Whether you're a freelancer looking for gigs or a client hiring
          talent—CreativeHut makes it simple, safe, and fast.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {steps.map((step, i) => (
          <motion.div
            key={step.id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="flex flex-col justify-between bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300"
          >
            <div
              className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${step.color}`}
            >
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
