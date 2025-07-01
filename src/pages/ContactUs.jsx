import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:8000/contact", data);
      console.log("Server response:", res.data);
      reset();
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-[#d6e4ec] py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center text-[#4687ab] mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </motion.h2>

        <motion.p
          className="text-center text-gray-700 mb-10 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Have questions or feedback? We'd love to hear from you. Fill out the
          form and our team will get back to you shortly.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-2xl shadow-lg space-y-6 border border-blue-100"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              rows={5}
              {...register("message", { required: "Message is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Type your message here..."
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-[#6fa1bd] text-white py-2 rounded-full font-semibold hover:bg-[#5a8aa3] transition cursor-pointer"
          >
            Send Message
          </motion.button>

          {isSubmitSuccessful && (
            <motion.p
              className="text-green-600 text-center mt-4 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ✅ Message sent successfully!
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
