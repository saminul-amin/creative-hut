import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NewGig = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("New Gig Submitted:", data);
    // TODO: POST to backend
    reset();
    setThumbnailPreview(null);
    navigate("/dashboard/my-gigs");
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow mt-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-[#6fa1bd] mb-6 text-center">
        Create New Gig
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Gig Title"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
            defaultValue=""
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Web Development">Web Development</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Content Writing">Content Writing</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        <div>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Gig Description"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
            rows={4}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            type="number"
            {...register("price", { required: true, min: 1 })}
            placeholder="Base Price"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
          />
          <input
            type="number"
            {...register("revisions", { required: true, min: 0 })}
            placeholder="Revisions"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
          />
          <input
            type="number"
            {...register("delivery", { required: true, min: 1 })}
            placeholder="Delivery (Days)"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Upload Thumbnail
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("thumbnail")}
            onChange={handleThumbnailChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
          />
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Preview"
              className="mt-3 w-48 h-32 object-cover rounded border"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#6fa1bd] hover:bg-[#5a8aa3] text-white font-semibold py-3 rounded transition"
        >
          Submit Gig
        </button>
      </form>
    </motion.div>
  );
};

export default NewGig;
