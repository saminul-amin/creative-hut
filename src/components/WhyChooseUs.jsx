import { motion } from "framer-motion";
import { FaLock, FaUsers, FaStar, FaBolt } from "react-icons/fa";

const benefits = [
  {
    id: 1,
    icon: <FaLock className="text-3xl text-white" />,
    title: "Secure & Transparent",
    description:
      "End-to-end encryption, safe transactions, and clear terms for both parties.",
    bg: "bg-blue-600",
  },
  {
    id: 2,
    icon: <FaUsers className="text-3xl text-white" />,
    title: "Trusted Community",
    description:
      "Verified users, authentic reviews, and supportive interactions at every step.",
    bg: "bg-purple-600",
  },
  {
    id: 3,
    icon: <FaStar className="text-3xl text-white" />,
    title: "Top-Tier Talents",
    description:
      "We showcase only quality-driven freelancers with real skills and experience.",
    bg: "bg-green-600",
  },
  {
    id: 4,
    icon: <FaBolt className="text-3xl text-white" />,
    title: "Fast & Efficient",
    description:
      "Quick hiring, faster delivery, and smooth collaboration from day one.",
    bg: "bg-pink-600",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const WhyChooseUs = () => {
  return (
    <section className="py-20 px-4 md:px-10 bg-gradient-to-t from-white to-blue-50">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-3">
          💡 Why Choose CreativeHut?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We’re more than just a freelancing platform. We’re your partner in
          progress—whether you're hiring or offering services.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {benefits.map((item, i) => (
          <motion.div
            key={item.id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-all duration-300"
          >
            <div
              className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${item.bg}`}
            >
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
