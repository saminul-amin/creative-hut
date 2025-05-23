import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const MySkills = () => {
  const [skills, setSkills] = useState([
    { id: 1, name: "React", level: "Advanced" },
    { id: 2, name: "Tailwind CSS", level: "Intermediate" },
  ]);

  const [formState, setFormState] = useState({ name: "", level: "Beginner" });
  const [editId, setEditId] = useState(null);

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    if (!formState.name.trim()) return;

    if (editId) {
      setSkills((prev) =>
        prev.map((s) => (s.id === editId ? { ...s, ...formState } : s))
      );
      setEditId(null);
    } else {
      setSkills((prev) => [...prev, { id: Date.now(), ...formState }]);
    }

    setFormState({ name: "", level: "Beginner" });
  };

  const handleEdit = (skill) => {
    setFormState({ name: skill.name, level: skill.level });
    setEditId(skill.id);
  };

  const handleDelete = (id) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto mt-12 p-6 bg-white rounded-xl shadow space-y-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
        🛠 My Skills
      </h2>

      {/* Add/Edit Skill Form */}
      <form
        onSubmit={handleAddOrUpdate}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="Skill name (e.g. Next.js)"
          value={formState.name}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, name: e.target.value }))
          }
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <select
          value={formState.level}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, level: e.target.value }))
          }
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <button
          type="submit"
          className="sm:col-span-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {editId ? "Update Skill" : "Add Skill"}
        </button>
      </form>

      {/* Skills List */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Current Skills
        </h3>
        {skills.length === 0 ? (
          <p className="text-gray-500 text-sm">No skills added yet.</p>
        ) : (
          <ul className="space-y-3">
            <AnimatePresence>
              {skills.map((skill) => (
                <motion.li
                  key={skill.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{skill.name}</p>
                    <p className="text-sm text-gray-500">{skill.level}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(skill)}
                      className="text-yellow-600 hover:text-yellow-800"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </motion.div>
  );
};

export default MySkills;
