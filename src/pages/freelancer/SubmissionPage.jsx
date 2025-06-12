import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const SubmissionPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Submitted Proposal:", data);
    reset();
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-12 space-y-6"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-2xl font-bold text-[#6fa1bd] text-center mb-4">
        Submit Your Proposal
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Cover Letter */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Cover Letter <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("coverLetter", {
              required: "Cover letter is required",
              minLength: {
                value: 20,
                message: "Must be at least 20 characters",
              },
            })}
            rows="5"
            placeholder="Why are you the best fit for this job?"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
          ></textarea>
          {errors.coverLetter && (
            <p className="text-red-500 text-sm mt-1">
              {errors.coverLetter.message}
            </p>
          )}
        </div>

        {/* Estimated Delivery Time */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Estimated Delivery Time (in days){" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            {...register("deliveryTime", {
              required: "Delivery time is required",
              min: { value: 1, message: "Minimum 1 day" },
            })}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
            placeholder="e.g., 7"
          />
          {errors.deliveryTime && (
            <p className="text-red-500 text-sm mt-1">
              {errors.deliveryTime.message}
            </p>
          )}
        </div>

        {/* Bid Amount */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Bid Amount ($) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            {...register("bidAmount", {
              required: "Bid amount is required",
              min: { value: 1, message: "Minimum bid is $1" },
            })}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
            placeholder="e.g., 150"
          />
          {errors.bidAmount && (
            <p className="text-red-500 text-sm mt-1">
              {errors.bidAmount.message}
            </p>
          )}
        </div>

        {/* Attachment */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Attach File (Optional)
          </label>
          <input
            type="file"
            {...register("attachment")}
            className="w-full p-3 border rounded bg-white text-sm file:mr-3 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#6fa1bd] file:text-white hover:file:bg-[#5a8aa3]"
          />
        </div>

        {/* Remarks */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Remarks (Optional)
          </label>
          <textarea
            {...register("remarks")}
            rows="3"
            placeholder="Any final notes for the client..."
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#6fa1bd]"
          ></textarea>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="w-full bg-[#6fa1bd] hover:bg-[#5a8aa3] text-white font-semibold py-3 rounded-lg transition-all cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Submit Proposal
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SubmissionPage;
