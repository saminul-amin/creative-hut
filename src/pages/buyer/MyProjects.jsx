import { useState } from "react";
import { motion } from "framer-motion";
import ProjectDetailsModal from "./ProjectDetailsModal";

const sampleProjects = [
  {
    id: 1,
    title: "Landing Page for Startup",
    category: "Web Development",
    status: "In Progress",
    deadline: "2025-06-10",
    freelancer: "Mehedi Hasan",
  },
  {
    id: 2,
    title: "Logo Design for Agency",
    category: "Graphic Design",
    status: "Completed",
    deadline: "2025-04-28",
    freelancer: "Nusrat Jahan",
  },
  {
    id: 3,
    title: "SEO Setup for Blog",
    category: "Marketing",
    status: "Pending",
    deadline: "2025-06-20",
    freelancer: null,
  },
];

const statuses = ["All", "In Progress", "Completed", "Pending"];

const MyProjects = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const filteredProjects =
    selectedStatus === "All"
      ? sampleProjects
      : sampleProjects.filter((proj) => proj.status === selectedStatus);

  return (
    <motion.div
      className="p-6 bg-white rounded-xl shadow-md"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold text-[#6fa1bd] mb-6">My Projects</h2>

      {/* Status Filter */}
      <div className="mb-6 flex flex-wrap gap-3">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition cursor-pointer ${
              selectedStatus === status
                ? "bg-[#6fa1bd] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Projects List */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Deadline</th>
              <th className="px-4 py-3">Freelancer</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredProjects.length ? (
              filteredProjects.map((proj) => (
                <tr
                  onClick={() => {
                    setSelectedProject(proj);
                    setModalOpen(true);
                  }}
                  key={proj.id}
                  className="hover:bg-blue-50 transition cursor-pointer"
                >
                  <td className="px-4 py-3 font-medium">{proj.title}</td>
                  <td className="px-4 py-3">{proj.category}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        proj.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : proj.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {proj.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{proj.deadline}</td>
                  <td className="px-4 py-3">{proj.freelancer || "—"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-6">
                  No projects found for this status.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ProjectDetailsModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        project={selectedProject}
        onSave={(updatedProject) => {
          // handle update logic here (e.g., API call + UI refresh)
          console.log(updatedProject);
          setModalOpen(false);
        }}
      />
    </motion.div>
  );
};

export default MyProjects;
