// ✅ MyGigs.jsx — Card View + Pagination + Edit Modal + Route-based Gig Creation

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";

const sampleGigs = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: `Gig Title ${i + 1}`,
  category: [
    "Web Development",
    "Graphic Design",
    "Marketing",
    "Content Writing",
  ][i % 4],
  status: i % 3 === 0 ? "Active" : i % 3 === 1 ? "Pending" : "Rejected",
  price: 50 + i * 10,
  thumbnail: `https://source.unsplash.com/random/300x200?sig=${i + 1}`,
}));

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
