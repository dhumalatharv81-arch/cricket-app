import React from "react";
import { motion } from "framer-motion";

export default function StatCard({ icon: Icon, label, value, detail, tone = "pitch" }) {
  const tones = {
    pitch: "from-pitch/24 to-pitch/5 text-pitchSoft",
    trophy: "from-trophy/24 to-trophy/5 text-trophy",
    ember: "from-ember/24 to-ember/5 text-ember",
    mist: "from-mist/20 to-mist/5 text-mist",
  };

  return (
    <motion.div
      className="glass-card rounded-lg p-5"
      whileHover={{ y: -5, borderColor: "rgba(15, 191, 116, 0.34)" }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-graphite">{label}</p>
          <p className="mt-3 text-3xl font-black text-white">{value}</p>
          <p className="mt-2 text-xs font-medium text-white/54">{detail}</p>
        </div>
        <span className={`rounded-lg bg-gradient-to-br p-3 ${tones[tone]}`}>
          <Icon size={22} />
        </span>
      </div>
    </motion.div>
  );
}
