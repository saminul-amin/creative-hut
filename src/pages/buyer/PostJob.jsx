import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";

const PostJob = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new URLSearchParams();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("budget_type", data.budgetType);
    formData.append("deadline", data.deadline);
    formData.append("skills", data.skills);

    const buyerId = localStorage.getItem("pg_user_id");
    if (!buyerId) {
      console.error("No buyer ID found in localStorage");
      return;
    }
    formData.append("buyer_id", buyerId);

    try {
      const res = await axios.post("http://localhost:8000/jobs/", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      console.log("Job posted:", res.data);
      reset();
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <motion.div
      className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto mt-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-center text-[#6fa1bd] mb-8">
        Post a New Job
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Job Title */}
        <div>
          <label className="font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            {...register("title", { required: "Job title is required" })}
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
            placeholder="e.g., Build a React Dashboard"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="font-medium text-gray-700">Category</label>
          <select
            {...register("category", { required: "Please select a category" })}
            defaultValue=""
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
          >
            <option value="" disabled>
              -- Select Category --
            </option>
            <option value="web">Web Development</option>
            <option value="design">Graphic Design</option>
            <option value="marketing">Digital Marketing</option>
            <option value="writing">Content Writing</option>
            <option value="video">Video Editing</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Budget Type */}
        <div>
          <label className="font-medium text-gray-700">Budget Type</label>
          <div className="flex gap-4 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="fixed"
                {...register("budgetType", { required: true })}
              />
              <span>Fixed</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="hourly"
                {...register("budgetType", { required: true })}
              />
              <span>Hourly</span>
            </label>
          </div>
          {errors.budgetType && (
            <p className="text-red-500 text-sm">Please select a budget type</p>
          )}
        </div>

        {/* Deadline */}
        <div>
          <label className="font-medium text-gray-700">Deadline</label>
          <input
            type="date"
            {...register("deadline", { required: "Please select a deadline" })}
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
          />
          {errors.deadline && (
            <p className="text-red-500 text-sm">{errors.deadline.message}</p>
          )}
        </div>

        {/* Required Skills */}
        <div>
          <label className="font-medium text-gray-700">Required Skills</label>
          <input
            type="text"
            {...register("skills", { required: "Please enter skills" })}
            placeholder="e.g., React, Tailwind, Firebase"
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
          />
          {errors.skills && (
            <p className="text-red-500 text-sm">{errors.skills.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="font-medium text-gray-700">
            Project Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows={5}
            placeholder="Describe the job in detail..."
            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          className="w-full bg-[#6fa1bd] text-white py-3 rounded-lg font-semibold hover:bg-[#5a8aa3] transition-all cursor-pointer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Post Job
        </motion.button>
      </form>
    </motion.div>
  );
};

export default PostJob;
