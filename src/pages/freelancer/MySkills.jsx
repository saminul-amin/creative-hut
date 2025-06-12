import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";

const MySkills = () => {
  const [skills, setSkills] = useState([]);
  const [formState, setFormState] = useState({ name: "", level: "Beginner" });
  const [editIndex, setEditIndex] = useState(null);
  const userId = localStorage.getItem("pg_user_id");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/users/${userId}`);
        const skillString = res.data.skills || "";
        const parsedSkills = skillString
          .split(",")
          .filter(Boolean)
          .map((s, i) => {
            const [name, level] = s.trim().split(":");
            return { id: i + 1, name: name || "", level: level || "Beginner" };
          });
        setSkills(parsedSkills);
      } catch (err) {
        console.error("Failed to load user skills", err);
      }
    };

    fetchSkills();
  }, [userId]);

  // Save updated skills to backend
  const saveSkillsToBackend = async (updatedSkills) => {
    const skillsString = updatedSkills
      .map((s) => `${s.name}:${s.level}`)
      .join(",");
    try {
      await axios.put(
        `http://localhost:8000/users/${userId}`,
        new URLSearchParams({
          name: "-", // dummy 
          bio: "-", // dummy 
          skills: skillsString,
        }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
    } catch (err) {
      console.error("Failed to update skills", err);
    }
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (!formState.name.trim()) return;

    let updatedSkills;
    if (editIndex !== null) {
      updatedSkills = [...skills];
      updatedSkills[editIndex] = { ...formState, id: skills[editIndex].id };
      setEditIndex(null);
    } else {
      updatedSkills = [...skills, { id: Date.now(), ...formState }];
    }

    setSkills(updatedSkills);
    setFormState({ name: "", level: "Beginner" });
    await saveSkillsToBackend(updatedSkills);
  };

  const handleEdit = (skill, index) => {
    setFormState({ name: skill.name, level: skill.level });
    setEditIndex(index);
  };

  const handleDelete = async (id) => {
    const updatedSkills = skills.filter((s) => s.id !== id);
    setSkills(updatedSkills);
    await saveSkillsToBackend(updatedSkills);
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto mt-12 p-6 bg-white rounded-xl shadow space-y-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold text-[#6fa1bd] flex items-center gap-2">
        My Skills
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
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
          required
        />
        <select
          value={formState.level}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, level: e.target.value }))
          }
          className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#6fa1bd] cursor-pointer"
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <button
          type="submit"
          className="sm:col-span-2 bg-[#6fa1bd] hover:bg-[#5a8aa3] text-white px-4 py-2 rounded cursor-pointer"
        >
          {editIndex !== null ? "Update Skill" : "Add Skill"}
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
              {skills.map((skill, index) => (
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
                      onClick={() => handleEdit(skill, index)}
                      className="text-yellow-600 hover:text-yellow-800 cursor-pointer"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
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
