import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import React from "react";
import {
  BadgeIndianRupee,
  CalendarDays,
  CreditCard,
  Dumbbell,
  Edit3,
  Plus,
  Sparkles,
  TrendingUp,
  Trophy,
  UsersRound,
} from "lucide-react";
import { motion } from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";
import GlassCard from "../components/GlassCard";
import StatCard from "../components/StatCard";
import { chartDataFor, formatCurrency, recentAdmissions, topPerformers } from "../utils/calculations";

export default function Home({ coach, students, stats, onNavigate, onAddStudent }) {
  const { growthData, revenueData } = chartDataFor(students);
  const recent = recentAdmissions(students);
  const performers = topPerformers(students);

  const quickActions = [
    { label: "Add Student", icon: Plus, action: onAddStudent },
    { label: "View Students", icon: UsersRound, action: () => onNavigate("students") },
    { label: "View Payments", icon: CreditCard, action: () => onNavigate("payments") },
    { label: "Edit Coach Profile", icon: Edit3, action: () => onNavigate("coach-profile") },
  ];

  return (
    <AnimatedPage className="mx-auto max-w-7xl px-4 pb-28 pt-8 sm:px-6 lg:px-8">
      <section className="relative overflow-hidden rounded-lg border border-white/10 bg-ink shadow-premium">
        <img
          src="https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=1600&q=80"
          alt="Cricket academy training field"
          className="absolute inset-0 h-full w-full object-cover opacity-48"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-midnight via-midnight/82 to-midnight/36" />
        <motion.div
          className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.25fr_0.75fr] lg:p-10"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p className="inline-flex rounded-full border border-pitch/30 bg-pitch/10 px-4 py-2 text-sm font-black text-pitchSoft">
              Welcome Coach
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-white md:text-6xl">
              {coach.coachName}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-mist/78">
              {coach.academyName} is training {stats.totalStudents} students across {stats.activeBatches} active batches with a focus on technique, discipline, and match readiness.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur">
              <p className="text-sm font-bold text-graphite">Academy Overview</p>
              <p className="mt-2 text-2xl font-black text-white">{coach.academyName}</p>
              <p className="mt-2 text-sm leading-6 text-mist/70">{coach.specialization}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur">
              <p className="text-sm font-bold text-graphite">Today's Practice</p>
              <div className="mt-3 space-y-3 text-sm text-mist">
                <PracticeItem label="Morning Elite" value="Powerplay batting" />
                <PracticeItem label="Evening Pace" value="Yorker accuracy" />
                <PracticeItem label="Junior Foundation" value="Catching circuit" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={UsersRound} label="Total Students" value={stats.totalStudents} detail="All enrolled players" tone="pitch" />
        <StatCard icon={Dumbbell} label="Active Students" value={stats.activeStudents} detail="Training this cycle" tone="mist" />
        <StatCard icon={BadgeIndianRupee} label="Monthly Revenue" value={formatCurrency(stats.monthlyRevenue)} detail="Paid monthly fees" tone="trophy" />
        <StatCard icon={CreditCard} label="Pending Payments" value={stats.pendingPayments} detail={formatCurrency(stats.pendingAmount)} tone="ember" />
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="p-5">
          <SectionTitle icon={TrendingUp} title="Student Growth Chart" subtitle="Admissions momentum" />
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="growthFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#0fbf74" stopOpacity={0.48} />
                    <stop offset="100%" stopColor="#0fbf74" stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="month" stroke="#93a4b8" tickLine={false} axisLine={false} />
                <YAxis stroke="#93a4b8" tickLine={false} axisLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="students" stroke="#0fbf74" strokeWidth={3} fill="url(#growthFill)" isAnimationActive />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-5" delay={0.06}>
          <SectionTitle icon={Trophy} title="Revenue Chart" subtitle="Fee collection trend" />
          <div className="mt-5 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="month" stroke="#93a4b8" tickLine={false} axisLine={false} />
                <YAxis stroke="#93a4b8" tickLine={false} axisLine={false} tickFormatter={(value) => `${Math.round(value / 1000)}k`} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="revenue" fill="#f6c453" radius={[8, 8, 0, 0]} isAnimationActive />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-5">
          <SectionTitle icon={CalendarDays} title="Recent Admissions" subtitle="Latest student entries" />
          <div className="mt-5 space-y-4">
            {recent.map((student) => (
              <MiniStudent key={student.id} student={student} />
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle icon={Sparkles} title="Top Performing Students" subtitle="Progress leaders" />
          <div className="mt-5 space-y-4">
            {performers.map((student) => (
              <MiniStudent key={student.id} student={student} showProgress />
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <SectionTitle icon={Plus} title="Quick Actions" subtitle="Move through academy work" />
          <div className="mt-5 grid gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.label}
                  onClick={action.action}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.055] px-4 py-4 text-left text-white transition hover:border-pitch/45 hover:bg-pitch/10"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="flex items-center gap-3 font-black">
                    <Icon size={18} className="text-pitchSoft" />
                    {action.label}
                  </span>
                  <span className="text-graphite">Open</span>
                </motion.button>
              );
            })}
          </div>
        </GlassCard>
      </section>
    </AnimatedPage>
  );
}

function PracticeItem({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="font-bold text-white">{label}</span>
      <span className="text-right text-graphite">{value}</span>
    </div>
  );
}

function SectionTitle({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-black text-white">{title}</h2>
        <p className="mt-1 text-sm text-graphite">{subtitle}</p>
      </div>
      <span className="grid h-11 w-11 place-items-center rounded-lg bg-pitch/12 text-pitchSoft">
        <Icon size={20} />
      </span>
    </div>
  );
}

function MiniStudent({ student, showProgress = false }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-3">
      <img src={student.photo} alt={student.studentName} className="h-12 w-12 rounded-lg object-cover" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-black text-white">{student.studentName}</p>
        <p className="truncate text-sm text-graphite">{showProgress ? `${student.progress}% progress` : student.batchTiming}</p>
      </div>
      <span className={`rounded-full px-3 py-1 text-xs font-black ${student.paymentStatus === "Paid" ? "bg-pitch text-midnight" : "bg-trophy text-midnight"}`}>
        {student.paymentStatus}
      </span>
    </div>
  );
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const value = payload[0].value;
  const name = payload[0].dataKey;
  return (
    <div className="rounded-lg border border-white/10 bg-midnight/95 p-3 shadow-premium">
      <p className="text-sm font-black text-white">{label}</p>
      <p className="mt-1 text-sm text-pitchSoft">
        {name === "revenue" ? formatCurrency(value) : `${value} students`}
      </p>
    </div>
  );
}
