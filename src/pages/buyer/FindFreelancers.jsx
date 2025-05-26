import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTimes } from "react-icons/fa";

const gigs = [
  {
    id: 1,
    freelancer: "Sarah Johnson",
    gigImage: "https://i.ibb.co/PG72ttyP/web-1.jpg",
    role: "Landing Page Development",
    skills: ["WordPress", "PHP", "Responsive Design"],
    price: 80,
    description:
      "Professional web developer with 5+ years of experience creating high-converting landing pages. Specializes in React and modern CSS frameworks.",
  },
  {
    id: 2,
    freelancer: "Michael Chen",
    gigImage: "https://i.ibb.co/Jww8hLH5/content-1.webp",
    role: "Technical Content Writer",
    skills: ["SEO", "Google Analytics", "Yoast", "Keyword Research"],
    price: 120,
    description:
      "SEO expert who can analyze your website and provide actionable recommendations to improve search rankings and organic traffic.",
  },
  {
    id: 3,
    freelancer: "Emily Rodriguez",
    gigImage: "https://i.ibb.co/YFY8xhgY/content-2.jpg",
    role: "SEO Articles",
    skills: ["Writing", "Technical", "Marketing", "Content Strategy"],
    price: 65,
    description:
      "Experienced content writer specializing in tech and marketing blogs. Delivers engaging, well-researched articles on time.",
  },
  {
    id: 4,
    freelancer: "David Wilson",
    gigImage: "https://i.ibb.co/sJ9qpX78/web-5.webp",
    role: "Web Development",
    skills: ["React", "Tailwind", "JS", "Node.js + Express.js"],
    price: 90,
    description:
      "Creative graphic designer with a focus on logo creation and brand identity. Delivers unique designs that represent your business perfectly.",
  },
  {
    id: 5,
    freelancer: "Jessica Kim",
    gigImage: "https://i.ibb.co/0RCDWnqc/graphic-5.webp",
    role: "Graphics Design",
    skills: ["Design", "UI/UX"],
    price: 70,
    description:
      "Front-end developer specializing in creating beautiful, functional landing pages that convert visitors into customers.",
  },
  {
    id: 6,
    freelancer: "Robert Taylor",
    gigImage: "https://i.ibb.co/VWMPr7VC/content-3.webp",
    role: "SEO Audit & Optimization",
    skills: ["SEO", "Content Optimization", "Backlinking", "Technical SEO"],
    price: 150,
    description:
      "Full-service SEO consultant who can help your website rank higher and attract more qualified traffic.",
  },
  {
    id: 7,
    freelancer: "Olivia Martin",
    gigImage: "https://i.ibb.co/ycBV4dqC/graphic-4.webp",
    role: "Poster Design",
    skills: ["Creative Writing", "Editing", "Proofreading", "Blogging"],
    price: 55,
    description:
      "Versatile writer who can create compelling blog posts on various topics, from lifestyle to business.",
  },
  {
    id: 8,
    freelancer: "Daniel Park",
    gigImage: "https://i.ibb.co/2Yfs6Xf7/web-4.webp",
    role: "WordPress Development",
    skills: ["WordPress", "PHP", "Custom Plugins", "Custom Themes"],
    price: 110,
    description:
      "Professional logo designer who creates memorable brand marks that stand out in competitive markets.",
  },
  {
    id: 9,
    freelancer: "Sophia Lee",
    gigImage: "https://i.ibb.co/8nMRT27v/web-3.webp",
    role: "Full Stack Development",
    skills: [
      "Web Design",
      "Conversion Optimization",
      "A/B Testing",
      "MERN Stack",
    ],
    price: 95,
    description:
      "Conversion-focused landing page specialist who combines design and psychology to create high-performing pages.",
  },
  {
    id: 10,
    freelancer: "James Wilson",
    gigImage: "https://i.ibb.co/SXCQRZKZ/graphic-3.jpg",
    role: "Design",
    skills: ["Creative Design", "Design"],
    price: 130,
    description:
      "Data-driven SEO consultant who uses analytics to identify growth opportunities for your website.",
  },
  {
    id: 11,
    freelancer: "Emma Davis",
    gigImage: "https://i.ibb.co/Zz138QXH/graphic-2.webp",
    role: "Designing",
    skills: [
      "Research",
      "Long-form Content",
      "Design Sense",
      "Critical Explanation",
    ],
    price: 75,
    description:
      "Skilled writer who produces in-depth, well-researched blog articles that establish thought leadership.",
  },
  {
    id: 12,
    freelancer: "Lucas Brown",
    gigImage: "https://i.ibb.co.com/JjCdQ8mG/content-4.webp",
    role: "Blog Writing",
    skills: ["Health & Wellness", "SEO Content", "Ghostwriting", "Editing"],
    price: 85,
    description:
      "Minimalist logo designer who believes in simplicity and effectiveness in brand representation.",
  },
  {
    id: 13,
    freelancer: "Alex Turner",
    gigImage: "https://i.ibb.co/96GcHgh/web-2.webp",
    role: "Landing Page Development",
    skills: ["Next.js", "TypeScript", "Framer Motion", "UI/UX"],
    price: 110,
    description:
      "Front-end developer specializing in interactive landing pages with smooth animations and high performance.",
  },
  {
    id: 14,
    freelancer: "Priya Patel",
    gigImage: "https://i.ibb.co/gLB0Cc4k/graphic-1.webp",
    role: "Poster Design",
    skills: ["Creative Writing", "Editing", "Proofreading", "Blogging"],
    price: 60,
    description:
      "Award-winning health writer crafting engaging, research-backed articles for medical and wellness brands.",
  },
  {
    id: 15,
    freelancer: "Carlos Mendez",
    gigImage: "https://i.ibb.co.com/PsnP1cmt/content-5.webp",
    role: "SEO Optimized Blog Posts",
    skills: ["Minimalist blogs", "Brand Identity", "Typography", "Cool Posts"],
    price: 95,
    description:
      "Logo designer with a minimalist approach, creating timeless brand marks that communicate clearly.",
  },
];

const FindFreelancer = () => {
  const [query, setQuery] = useState("");
  const [selectedGig, setSelectedGig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const gigsPerPage = 6;

  const filteredGigs = gigs.filter(
    (gig) =>
      gig.skills.join(" ").toLowerCase().includes(query.toLowerCase()) ||
      gig.role.toLowerCase().includes(query.toLowerCase())
  );

  const indexOfLast = currentPage * gigsPerPage;
  const indexOfFirst = indexOfLast - gigsPerPage;
  const currentGigs = filteredGigs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredGigs.length / gigsPerPage);

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
      <div className="max-w-xl mx-auto mb-10 relative">
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
        {currentGigs.map((gig, i) => (
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

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-10">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all cursor-pointer ${
              currentPage === i + 1
                ? "bg-[#6fa1bd] text-white border-[#6fa1bd]"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
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
