import { motion } from "framer-motion";
import {
  FaDollarSign,
  FaBriefcase,
  FaStar,
  FaPlus,
  FaRocket,
} from "react-icons/fa";

const stats = {
  earnings: 1580,
  jobs: 3,
  rating: 4.9,
};

const recentJobs = [
  { title: "E-commerce Website Setup", postedBy: "PixelMart", time: "2h ago" },
  { title: "YouTube Video Intro", postedBy: "Rafi Digital", time: "5h ago" },
  { title: "Logo Redesign", postedBy: "Zarin Brands", time: "1 day ago" },
];

const gigSummary = {
  active: 5,
  pending: 2,
  rejected: 1,
};

const FreelancerDashboard = () => {
  return (
    <section className="space-y-10">
      {/* Welcome Banner */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <FaDollarSign className="text-2xl mx-auto text-green-600 mb-2" />
          <h4 className="text-sm text-gray-500">Total Earnings</h4>
          <p className="text-xl font-bold text-gray-800">${stats.earnings}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <FaBriefcase className="text-2xl mx-auto text-blue-600 mb-2" />
          <h4 className="text-sm text-gray-500">Active Jobs</h4>
          <p className="text-xl font-bold text-gray-800">{stats.jobs}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <FaStar className="text-2xl mx-auto text-yellow-500 mb-2" />
          <h4 className="text-sm text-gray-500">Overall Rating</h4>
          <p className="text-xl font-bold text-gray-800">{stats.rating}</p>
        </div>
      </motion.div>

      {/* Recent Jobs Posted */}
      <motion.div
        className="bg-white p-6 rounded-xl shadow"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold mb-4 text-[#6fa1bd]">
          Recent Job Postings
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          {recentJobs.map((job, i) => (
            <li key={i} className="flex justify-between border-b pb-2">
              <span>
                {job.title} — <strong>{job.postedBy}</strong>
              </span>
              <span className="text-gray-400">{job.time}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Gig Summary */}
      <motion.div
        className="bg-white p-6 rounded-xl shadow"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold mb-4 text-[#6fa1bd]">
          Gigs Summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-blue-100 text-blue-700 p-4 rounded-lg">
            <h4 className="font-bold text-lg">{gigSummary.active}</h4>
            <p className="text-sm">Active</p>
          </div>
          <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg">
            <h4 className="font-bold text-lg">{gigSummary.pending}</h4>
            <p className="text-sm">Pending</p>
          </div>
          <div className="bg-red-100 text-red-600 p-4 rounded-lg">
            <h4 className="font-bold text-lg">{gigSummary.rejected}</h4>
            <p className="text-sm">Rejected</p>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button className="flex-1 font-semibold bg-[#6fa1bd] hover:bg-[#5a8aa3] text-white py-3 rounded-lg flex justify-center items-center gap-2 transition-all cursor-pointer">
          <FaPlus /> Create New Gig
        </button>
        <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg flex justify-center items-center gap-2 transition-all cursor-pointer">
          <FaRocket /> Apply to Job
        </button>
      </motion.div>
    </section>
  );
};

export default FreelancerDashboard;
