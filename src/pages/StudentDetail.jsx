import {
  ArrowLeft,
  BadgeIndianRupee,
  CalendarCheck,
  Edit3,
  GraduationCap,
  ShieldCheck,
  Target,
  Trophy,
  UserRound,
} from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";
import GlassCard from "../components/GlassCard";
import { formatCurrency } from "../utils/calculations";

export default function StudentDetail({ student, onBack, onEdit, onPayments }) {
  if (!student) {
    return (
      <AnimatedPage className="mx-auto max-w-7xl px-4 pb-28 pt-8 sm:px-6 lg:px-8">
        <GlassCard className="p-8">
          <h1 className="text-2xl font-black text-white">Student not found</h1>
          <button onClick={onBack} className="premium-button mt-5 bg-pitch text-midnight">
            <ArrowLeft size={17} />
            Back to Students
          </button>
        </GlassCard>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage className="mx-auto max-w-7xl px-4 pb-28 pt-8 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-lg border border-white/10 bg-ink shadow-premium">
        <div className="grid lg:grid-cols-[360px_1fr]">
          <div className="relative min-h-[360px]">
            <img src={student.photo} alt={student.studentName} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-transparent to-transparent" />
            <span className={`absolute left-5 top-5 rounded-full px-3 py-1 text-xs font-black ${student.paymentStatus === "Paid" ? "bg-pitch text-midnight" : "bg-trophy text-midnight"}`}>
              {student.paymentStatus}
            </span>
          </div>
          <div className="p-6 sm:p-8">
            <p className="inline-flex rounded-full border border-pitch/30 bg-pitch/10 px-4 py-2 text-sm font-black text-pitchSoft">
              Student Detail Page
            </p>
            <h1 className="mt-5 text-4xl font-black text-white md:text-5xl">{student.studentName}</h1>
            <p className="mt-3 max-w-2xl text-graphite">
              {student.age} years · {student.playingRole} · {student.experienceLevel} · {student.batchTiming}
            </p>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              <Metric label="Progress" value={`${student.progress}%`} />
              <Metric label="Attendance" value={`${student.attendance}%`} />
              <Metric label="Monthly Fee" value={formatCurrency(student.monthlyFee)} />
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <motion.button
                onClick={() => onEdit(student)}
                className="premium-button bg-gradient-to-r from-pitch to-trophy text-midnight shadow-glow"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Edit3 size={17} />
                Edit Profile
              </motion.button>
              <motion.button
                onClick={onBack}
                className="premium-button border-white/10 bg-white/[0.055] text-white hover:border-pitch/45"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <ArrowLeft size={17} />
                Back to Students
              </motion.button>
              <motion.button
                onClick={() => onPayments(student.id)}
                className="premium-button border-white/10 bg-white/[0.055] text-white hover:border-trophy/45"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <BadgeIndianRupee size={17} />
                View Payment History
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <InfoCard icon={UserRound} title="Parent Details" items={[
          ["Parent Name", student.parentName],
          ["Mobile", student.parentMobile],
          ["Email", student.email],
          ["Address", student.address],
        ]} />
        <InfoCard icon={GraduationCap} title="School Details" items={[
          ["School", student.schoolName],
          ["Standard", student.standard],
          ["Admission Date", student.admissionDate],
          ["Gender", student.gender],
        ]} />
        <InfoCard icon={Target} title="Playing Details" items={[
          ["Role", student.playingRole],
          ["Experience", student.experienceLevel],
          ["Batch", student.batchTiming],
          ["Fitness Score", `${student.fitnessScore}%`],
        ]} />
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <GlassCard className="p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-white">Payment History</h2>
              <p className="mt-1 text-sm text-graphite">Student-wise fee ledger</p>
            </div>
            <BadgeIndianRupee className="text-trophy" />
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[460px] text-left">
              <thead className="text-xs uppercase text-graphite">
                <tr>
                  <th className="py-3">Month</th>
                  <th className="py-3">Date</th>
                  <th className="py-3">Amount</th>
                  <th className="py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {student.paymentHistory.map((entry) => (
                  <tr key={`${entry.month}-${entry.date}`} className="text-sm text-mist">
                    <td className="py-4 font-bold text-white">{entry.month}</td>
                    <td className="py-4">{entry.date}</td>
                    <td className="py-4">{formatCurrency(entry.amount)}</td>
                    <td className="py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-black ${entry.status === "Paid" ? "bg-pitch text-midnight" : "bg-trophy text-midnight"}`}>
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <ProgressBlock icon={ShieldCheck} label="Progress Report" value={student.progress} detail="Skill execution, consistency, match decisions" />
            <ProgressBlock icon={CalendarCheck} label="Attendance Summary" value={student.attendance} detail="Session presence across the current cycle" />
            <ProgressBlock icon={Trophy} label="Performance Stats" value={student.fitnessScore} detail={`Strike rate ${student.strikeRate}${student.bowlingEconomy ? ` · Economy ${student.bowlingEconomy}` : ""}`} />
            <ProgressBlock icon={Target} label="Batch Readiness" value={Math.round((student.progress + student.attendance) / 2)} detail={student.batchTiming} />
          </div>
        </GlassCard>
      </section>
    </AnimatedPage>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.055] p-4">
      <p className="text-sm font-bold text-graphite">{label}</p>
      <p className="mt-2 text-2xl font-black text-white">{value}</p>
    </div>
  );
}

function InfoCard({ icon: Icon, title, items }) {
  return (
    <GlassCard className="p-5">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-lg bg-pitch/12 text-pitchSoft">
          <Icon size={20} />
        </span>
        <h2 className="text-xl font-black text-white">{title}</h2>
      </div>
      <div className="mt-5 space-y-4">
        {items.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 border-b border-white/10 pb-3 last:border-none last:pb-0">
            <span className="text-sm text-graphite">{label}</span>
            <span className="max-w-[62%] text-right text-sm font-bold text-white">{value || "Not added"}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

function ProgressBlock({ icon: Icon, label, value, detail }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-trophy/12 text-trophy">
          <Icon size={18} />
        </span>
        <span className="text-2xl font-black text-white">{value}%</span>
      </div>
      <p className="mt-4 font-black text-white">{label}</p>
      <p className="mt-2 text-sm leading-6 text-graphite">{detail}</p>
      <div className="mt-4 h-2 rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-pitch to-trophy" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
