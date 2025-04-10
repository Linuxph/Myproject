import { motion } from "framer-motion";

export default function GlassyWater() {
  return (
    <div className="relative flex justify-center items-center h-screen bg-gray-900 overflow-hidden">
      {/* Background Waves */}
      <motion.div
        className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-blue-500 via-blue-400 to-transparent opacity-50"
        initial={{ y: 10 }}
        animate={{ y: -10 }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 2,
          ease: "easeInOut",
        }}
      />

      {/* Glassy Water Card */}
      <motion.div
        className="relative z-10 flex flex-col items-center p-10 bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-white text-3xl font-bold">Glassy Water Effect</h1>
        <p className="text-white/70 mt-2">React + Tailwind + Framer Motion</p>
      </motion.div>

      {/* Subtle Wave Animation */}
      <motion.div
        className="absolute bottom-0 w-full h-48 bg-blue-400/30 blur-xl"
        initial={{ y: 20 }}
        animate={{ y: -20 }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 3,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
