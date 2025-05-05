import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
  {
    id: 1,
    value: 1200,
    label: "Freelancers Registered",
  },
  {
    id: 2,
    value: 320,
    label: "Projects Completed",
  },
  {
    id: 3,
    value: 150,
    label: "Active Employers",
  },
  {
    id: 4,
    value: 99,
    suffix: "%",
    label: "Client Satisfaction",
  },
];

const fadeUp = {
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

const StatsCounter = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section className="bg-gradient-to-br from-white to-blue-50 py-20 px-4 md:px-10" ref={ref}>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Our Growing Impact
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          CreativeHut is proud to support a growing community of professionals,
          clients, and dreamers.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center"
            >
              <div className="text-4xl font-extrabold text-[#5a8aa3] mb-2">
                {inView && (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2.5}
                    suffix={stat.suffix || ""}
                  />
                )}
              </div>
              <p className="text-gray-700 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
