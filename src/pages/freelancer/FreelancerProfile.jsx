import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaEnvelope, FaEdit } from "react-icons/fa";
import axios from "axios";
import Loading from "../../components/Loading";

const FreelancerProfile = () => {
  const userId = localStorage.getItem("pg_user_id");
  const [profile, setProfile] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const modalRef = useRef();

  // Fetch real user data from FastAPI
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/users/${userId}`);
        const skillsArray = res.data.skills?.split(",") || [];
        setProfile({
          id: res.data.id,
          name: res.data.name,
          profile_pic: res.data.profile_pic,
          tagline: res.data.tagline || "Freelancer",
          bio: res.data.bio || "",
          skills: skillsArray,
          rating: 4.8, // static for now
          reviews: 35, // static for now
        });
      } catch (error) {
        console.error("Error loading profile", error);
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  // Handle profile updates
  const handleEditSave = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      const updated = {
        name: form.name.value,
        tagline: form.tagline.value,
        bio: form.bio.value,
        skills: form.skills.value, // comma-separated string
      };

      const res = await axios.put(
        `http://localhost:8000/users/${userId}`,
        updated,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const newSkills = updated.skills.split(",").map((s) => s.trim());
      setProfile({ ...profile, ...updated, skills: newSkills });
      setEditModalOpen(false);
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  if (!profile)
    return (
      <div className="text-center mt-10">
        return <Loading />
      </div>
    );

  return (
    <motion.div
      className="max-w-3xl mx-auto bg-white shadow p-8 rounded-xl mt-10 space-y-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center gap-6">
        <img
          src={
            profile.profile_pic
              ? `http://localhost:8000/gigs/image/${profile.profile_pic
                  .split("/")
                  .pop()}`
              : "/pro-pic.webp"
          }
          alt={profile.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 cursor-pointer"
          onClick={() => document.getElementById("uploadInput").click()}
        />
        <input
          type="file"
          id="uploadInput"
          className="hidden"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("image", file);

            try {
              const res = await axios.post(
                `http://localhost:8000/users/${userId}/upload-pic`,
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
              setProfile((prev) => ({
                ...prev,
                profile_pic: res.data.profile_pic,
              }));
            } catch (err) {
              console.error("Failed to upload profile pic", err);
            }
          }}
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
          <p className="text-[#6fa1bd] font-medium">{profile.tagline}</p>
          <div className="flex items-center gap-2 mt-1 text-sm text-yellow-600">
            <FaStar />
            <span>
              {profile.rating} ({profile.reviews} reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">About</h3>
        <p className="text-gray-600 text-sm">
          {profile.bio || "No bio provided"}
        </p>
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">Skills</h3>
        <div className="flex flex-wrap gap-2 text-sm">
          {profile.skills.map((skill, i) => (
            <span
              key={i}
              className="bg-gray-100 text-[#5a8aa3] px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm flex items-center justify-center gap-2 cursor-pointer">
          <FaEnvelope /> Message
        </button>
        <button
          className="flex-1 bg-[#6fa1bd] hover:bg-[#5a8aa3] text-white px-4 py-2 rounded-md text-sm flex items-center justify-center gap-2 cursor-pointer"
          onClick={() => setEditModalOpen(true)}
        >
          <FaEdit /> Edit Profile
        </button>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg relative"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
            >
              <h3 className="text-lg font-bold text-[#6fa1bd] mb-4">
                Edit Profile
              </h3>
              <form onSubmit={handleEditSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Name
                  </label>
                  <input
                    name="name"
                    defaultValue={profile.name}
                    required
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Tagline
                  </label>
                  <input
                    name="tagline"
                    defaultValue={profile.tagline}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    rows="4"
                    defaultValue={profile.bio}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Skills (comma separated)
                  </label>
                  <input
                    name="skills"
                    defaultValue={profile.skills.join(", ")}
                    placeholder="e.g., React, Tailwind, Node"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded cursor-pointer"
                    onClick={() => setEditModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-[#6fa1bd] hover:bg-[#5a8aa3] text-white rounded cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FreelancerProfile;
