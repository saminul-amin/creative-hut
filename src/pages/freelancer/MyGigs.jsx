// ✅ MyGigs.jsx — Card View + Pagination + Edit Modal + Route-based Gig Creation

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";

const sampleGigs = [
  {
    id: 1,
    title: "Website Redesign",
    category: "Web Development",
    status: "Active",
    price: 500,
    thumbnail: "https://i.ibb.co/PG72ttyP/web-1.jpg",
  },
  {
    id: 2,
    title: "Logo Creation",
    category: "Graphic Design",
    status: "Pending",
    price: 150,
    thumbnail: "https://i.ibb.co/Jww8hLH5/content-1.webp",
  },
  {
    id: 3,
    title: "Social Media Campaign",
    category: "Marketing",
    status: "Rejected",
    price: 300,
    thumbnail: "https://i.ibb.co/YFY8xhgY/content-2.jpg",
  },
  {
    id: 4,
    title: "Blog Articles",
    category: "Content Writing",
    status: "Active",
    price: 100,
    thumbnail: "https://i.ibb.co/sJ9qpX78/web-5.webp",
  },
  {
    id: 5,
    title: "E-commerce Site",
    category: "Web Development",
    status: "Pending",
    price: 800,
    thumbnail: "https://i.ibb.co/0RCDWnqc/graphic-5.webp",
  },
  {
    id: 6,
    title: "Business Cards",
    category: "Graphic Design",
    status: "Active",
    price: 75,
    thumbnail: "https://i.ibb.co/VWMPr7VC/content-3.webp",
  },
  {
    id: 7,
    title: "SEO Optimization",
    category: "Marketing",
    status: "Active",
    price: 250,
    thumbnail: "https://i.ibb.co/ycBV4dqC/graphic-4.webp",
  },
  {
    id: 8,
    title: "Product Descriptions",
    category: "Content Writing",
    status: "Pending",
    price: 50,
    thumbnail: "https://i.ibb.co/2Yfs6Xf7/web-4.webp",
  },
  {
    id: 9,
    title: "Mobile App UI",
    category: "Web Development",
    status: "Rejected",
    price: 600,
    thumbnail: "https://i.ibb.co/8nMRT27v/web-3.webp",
  },
  {
    id: 10,
    title: "Brochure Design",
    category: "Graphic Design",
    status: "Active",
    price: 120,
    thumbnail: "https://i.ibb.co/SXCQRZKZ/graphic-3.jpg",
  },
  {
    id: 11,
    title: "Email Marketing",
    category: "Marketing",
    status: "Pending",
    price: 200,
    thumbnail: "https://i.ibb.co/Zz138QXH/graphic-2.webp",
  },
  {
    id: 12,
    title: "Technical Writing",
    category: "Content Writing",
    status: "Active",
    price: 150,
    thumbnail: "https://i.ibb.co/96GcHgh/web-2.webp",
  },
];

const MyGigs = () => {
  const [gigs, setGigs] = useState(sampleGigs);
  const [selectedGig, setSelectedGig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const gigsPerPage = 6;
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setGigs((prev) => prev.filter((gig) => gig.id !== id));
  };

  const handleEdit = (gig) => {
    setSelectedGig(gig);
  };

  const handleUpdateGig = (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      ...selectedGig,
      title: form.title.value,
      category: form.category.value,
      price: parseInt(form.price.value),
    };
    setGigs((prev) =>
      prev.map((gig) => (gig.id === updated.id ? updated : gig))
    );
    setSelectedGig(null);
  };

  // Pagination logic
  const indexOfLast = currentPage * gigsPerPage;
  const indexOfFirst = indexOfLast - gigsPerPage;
  const currentGigs = gigs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(gigs.length / gigsPerPage);

  return (
    <motion.div
      className="max-w-6xl mx-auto mt-10 space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center px-2">
        <h2 className="text-2xl font-bold text-[#6fa1bd]">My Gigs</h2>
        <button
          onClick={() => navigate("/freelancer/new-gig")}
          className="bg-[#6fa1bd] hover:bg-[#5a8aa3] text-white font-semibold px-4 py-2 rounded flex items-center gap-2 text-sm cursor-pointer transition-all"
        >
          <FaPlus /> Add New Gig
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
        {currentGigs.map((gig) => (
          <motion.div
            key={gig.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={
                gig.thumbnail ||
                "https://via.placeholder.com/300x200.png?text=Gig+Image"
              }
              alt={gig.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="font-bold text-[#6fa1bd]">{gig.title}</h3>
              <p className="text-sm text-gray-600">{gig.category}</p>
              <p className="text-sm font-medium">${gig.price}</p>
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                  gig.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : gig.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {gig.status}
              </span>
              <div className="flex justify-end gap-3 mt-3 text-sm">
                <button
                  onClick={() => handleEdit(gig)}
                  className="text-yellow-600 hover:text-yellow-800  flex gap-1.5 cursor-pointer bg-gray-100 hover:bg-gray-300 px-4 py-2 rounded-full items-center transition-all"
                  title="Edit"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(gig.id)}
                  className="text-red-600 hover:text-red-800 flex gap-1.5 cursor-pointer bg-gray-100 hover:bg-gray-300 px-4 py-2 rounded-full items-center transition-all"
                  title="Delete"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-full text-sm font-medium border cursor-pointer ${
              i + 1 === currentPage
                ? "bg-[#6fa1bd] text-white border-[#6fa1bd]"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {selectedGig && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white w-full max-w-md p-6 rounded-xl shadow relative"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-[#6fa1bd]">
                Edit Gig
              </h3>
              <form onSubmit={handleUpdateGig} className="space-y-4">
                <input
                  name="title"
                  defaultValue={selectedGig.title}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  name="category"
                  defaultValue={selectedGig.category}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  name="price"
                  type="number"
                  defaultValue={selectedGig.price}
                  className="w-full p-2 border rounded"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedGig(null)}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-[#6fa1bd] text-white hover:bg-[#5a8aa3]"
                  >
                    Update
                  </button>
                </div>
              </form>
              <button
                className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-xl"
                onClick={() => setSelectedGig(null)}
              >
                <FaTimes />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MyGigs;
