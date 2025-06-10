import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaEdit } from "react-icons/fa";
import axios from "axios";

const BuyerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef();

  const buyerId = localStorage.getItem("pg_user_id");
  if (!buyerId) return;

  // Fetch user data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/users/${buyerId}`);
        setProfile(res.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Outside click closes modal
  useEffect(() => {
    const handler = (e) => {
      if (
        editModalOpen &&
        modalRef.current &&
        !modalRef.current.contains(e.target)
      ) {
        setEditModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [editModalOpen]);

  const handleEdit = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      const updatedData = {
        name: form.name.value,
        bio: form.bio.value,
        skills: form.skills.value,
      };

      // Update in backend
      const response = await axios.put(
        `http://localhost:8000/users/${buyerId}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log(response);
      // Update local state
      setProfile((prev) => ({
        ...prev,
        ...updatedData,
      }));

      setEditModalOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto bg-white shadow p-8 rounded-xl mt-10 text-center">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-3xl mx-auto bg-white shadow p-8 rounded-xl mt-10 text-center">
        Error loading profile
      </div>
    );
  }

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
                `http://localhost:8000/users/${buyerId}/upload-pic`,
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
          <p className="text-gray-500">{profile.role}</p>
        </div>
      </div>

      {/* Bio */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">About</h3>
        <p className="text-sm text-gray-600">
          {profile.bio || "No bio provided yet!"}
        </p>
      </div>

      {/* Skills */}
      {profile.skills && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">Skills</h3>
          <p className="text-sm text-gray-600">{profile.skills}</p>
        </div>
      )}

      {/* Actions */}
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
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
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
              <form onSubmit={handleEdit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Name
                  </label>
                  <input
                    name="name"
                    defaultValue={profile.name}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    defaultValue={profile.bio}
                    rows="4"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Skills (comma separated)
                  </label>
                  <input
                    name="skills"
                    defaultValue={profile.skills}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
                    placeholder="e.g., Design, Marketing, Web Development"
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

export default BuyerProfile;
