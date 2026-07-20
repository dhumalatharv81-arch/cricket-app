import { BadgeIndianRupee, Edit3, GraduationCap, LogOut, MapPin, Medal, Phone, UsersRound } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";
import GlassCard from "../components/GlassCard";
import { formatCurrency } from "../utils/calculations";

export default function CoachProfile({ coach, stats, onEdit, onLogout }) {
  return (
    <AnimatedPage className="mx-auto max-w-7xl px-4 pb-28 pt-8 sm:px-6 lg:px-8">
      <section className="grid overflow-hidden rounded-lg border border-white/10 bg-ink shadow-premium lg:grid-cols-[380px_1fr]">
        <div className="relative min-h-[420px]">
          <img src={coach.photo} alt={coach.coachName} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/92 via-midnight/12 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="text-sm font-bold text-pitchSoft">Head Coach</p>
            <h1 className="mt-2 text-3xl font-black text-white">{coach.coachName}</h1>
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <p className="inline-flex rounded-full border border-pitch/30 bg-pitch/10 px-4 py-2 text-sm font-black text-pitchSoft">
            Coach Profile
          </p>
          <h2 className="mt-5 text-4xl font-black text-white md:text-5xl">{coach.academyName}</h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-graphite">{coach.specialization}</p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ProfileMetric icon={UsersRound} label="Total students" value={stats.totalStudents} />
            <ProfileMetric icon={GraduationCap} label="Active batches" value={stats.activeBatches} />
            <ProfileMetric icon={BadgeIndianRupee} label="Monthly revenue" value={formatCurrency(stats.monthlyRevenue)} />
            <ProfileMetric icon={Medal} label="Experience" value={coach.experience} />
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <ContactLine icon={Phone} label="Contact number" value={coach.contact} />
            <ContactLine icon={MapPin} label="Academy address" value={coach.address} />
            <ContactLine icon={Medal} label="Email" value={coach.email} />
            <ContactLine icon={GraduationCap} label="Specialization" value={coach.specialization} />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <motion.button
              onClick={onEdit}
              className="premium-button bg-gradient-to-r from-pitch to-trophy text-midnight shadow-glow"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Edit3 size={17} />
              Edit Coach Profile
            </motion.button>
            <motion.button
              onClick={onLogout}
              className="premium-button border-white/10 bg-white/[0.055] text-white hover:border-ember/45"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut size={17} />
              Logout
            </motion.button>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-5">
          <h2 className="text-xl font-black text-white">Academy Focus</h2>
          <p className="mt-3 text-sm leading-6 text-graphite">
            Technical batting sessions, tactical match preparation, video-backed progress reviews, and age-group development plans.
          </p>
        </GlassCard>
        <GlassCard className="p-5" delay={0.05}>
          <h2 className="text-xl font-black text-white">Active Batches</h2>
          <p className="mt-3 text-sm leading-6 text-graphite">
            Morning Elite, Evening Pace, Junior Foundation, Weekend Match Lab, and one-to-one coaching slots.
          </p>
        </GlassCard>
        <GlassCard className="p-5" delay={0.1}>
          <h2 className="text-xl font-black text-white">Coach Standards</h2>
          <p className="mt-3 text-sm leading-6 text-graphite">
            Attendance discipline, transparent payment records, player-specific goals, and monthly performance reports.
          </p>
        </GlassCard>
      </section>
    </AnimatedPage>
  );
}

function ProfileMetric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.055] p-4">
      <Icon size={19} className="text-pitchSoft" />
      <p className="mt-4 text-sm font-bold text-graphite">{label}</p>
      <p className="mt-2 text-xl font-black text-white">{value}</p>
    </div>
  );
}

function ContactLine({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-pitch/12 text-pitchSoft">
        <Icon size={18} />
      </span>
      <span>
        <span className="block text-xs font-bold uppercase text-graphite">{label}</span>
        <span className="mt-1 block text-sm font-bold text-white">{value}</span>
      </span>
    </div>
  );
}
