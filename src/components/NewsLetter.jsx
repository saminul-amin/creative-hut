import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const NewsLetter = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Newsletter signup:", data);
    reset();
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-white to-blue-50 py-16 px-6 md:px-20 text-center"
    >
      <div className="max-w-2xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Join Our Newsletter
        </motion.h2>
        <motion.p
          className="text-gray-600 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Get freelancing tips, platform updates, and special offers straight to
          your inbox.
        </motion.p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row items-center gap-4 justify-center"
        >
          <input
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            type="email"
            placeholder="Enter your email"
            className="px-5 py-3 w-full md:w-2/3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5a8aa3]"
          />
          <motion.button
            type="submit"
            className="bg-[#6fa1bd] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#5a8aa3] transition-all cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Subscribe
          </motion.button>
        </form>
        {errors.email && (
          <p className="text-red-500 mt-2">
            Please enter a valid email address.
          </p>
        )}
      </div>
    </motion.section>
  );
};

export default NewsLetter;
