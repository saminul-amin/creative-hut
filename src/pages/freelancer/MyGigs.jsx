import { useState } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa";

const sampleGigs = [
  {
    id: 1,
    title: "Build a responsive portfolio site",
    category: "Web Development",
    status: "Active",
    price: 150,
  },
  {
    id: 2,
    title: "Design a custom logo",
    category: "Graphic Design",
    status: "Pending",
    price: 80,
  },
];

const MyGigs = () => {
  const [gigs, setGigs] = useState(sampleGigs);
  const [showForm, setShowForm] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);

  const handleGigSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const newGig = {
      id: gigs.length + 1,
      title: form.title.value,
      category: form.category.value,
      status: "Pending",
      price: parseInt(form.price.value),
    };

    setGigs([...gigs, newGig]);
    form.reset();
    setThumbnail(null);
    setShowForm(false);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file));
    }
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto mt-10 space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#6fa1bd]">My Gigs</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#6fa1bd] hover:bg-[#5a8aa3] text-white font-semibold px-4 py-2 rounded flex items-center gap-2 text-sm cursor-pointer transition-all"
        >
          <FaPlus /> {showForm ? "Cancel" : "Add New Gig"}
        </button>
      </div>

      {/* Gig List */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4 text-[#6fa1bd]">Gig List</h3>
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase">
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Price ($)</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {gigs.map((gig) => (
              <tr key={gig.id} className="hover:bg-blue-50 transition">
                <td className="px-4 py-2">{gig.title}</td>
                <td className="px-4 py-2">{gig.category}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      gig.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {gig.status}
                  </span>
                </td>
                <td className="px-4 py-2">${gig.price}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button className="text-[#6fa1bd] hover:text-[#6fa1bd]">
                    <FaEye />
                  </button>
                  <button className="text-yellow-600 hover:text-yellow-700">
                    <FaEdit />
                  </button>
                  <button className="text-red-600 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Gig Form */}
      {showForm && (
        <motion.div
          className="bg-white p-6 rounded-xl shadow"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-[#6fa1bd] mb-4">
            Create New Gig
          </h3>
          <form onSubmit={handleGigSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                name="title"
                required
                className="w-full p-2 border rounded"
                placeholder="e.g., UI Design for SaaS"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                required
                className="w-full p-2 border rounded"
              >
                <option value="">-- Select --</option>
                <option value="Web Development">Web Development</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Content Writing">Content Writing</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows="4"
                required
                className="w-full p-2 border rounded"
              ></textarea>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Base Price ($)
                </label>
                <input
                  name="price"
                  type="number"
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Revisions
                </label>
                <input
                  name="revisions"
                  type="number"
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Time (days)
                </label>
                <input
                  name="delivery"
                  type="number"
                  required
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            {/* Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thumbnail Image
              </label>
              <input
                name="thumbnail"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
              />
              {thumbnail && (
                <img
                  src={thumbnail}
                  alt="Preview"
                  className="mt-3 w-40 h-28 object-cover rounded border"
                />
              )}
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="bg-[#6fa1bd] hover:bg-[#5a8aa3] text-white px-5 py-2 rounded transition-all cursor-pointer"
              >
                Submit Gig
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MyGigs;
