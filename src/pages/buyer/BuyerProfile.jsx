import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaEdit, FaGlobe } from "react-icons/fa";

const sampleBuyer = {
  name: "Sultan Mahmud",
  avatar: "https://i.pravatar.cc/150?img=16",
  company: "Pixel Creators Ltd.",
  bio: "We're a creative agency helping startups and enterprises with branding, web solutions, and digital strategies.",
  website: "https://pixelcreators.com",
};

const BuyerProfile = () => {
  const [profile, setProfile] = useState(sampleBuyer);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const modalRef = useRef();

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

  const handleEdit = (e) => {
    e.preventDefault();
    const form = e.target;
    setProfile({
      ...profile,
      name: form.name.value,
      company: form.company.value,
      bio: form.bio.value,
      website: form.website.value,
    });
    setEditModalOpen(false);
  };

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
          src={profile.avatar}
          alt={profile.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
          <p className="text-[#6fa1bd] font-medium">{profile.company}</p>
        </div>
      </div>

      {/* Bio */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">
          About
        </h3>
        <p className="text-sm text-gray-600">{profile.bio}</p>
      </div>

      {/* Website */}
      {profile.website && (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">Website</h3>
          <a
            href={profile.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6fa1bd] text-sm flex items-center gap-1 hover:underline"
          >
            <FaGlobe /> {profile.website}
          </a>
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
                Edit Buyer Profile
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
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Company
                  </label>
                  <input
                    name="company"
                    defaultValue={profile.company}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Website
                  </label>
                  <input
                    name="website"
                    defaultValue={profile.website}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
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
