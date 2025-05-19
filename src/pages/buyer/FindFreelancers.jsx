import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa";

const gigs = [
  {
    id: 1,
    freelancer: "Mehedi Hasan",
    gigImage: "https://source.unsplash.com/featured/?webdesign",
    role: "Responsive Landing Page",
    skills: ["React", "Tailwind", "HTML"],
    price: 120,
    description:
      "I'll design and build a mobile-friendly landing page with responsive layout and modern animations.",
  },
  {
    id: 2,
    freelancer: "Nusrat Jahan",
    gigImage: "https://source.unsplash.com/featured/?seo",
    role: "SEO Optimization",
    skills: ["SEO", "On-page", "Google Tools"],
    price: 80,
    description:
      "Improve your search visibility and increase organic traffic with my expert SEO services.",
  },
  {
    id: 3,
    freelancer: "Tanvir Islam",
    gigImage: "https://source.unsplash.com/featured/?writing",
    role: "Technical Blog Writing",
    skills: ["Content Writing", "Research", "Tech"],
    price: 50,
    description:
      "I write tech-focused, SEO-friendly articles and blogs that drive traffic and engagement.",
  },
];

const FindFreelancer = () => {
  const [query, setQuery] = useState("");
  const [selectedGig, setSelectedGig] = useState(null);

  const filteredGigs = gigs.filter(
    (gig) =>
      gig.skills.join(" ").toLowerCase().includes(query.toLowerCase()) ||
      gig.role.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center text-[#6fa1bd] mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Find Freelancers
      </motion.h1>

      {/* Search bar */}
      <div className=" max-w-xl mx-auto mb-10 relative">
        <input
          type="text"
          placeholder="Search by gig title or skill..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 pl-10 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
        />
        <FaSearch className="absolute left-3 top-4 text-gray-400" />
      </div>

      {/* Gig Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGigs.map((gig, i) => (
          <motion.div
            key={gig.id}
            custom={i}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
            onClick={() => setSelectedGig(gig)}
          >
            <img
              src={gig.gigImage}
              alt={gig.role}
              className="w-full h-48 object-cover"
            />

            <div className="p-6 flex-1 flex flex-col justify-between">
              <h3 className="text-lg font-semibold text-[#6fa1bd] mb-1">
                {gig.role}
              </h3>
              <p className="text-gray-800 mb-2">By {gig.freelancer}</p>

              <div className="flex flex-wrap gap-2 mb-3 text-sm">
                {gig.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-[#6fa1bd] px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-auto">
                <span className="text-lg font-bold text-gray-800">
                  ${gig.price}
                </span>
                <button className="text-sm text-[#6fa1bd] hover:font-semibold hover:underline cursor-pointer transition-all">
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedGig && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-lg rounded-xl p-6 relative shadow-lg"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close */}
              <button
                onClick={() => setSelectedGig(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 cursor-pointer"
              >
                <FaTimes size={18} />
              </button>

              <img
                src={selectedGig.gigImage}
                className="w-full h-48 object-cover rounded mb-4"
                alt={selectedGig.role}
              />

              <h2 className="text-xl font-bold text-[#6fa1bd] mb-1">
                {selectedGig.role}
              </h2>
              <p className="text-gray-800 mb-4">By {selectedGig.freelancer}</p>

              <p className="text-sm text-gray-700 mb-4">
                {selectedGig.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4 text-sm">
                {selectedGig.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-[#6fa1bd] px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="text-right text-xl font-bold text-gray-800 mb-4">
                ${selectedGig.price}
              </div>

              <button className="w-full bg-[#6fa1bd] hover:bg-[#5a8aa3] text-white py-2 rounded-md text-sm font-medium cursor-pointer">
                Contact Freelancer
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FindFreelancer;
