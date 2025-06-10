import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Spinning Circle */}
        <motion.div
          className="w-16 h-16 border-4 border-[#6fa1bd] border-t-transparent rounded-full animate-spin"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />

        {/* Loading Text */}
        <motion.p
          className="text-xl font-semibold text-[#6fa1bd]"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Loading, please wait...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Loading;
