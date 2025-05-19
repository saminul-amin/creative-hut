import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const backdropVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariant = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const ProjectDetailsModal = ({ isOpen, onClose, project, onSave }) => {
  const modalRef = useRef(null);

  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState(project || {});

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  useEffect(() => {
    setFormData(project || {});
  }, [project]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    setEditable(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4"
        variants={backdropVariant}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div
          ref={modalRef}
          className="bg-white w-full max-w-xl p-6 rounded-xl shadow-xl"
          variants={modalVariant}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl font-bold text-[#6fa1bd] mb-4">
            Project Details
          </h2>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block font-medium text-gray-600 mb-1">
                Title
              </label>
              <input
                disabled={!editable}
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
                className={`w-full p-2 border rounded-lg ${
                  editable ? "bg-white" : "bg-gray-100"
                }`}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block font-medium text-gray-600 mb-1">
                Category
              </label>
              <input
                disabled={!editable}
                name="category"
                value={formData.category || ""}
                onChange={handleChange}
                className={`w-full p-2 border rounded-lg ${
                  editable ? "bg-white" : "bg-gray-100"
                }`}
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block font-medium text-gray-600 mb-1">
                Deadline
              </label>
              <input
                type="date"
                disabled={!editable}
                name="deadline"
                value={formData.deadline || ""}
                onChange={handleChange}
                className={`w-full p-2 border rounded-lg ${
                  editable ? "bg-white" : "bg-gray-100"
                }`}
              />
            </div>

            {/* Status */}
            <div>
              <label className="block font-medium text-gray-600 mb-1">
                Status
              </label>
              <select
                disabled={!editable}
                name="status"
                value={formData.status || ""}
                onChange={handleChange}
                className={`w-full p-2 border rounded-lg ${
                  editable ? "bg-white" : "bg-gray-100"
                }`}
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            {/* Freelancer */}
            <div>
              <label className="block font-medium text-gray-600 mb-1">
                Assigned Freelancer
              </label>
              <input
                disabled={!editable}
                name="freelancer"
                value={formData.freelancer || ""}
                onChange={handleChange}
                className={`w-full p-2 border rounded-lg ${
                  editable ? "bg-white" : "bg-gray-100"
                }`}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            {editable ? (
              <>
                <button
                  onClick={() => setEditable(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-[#6fa1bd] text-white rounded hover:bg-[#5a8aa3] text-sm cursor-pointer"
                >
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditable(true)}
                className="px-4 py-2 bg-[#6fa1bd] text-white rounded hover:bg-[#5a8aa3] text-sm cursor-pointer"
              >
                Edit
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectDetailsModal;
