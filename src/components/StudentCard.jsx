import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, ShieldCheck } from "lucide-react";

export default function StudentCard({ student, onOpen }) {
  return (
    <motion.article
      onClick={onOpen}
      className="glass-card group cursor-pointer overflow-hidden rounded-lg"
      whileHover={{ y: -8, borderColor: "rgba(15, 191, 116, 0.38)" }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <div className="relative h-44 overflow-hidden">
        <img src={student.photo} alt={student.studentName} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/92 via-midnight/12 to-transparent" />
        <span
          className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-black ${
            student.paymentStatus === "Paid"
              ? "bg-pitch text-midnight"
              : "bg-trophy text-midnight"
          }`}
        >
          {student.paymentStatus}
        </span>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="truncate text-xl font-black text-white">{student.studentName}</h3>
          <p className="mt-1 text-sm text-white/70">{student.age} years · {student.playingRole}</p>
        </div>
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2 text-xs font-semibold text-mist">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/7 px-3 py-1">
            <Clock size={13} />
            {student.batchTiming}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/7 px-3 py-1">
            <ShieldCheck size={13} />
            {student.experienceLevel}
          </span>
        </div>
        <div className="mt-5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-graphite">Progress</span>
            <span className="font-black text-white">{student.progress}%</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-pitch to-trophy"
              style={{ width: `${student.progress}%` }}
            />
          </div>
        </div>
        <button className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-3 text-sm font-black text-white transition hover:border-pitch/50 hover:bg-pitch/10">
          View Profile
          <ArrowUpRight size={16} />
        </button>
      </div>
    </motion.article>
  );
}
