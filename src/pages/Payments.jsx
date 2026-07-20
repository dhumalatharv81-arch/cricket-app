import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BadgeIndianRupee, CreditCard, Filter, Hourglass, UsersRound, WalletCards, X } from "lucide-react";
import React, { useMemo, useState } from "react";
import AnimatedPage from "../components/AnimatedPage";
import GlassCard from "../components/GlassCard";
import StatCard from "../components/StatCard";
import { chartDataFor, formatCurrency } from "../utils/calculations";

export default function Payments({ students, stats, selectedStudentId, onClearStudent, onOpenStudent }) {
  const [status, setStatus] = useState("All");
  const selectedStudent = students.find((student) => student.id === selectedStudentId);
  const { revenueData } = chartDataFor(students);

  const rows = useMemo(() => {
    const base = selectedStudent ? [selectedStudent] : students;
    return base
      .filter((student) => status === "All" || student.paymentStatus === status)
      .map((student) => ({
        student,
        latest: student.paymentHistory?.[student.paymentHistory.length - 1],
      }));
  }, [selectedStudent, status, students]);

  return (
    <AnimatedPage className="mx-auto max-w-7xl px-4 pb-28 pt-8 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="inline-flex rounded-full border border-trophy/35 bg-trophy/10 px-4 py-2 text-sm font-black text-trophy">
            Payments
          </p>
          <h1 className="mt-4 text-4xl font-black text-white md:text-5xl">Fee collection</h1>
          <p className="mt-3 max-w-2xl text-graphite">
            Track revenue, pending dues, and student-wise payment history.
          </p>
        </div>
        {selectedStudent && (
          <button
            onClick={onClearStudent}
            className="premium-button border-white/10 bg-white/[0.055] text-white hover:border-trophy/45"
          >
            <X size={17} />
            {selectedStudent.studentName}
          </button>
        )}
      </div>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard icon={WalletCards} label="Total Revenue" value={formatCurrency(stats.totalRevenue)} detail="Collected history" tone="pitch" />
        <StatCard icon={BadgeIndianRupee} label="Monthly Revenue" value={formatCurrency(stats.monthlyRevenue)} detail="Current paid fees" tone="trophy" />
        <StatCard icon={UsersRound} label="Paid Students" value={stats.paidStudents} detail="Cleared this month" tone="mist" />
        <StatCard icon={Hourglass} label="Pending Students" value={stats.pendingStudents} detail="Need follow-up" tone="ember" />
        <StatCard icon={CreditCard} label="Pending Amount" value={formatCurrency(stats.pendingAmount)} detail="Expected dues" tone="ember" />
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <GlassCard className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-white">Revenue Chart</h2>
              <p className="mt-1 text-sm text-graphite">Monthly collection pattern</p>
            </div>
            <BadgeIndianRupee className="text-trophy" />
          </div>
          <div className="mt-5 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="paymentRevenue" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#f6c453" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#f6c453" stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="month" stroke="#93a4b8" tickLine={false} axisLine={false} />
                <YAxis stroke="#93a4b8" tickLine={false} axisLine={false} tickFormatter={(value) => `${Math.round(value / 1000)}k`} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#f6c453" strokeWidth={3} fill="url(#paymentRevenue)" isAnimationActive />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-black text-white">Student-wise Payment History</h2>
              <p className="mt-1 text-sm text-graphite">{rows.length} visible records</p>
            </div>
            <div className="flex rounded-full border border-white/10 bg-white/[0.045] p-1">
              {["All", "Paid", "Pending"].map((item) => (
                <button
                  key={item}
                  onClick={() => setStatus(item)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black ${
                    status === item ? "bg-pitch text-midnight" : "text-mist"
                  }`}
                >
                  {item === "All" && <Filter size={14} />}
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[620px] text-left">
              <thead className="text-xs uppercase text-graphite">
                <tr>
                  <th className="py-3">Student</th>
                  <th className="py-3">Batch</th>
                  <th className="py-3">Latest Month</th>
                  <th className="py-3">Amount</th>
                  <th className="py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {rows.map(({ student, latest }) => (
                  <tr
                    key={student.id}
                    onClick={() => onOpenStudent(student.id)}
                    className="cursor-pointer text-sm text-mist transition hover:bg-white/[0.045]"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img src={student.photo} alt={student.studentName} className="h-10 w-10 rounded-lg object-cover" />
                        <span className="font-black text-white">{student.studentName}</span>
                      </div>
                    </td>
                    <td className="py-4">{student.batchTiming}</td>
                    <td className="py-4">{latest?.month || "July 2026"}</td>
                    <td className="py-4">{formatCurrency(latest?.amount || student.monthlyFee)}</td>
                    <td className="py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-black ${student.paymentStatus === "Paid" ? "bg-pitch text-midnight" : "bg-trophy text-midnight"}`}>
                        {student.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </section>
    </AnimatedPage>
  );
}

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-midnight/95 p-3 shadow-premium">
      <p className="text-sm font-black text-white">{label}</p>
      <p className="mt-1 text-sm text-trophy">{formatCurrency(payload[0].value)}</p>
    </div>
  );
}
