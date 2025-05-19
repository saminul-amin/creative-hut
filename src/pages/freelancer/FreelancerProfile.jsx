import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaEnvelope, FaEdit, FaDownload } from "react-icons/fa";

const sampleProfile = {
  role: "freelancer", // "buyer"
  name: "Sadia Afreen",
  avatar: "https://i.pravatar.cc/150?img=10",
  tagline: "Creative UI/UX Designer",
  bio: "I design beautiful and functional interfaces that users love. With 3+ years of experience, I blend creativity and usability seamlessly.",
  skills: ["Figma", "Tailwind", "Adobe XD"],
  resume: "/resume/sadia_afreen.pdf",
  rating: 4.8,
  reviews: 35,
};

const FreelancerProfile = () => {
  const [profile, setProfile] = useState(sampleProfile);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const modalRef = useRef();

  // Close modal on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (editModalOpen && modalRef.current && !modalRef.current.contains(e.target)) {
        setEditModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [editModalOpen]);

  const handleEditSave = (e) => {
    e.preventDefault();
    const form = e.target;
    setProfile({
      ...profile,
      name: form.name.value,
      tagline: form.tagline.value,
      bio: form.bio.value,
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
      {/* Avatar + Header */}
      <div className="flex items-center gap-6">
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-24 h-24 rounded-full border-4 border-blue-200 object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
          <p className="text-[#6fa1bd] font-medium">{profile.tagline}</p>

          {profile.role === "freelancer" && (
            <div className="flex items-center gap-2 mt-1 text-sm text-yellow-600">
              <FaStar />
              <span>{profile.rating} ({profile.reviews} reviews)</span>
            </div>
          )}
        </div>
      </div>

      {/* Bio */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">About</h3>
        <p className="text-gray-600 text-sm">{profile.bio}</p>
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-1">Skills</h3>
        <div className="flex flex-wrap gap-2 text-sm">
          {profile.skills.map((skill, i) => (
            <span key={i} className="bg-gray-100 text-[#5a8aa3] px-3 py-1 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Resume Download */}
      {profile.role === "freelancer" && (
        <div>
          <a
            href={profile.resume}
            download
            className="inline-flex items-center gap-2 bg-[#6fa1bd] hover:bg-[#5a8aa3] text-white px-4 py-2 rounded-md text-sm"
          >
            <FaDownload /> Download Resume
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
              <h3 className="text-lg font-bold text-[#6fa1bd] mb-4">Edit Profile</h3>
              <form onSubmit={handleEditSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                  <input
                    name="name"
                    defaultValue={profile.name}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Tagline</label>
                  <input
                    name="tagline"
                    defaultValue={profile.tagline}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Bio</label>
                  <textarea
                    name="bio"
                    rows="4"
                    defaultValue={profile.bio}
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

export default FreelancerProfile;
