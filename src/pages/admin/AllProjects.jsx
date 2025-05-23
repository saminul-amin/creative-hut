import { useQuery } from "@tanstack/react-query";
import { FaEye, FaTrashAlt } from "react-icons/fa";

const projects = [
  {
    _id: "p1",
    title: "Portfolio Website Design",
    buyerName: "Nafis Hossain",
    freelancerName: "Sadia Afreen",
    budget: 200,
    deadline: "2025-06-15",
    status: "In Progress",
  },
  {
    _id: "p2",
    title: "E-commerce Backend API",
    buyerName: "Mahfuz Ahmed",
    freelancerName: "Tanvir Islam",
    budget: 500,
    deadline: "2025-06-10",
    status: "Completed",
  },
  {
    _id: "p3",
    title: "SEO Audit & Fixes",
    buyerName: "Zarina Digital",
    freelancerName: "Nusrat Jahan",
    budget: 120,
    deadline: "2025-06-12",
    status: "Pending",
  },
  {
    _id: "p4",
    title: "Product Animation Video",
    buyerName: "Pixel Creators",
    freelancerName: "Mehedi Hasan",
    budget: 350,
    deadline: "2025-06-20",
    status: "Disputed",
  },
  {
    _id: "p5",
    title: "Blog Writing for Tech Startup",
    buyerName: "CodeHive",
    freelancerName: "Faria Tamanna",
    budget: 100,
    deadline: "2025-06-08",
    status: "In Progress",
  },
];


const fetchProjects = async () => {
  const res = await fetch("https://creative-hut-server.vercel.app/projects");
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
};

const statusClasses = {
  "In Progress": "bg-yellow-100 text-yellow-700",
  Completed: "bg-green-100 text-green-700",
  Disputed: "bg-red-100 text-red-700",
  Pending: "bg-gray-100 text-gray-600",
};

const AllProjects = () => {
//   const {
//     data: projects = [],
//     isLoading,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["projects"],
//     queryFn: fetchProjects,
//   });

    // const projects = dummy

  const handleStatusChange = (id, newStatus) => {
    console.log(`Change project ${id} status to ${newStatus}`);
    // TODO: Send PATCH request to update status
  };

  const handleDelete = (id) => {
    console.log(`Delete project ${id}`);
    // TODO: Send DELETE request to backend
  };

//   if (isLoading) return <p className="text-center mt-10">Loading projects...</p>;
//   if (error) return <p className="text-center text-red-500 mt-10">Error loading projects.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-[#6fa1bd] mb-6">All Projects</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Buyer</th>
              <th className="px-4 py-3">Freelancer</th>
              <th className="px-4 py-3">Budget</th>
              <th className="px-4 py-3">Deadline</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-gray-700">
            {projects.map((project) => (
              <tr key={project._id} className="hover:bg-blue-50 transition">
                <td className="px-4 py-3 font-medium">{project.title}</td>
                <td className="px-4 py-3">{project.buyerName || "N/A"}</td>
                <td className="px-4 py-3">{project.freelancerName || "Unassigned"}</td>
                <td className="px-4 py-3">${project.budget}</td>
                <td className="px-4 py-3">{project.deadline}</td>
                <td className="px-4 py-3">
                  <select
                    value={project.status}
                    onChange={(e) => handleStatusChange(project._id, e.target.value)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      statusClasses[project.status] || "bg-gray-200 text-gray-700"
                    }`}
                  >
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>Disputed</option>
                    <option>Pending</option>
                  </select>
                </td>
                <td className="px-4 py-3 gap-3 text-center">
                  
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="text-red-600 hover:text-red-800 text-sm cursor-pointer p-2 rounded-full bg-gray-200 hover:bg-gray-400 transition-colors"
                  >
                    <FaTrashAlt />  
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProjects;
