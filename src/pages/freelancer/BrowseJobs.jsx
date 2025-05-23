import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaClock, FaBriefcase, FaMoneyBillWave, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const jobs = [
  {
    id: 1,
    title: "Build a Product Landing Page",
    category: "Web Development",
    budget: "$120",
    thumbnail: "https://source.unsplash.com/featured/?landingpage",
    posted: "2 hours ago",
    description:
      "Need a clean, responsive landing page for a tech product. Should be built with React + Tailwind CSS.",
    buyer: {
      name: "Imran Digital",
      avatar: "https://i.pravatar.cc/100?img=11",
      company: "Imran Digital Ltd.",
      about:
        "We are a digital agency working with innovative startups and entrepreneurs globally.",
    },
  },
  {
    id: 2,
    title: "Animated Explainer Video",
    category: "Video & Animation",
    budget: "$300",
    thumbnail: "https://source.unsplash.com/featured/?video",
    posted: "5 hours ago",
    description:
      "Looking for a 60-90 sec explainer video for our SaaS product. Must include voiceover and background music.",
    buyer: {
      name: "Sadia Media",
      avatar: "https://i.pravatar.cc/100?img=12",
      company: "Sadia Media Agency",
      about: "We help brands tell their stories visually.",
    },
  },
];

const BrowseJobs = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        selectedJob &&
        modalRef.current &&
        !modalRef.current.contains(e.target)
      ) {
        setSelectedJob(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [selectedJob]);

  return (
    <section className="max-w-6xl mx-auto py-12 px-4 space-y-10">
      <motion.h1
        className="text-3xl font-bold text-center text-[#6fa1bd]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Browse Jobs
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {jobs.map((job, i) => (
          <motion.div
            key={job.id}
            className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer flex flex-col"
            whileHover={{ scale: 1.01 }}
          >
            <img
              src={job.thumbnail}
              alt={job.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#6fa1bd]">{job.title}</h2>
                <p className="text-sm text-gray-500">{job.category}</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                <span className="flex items-center gap-1">
               <FaMoneyBillWave /> {job.budget}
                </span>
                <span className="flex items-center gap-1">
                  <FaClock /> {job.posted}
                </span>
              </div>
              <button
                onClick={() => setSelectedJob(job)}
                className="mt-4 text-sm bg-[#6fa1bd] text-white px-4 py-2 rounded hover:bg-[#5a8aa3] cursor-pointer"
              >
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              className="bg-white w-full max-w-2xl rounded-xl p-6 relative shadow-lg"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close */}
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                onClick={() => setSelectedJob(null)}
              >
                <FaTimes />
              </button>

              {/* Job Details */}
              <h2 className="text-xl font-bold text-[#6fa1bd] mb-2">
                {selectedJob.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                {selectedJob.category} · {selectedJob.budt} ·{" "}
                {selectedJob.posted}
              </p>
              <p className="text-gray-700 text-sm mb-4">
                {selectedJob.description}
              </p>

              {/* Buyer Info */}
              <div className="bg-gray-50 p-4 rounded-lg flex gap-4 items-center mb-4">
                <img
                  src={selectedJob.buyer.avatar}
                  alt={selectedJob.buyer.name}
                  className="w-14 h-14 rounded-full object-cover border"
                />
                <div>
                  <h4 className="text-md font-semibold text-gray-800">
                    {selectedJob.buyer.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {selectedJob.buyer.company}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedJob.buyer.about}
                  </p>
                </div>
              </div>

              <Link to="/freelancer/proposal-submission">
                <button className="w-full bg-[#6fa1bd] hover:bg-[#5a8aa3] text-white py-3 rounded-md text-sm font-medium cursor-pointer">
                  Apply to this Job
                </button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BrowseJobs;
