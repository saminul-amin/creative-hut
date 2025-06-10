import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaClock,
  FaDollarSign,
  FaPlus,
  FaUsers,
  FaStar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// const topFreelancers = [
//     {
//       name: "Sadia Afreen",
//       skill: "SEO Specialist",
//       rating: 4.9,
//       reviews: 128,
//       gigs: [{ title: "Complete SEO Audit", price: 150, delivery: "3 days" }],
//       avatar: "https://randomuser.me/api/portraits/women/32.jpg",
//     },
//     {
//       name: "Mehedi Hasan",
//       skill: "Frontend Developer",
//       rating: 4.8,
//       reviews: 95,
//       gigs: [{ title: "React Landing Page", price: 250, delivery: "4 days" }],
//       avatar: "https://randomuser.me/api/portraits/men/45.jpg",
//     },
//     {
//       name: "Tasnim Ahmed",
//       skill: "Graphic Designer",
//       rating: 5.0,
//       reviews: 210,
//       gigs: [{ title: "Logo Design", price: 100, delivery: "2 days" }],
//       avatar: "https://randomuser.me/api/portraits/women/65.jpg",
//     },
//     {
//       name: "Arif Khan",
//       skill: "Content Writer",
//       rating: 4.7,
//       reviews: 87,
//       gigs: [{ title: "Blog Articles", price: 50, delivery: "2 days" }],
//       avatar: "https://randomuser.me/api/portraits/men/22.jpg",
//     },
//     {
//       name: "Farhana Akter",
//       skill: "Digital Marketer",
//       rating: 4.9,
//       reviews: 156,
//       gigs: [{ title: "Social Media Setup", price: 180, delivery: "4 days" }],
//       avatar: "https://randomuser.me/api/portraits/women/43.jpg",
//     },
//     {
//       name: "Rayhan Chowdhury",
//       skill: "Backend Developer",
//       rating: 4.8,
//       reviews: 112,
//       gigs: [
//         { title: "REST API with Node.js", price: 200, delivery: "5 days" },
//       ],
//       avatar: "https://randomuser.me/api/portraits/men/33.jpg",
//     },
//   ];

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

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const [topFreelancers, setTopFreelancers] = useState([]);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/top-freelancers/");
        const enriched = res.data.map((user) => ({
          name: user.name,
          skill: user.skill,
          rating: user.rating,
          reviews: user.reviews,
          gigs: user.gigs,
          avatar: user.profile_pic
            ? `http://localhost:8000/gigs/image/${user.profile_pic
                .split("/")
                .pop()}`
            : "/pro-pic.webp",
        }));
        setTopFreelancers(enriched);
      } catch (err) {
        console.error("Error fetching top freelancers:", err);
      }
    };

    fetchFreelancers();
  }, []);

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
        className="bg-white p-6 rounded-xl shadow mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-bold mb-6 text-[#6fa1bd]">
          Top Freelancers
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {topFreelancers.map((freelancer, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg shadow p-4 flex flex-col items-center text-center"
            >
              <img
                src={freelancer.avatar}
                alt={freelancer.name}
                className="w-20 h-20 rounded-full object-cover border mb-3"
              />
              <h4 className="font-semibold text-gray-800">{freelancer.name}</h4>
              <p className="text-sm text-gray-500">{freelancer.skill}</p>

              <div className="flex items-center justify-center gap-1 text-yellow-500 text-xs mt-1">
                <FaStar />
                <span>{freelancer.rating}</span>
                <span className="text-gray-400">({freelancer.reviews})</span>
              </div>

              <div className="mt-4 bg-white p-3 rounded text-sm w-full text-center">
                <h5 className="font-medium text-[#6fa1bd]">
                  {freelancer.gigs[0]?.title || "No Gig"}
                </h5>
                <p className="text-gray-700 mt-1">
                  ${freelancer.gigs[0]?.price || "--"} ·{" "}
                  {freelancer.gigs[0]?.delivery || "--"} days
                </p>
              </div>
            </div>
          ))}
        </div>
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
          onClick={() => navigate("/buyer/post-job")}
        >
          <FaPlus /> Post a New Job
        </motion.button>
        <button
          onClick={() => navigate("/buyer/find-freelancer")}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg flex justify-center items-center gap-2 transition-all cursor-pointer"
        >
          <FaUsers /> View Applicants
        </button>
      </motion.div>
    </section>
  );
};

export default BuyerDashboard;
