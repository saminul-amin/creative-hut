import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaHome, FaSignOutAlt, FaBars, FaArrowLeft } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import axios from "axios";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const { user, userLogOut } = useAuth();
  const navigate = useNavigate();
  const [pgUser, setPgUser] = useState(null);

  const userId = localStorage.getItem("pg_user_id");

  useEffect(() => {
    if (!userId) return;
    const fetchPgUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/users/${userId}`);
        setPgUser(res.data);
      } catch (err) {
        console.error("Failed to fetch PostgreSQL user", err);
      }
    };

    fetchPgUser();
  }, [userId]);

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await fetch(`https://creative-hut-server.vercel.app/users`);
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
  });

  if (isLoading) return <Loading />;

  const currentUser = users.filter((entry) => user?.email === entry.email)[0];
  const role = currentUser?.role;
  if (!currentUser || !role) {
    return <Loading />;
  }

  const roleName =
    role === "freelancer" ? "Freelancer" : role === "buyer" ? "Buyer" : "Admin";

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const navLinks = [
    role === "freelancer"
      ? [
          { name: "Dashboard", href: "/freelancer/dashboard" },
          { name: "My Gigs", href: "my-gigs" },
          { name: "Browse Jobs", href: "browse-jobs" },
          { name: "Wallet", href: "wallet" },
          { name: "My Skills", href: "my-skills" },
          { name: "My Profile", href: "profile" },
        ]
      : role === "buyer"
      ? [
          { name: "Dashboard", href: "/buyer/dashboard" },
          { name: "Post a Job", href: "post-job" },
          { name: "My Projects", href: "my-projects" },
          { name: "Find Freelancers", href: "find-freelancer" },
          { name: "Wallet", href: "wallet" },
          { name: "My Profile", href: "/buyer/profile" },
        ]
      : [
          { name: "Dashboard", href: "/admin/dashboard" },
          { name: "Users", href: "users" },
          { name: "Projects", href: "all-projects" },
          { name: "Payout Requests", href: "payout-requests" },
        ],
  ];

  const handleLogOut = () => {
    userLogOut().then(() => console.log("Logged Out"));
    navigate("/");
  };

  if (!pgUser) return <Loading />;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: isSidebarOpen ? 240 : 60 }}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-md flex flex-col items-center py-6 border-r"
      >
        <button
          onClick={toggleSidebar}
          className="mb-6 text-gray-600 hover:text-blue-600 cursor-pointer"
        >
          <FaBars size={20} />
        </button>

        <div className="flex flex-col gap-4 w-full px-4 pb-8">
          <Link
            to="/"
            className={`flex flex-row items-center gap-3 py-2 rounded-md transition 
                 text-gray-700 bg-gray-200 hover:bg-gray-300
               ${isSidebarOpen ? "px-3" : "px-0"}`}
          >
            <FaArrowLeft
              size={20}
              className={`${!isSidebarOpen && "mx-auto"}`}
            />
            {isSidebarOpen && <span>Go Back to Home</span>}
          </Link>
        </div>

        <nav className="flex flex-col gap-4 w-full px-4">
          {navLinks[0].map((link) => (
            <NavLink
              to={link.href}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 py-2 rounded-md transition ${
                  isActive
                    ? "bg-blue-100 text-[#6fa1bd] font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                } ${isSidebarOpen ? "px-3" : "px-0"}`
              }
            >
              <FaHome size={20} className={`${!isSidebarOpen && "mx-auto"}`} />
              {isSidebarOpen && <span>{link.name}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto px-4 w-full">
          <button
            onClick={handleLogOut}
            className={`flex items-center gap-3 w-full text-red-600 hover:bg-red-50 py-2 rounded-md cursor-pointer ${
              isSidebarOpen ? "px-3" : "px-0"
            }`}
          >
            <FaSignOutAlt />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Content area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-[#6fa1bd]">
            {roleName} Dashboard
          </h1>
          <Link
            to={
              role === "freelancer"
                ? "/freelancer/profile"
                : role === "buyer"
                ? "/buyer/profile"
                : "admin-profile"
            }
            className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-1 hover:bg-gray-300 cursor-pointer"
          >
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">
                {pgUser?.name || "..."}
              </span>
              <span className="text-sm text-gray-500">{roleName}</span>
            </div>
            <img
              src={
                pgUser?.profile_pic
                  ? `http://localhost:8000/gigs/image/${pgUser.profile_pic
                      .split("/")
                      .pop()}`
                  : "/pro-pic.webp"
              }
              className="w-8 h-8 rounded-full object-cover border"
              alt={pgUser?.name || "User"}
            />
          </Link>
        </header>

        {/* Dynamic content */}
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet key={pgUser.name} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
