import React from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function FloatingAddButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 left-1/2 z-40 inline-flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/20 bg-gradient-to-r from-pitch to-trophy px-6 py-4 font-black text-midnight shadow-glow"
      animate={{ boxShadow: ["0 0 0 rgba(15,191,116,0)", "0 0 34px rgba(15,191,116,0.34)", "0 0 0 rgba(15,191,116,0)"] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.04, y: -3 }}
      whileTap={{ scale: 0.98 }}
    >
      <Plus size={20} />
      Add Student
    </motion.button>
  );
}
