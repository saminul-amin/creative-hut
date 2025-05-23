import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaClock,
  FaDollarSign,
  FaPlus,
  FaUsers,
} from "react-icons/fa";

const BuyerDashboard = () => {
  const stats = {
    spending: 12500,
    projects: 8,
    responseTime: "3h 20m",
  };

  const recentApplications = [
    { name: "Nadia Rahman", job: "Landing Page Design", time: "2h ago" },
    { name: "Sajid Hossain", job: "Logo & Brand Pack", time: "5h ago" },
    { name: "Rafiul Hasan", job: "Mobile App UI", time: "1 day ago" },
  ];

  const activeProjects = [
    { title: "Company Portfolio Website", status: "In Progress" },
    { title: "SEO Optimization Plan", status: "Submitted" },
  ];

  const topFreelancers = [
    { name: "Sadia Afreen", skill: "SEO Specialist" },
    { name: "Mehedi Hasan", skill: "Frontend Developer" },
  ];

  return (
    <section className="space-y-10">
      {/* Welcome Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <FaDollarSign className="text-2xl mx-auto text-[#6fa1bd]text-blue-600 mb-2" />
          <h4 className="text-sm text-gray-500">Total Spending</h4>
          <p className="text-xl font-bold text-gray-800">${stats.spending}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <FaBriefcase className="text-2xl mx-auto text-purple-600 mb-2" />
          <h4 className="text-sm text-gray-500">Projects Posted</h4>
          <p className="text-xl font-bold text-gray-800">{stats.projects}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <FaClock className="text-2xl mx-auto text-pink-600 mb-2" />
          <h4 className="text-sm text-gray-500">Avg Response Time</h4>
          <p className="text-xl font-bold text-gray-800">
            {stats.responseTime}
          </p>
        </div>
      </motion.div>

      {/* Recent Applications */}
      <motion.div
        className="bg-white p-6 rounded-xl shadow"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-bold mb-4 text-[#6fa1bd]">
          Recent Applications
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          {recentApplications.map((app, i) => (
            <li key={i} className="flex justify-between border-b pb-2">
              <span>
                {app.name} applied for <strong>{app.job}</strong>
              </span>
              <span className="text-gray-400">{app.time}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Active Projects */}
      <motion.div
        className="bg-white p-6 rounded-xl shadow"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-bold mb-4 text-[#6fa1bd]">
          Active Projects
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          {activeProjects.map((proj, i) => (
            <li key={i} className="flex justify-between border-b pb-2">
              <span>{proj.title}</span>
              <span className="text-[#6fa1bd] font-medium">{proj.status}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Shortlisted Freelancers */}
      <motion.div
        className="bg-white p-6 rounded-xl shadow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-lg font-bold mb-4 text-[#6fa1bd]">
          Top Freelancers
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          {topFreelancers.map((freelancer, i) => (
            <li key={i} className="flex justify-between border-b pb-2">
              <span>{freelancer.name}</span>
              <span className="text-gray-500">{freelancer.skill}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          type="submit"
          className="flex-1 font-semibold bg-[#6fa1bd] hover:bg-[#5a8aa3] text-white py-3 rounded-lg flex justify-center items-center gap-2 transition-all cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <FaPlus /> Post a New Job
        </motion.button>
        <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg flex justify-center items-center gap-2 transition-all cursor-pointer">
          <FaUsers /> View Applicants
        </button>
      </motion.div>
    </section>
  );
};

export default BuyerDashboard;
