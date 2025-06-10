import { motion } from "framer-motion";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

const freelancers = [
  {
    id: 1,
    name: "Jannatul Ferdous",
    role: "Full Stack Web Development",
    location: "Dhaka",
    rating: 4.9,
    gigImage: "https://source.unsplash.com/featured/?coding",
  },
  {
    id: 2,
    name: "Mehedi Hasan",
    role: "UI/UX Design",
    location: "Chittagong",
    rating: 4.8,
    gigImage: "https://source.unsplash.com/featured/?uxdesign",
  },
  {
    id: 3,
    name: "Sadia Afreen",
    role: "Digital Marketing",
    location: "Sylhet",
    rating: 4.7,
    gigImage: "https://source.unsplash.com/featured/?digitalmarketing",
  },
  {
    id: 4,
    name: "Tanvir Alam",
    role: "Creative Content Writing",
    location: "Rajshahi",
    rating: 4.6,
    gigImage: "https://source.unsplash.com/featured/?writing",
  },
  {
    id: 5,
    name: "Nusrat Jahan",
    role: "SEO & Analytics",
    location: "Khulna",
    rating: 4.9,
    gigImage: "https://source.unsplash.com/featured/?seo",
  },
  {
    id: 6,
    name: "Faisal Ahmed",
    role: "Video Editing",
    location: "Barisal",
    rating: 4.8,
    gigImage: "https://source.unsplash.com/featured/?videoediting",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const FeaturedFreelancers = () => {
  return (
    <section className="from-[#6fa1bd] to-blue-50 bg-gradient-to-tr">
      <div className="max-w-7xl mx-auto py-16 px-4 md:px-12 ">
        <div className="max-w-7xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#6fa1bd] mb-2">
            Featured Freelancers
          </h2>
          <p className="text-gray-600 text-md">
            Handpicked professionals with top-tier gigs to supercharge your
            project.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {freelancers.map((freelancer, i) => ( // for(auto& freelancer : freelancers)
            <motion.div
              key={freelancer.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              <img
                src={freelancer.gigImage}
                alt={freelancer.role}
                className="w-full h-48 object-cover"
              />

              <div className="p-6 flex-1 flex flex-col justify-between">
                <h3 className="text-lg font-semibold text-[#6fa1bd] mb-1">
                  {freelancer.role}
                </h3>
                <p className="text-gray-800 mb-2">By {freelancer.name}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" />
                    <span>{freelancer.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt />
                    <span>{freelancer.location}</span>
                  </div>
                </div>

                <motion.button
                  className="bg-[#6fa1bd] hover:bg-[#5a8aa3] text-white px-4 py-2 rounded-full text-sm transition-all self-start cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  View Gig
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedFreelancers;
