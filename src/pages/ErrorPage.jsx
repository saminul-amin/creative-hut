import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-100 to-[#6fa1bd] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md"
      >
        <motion.h1
          className="text-6xl font-extrabold text-[#4687ab] mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          404
        </motion.h1>
        <motion.h2
          className="text-2xl font-semibold text-gray-800 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Oops! Page Not Found
        </motion.h2>
        <motion.p
          className="text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          The page you're looking for doesn’t exist or has been moved.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="bg-[#6fa1bd] hover:bg-[#5a8aa3] text-white font-semibold px-6 py-2 rounded-full shadow transition cursor-pointer"
        >
          Go Back Home
        </motion.button>
      </motion.div>
    </section>
  );
}
