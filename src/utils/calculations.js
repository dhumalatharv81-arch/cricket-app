import { growthBase, revenueBase } from "../data/mockData";

export const formatCurrency = (value) =>
  `Rs. ${Number(value || 0).toLocaleString("en-IN")}`;

export const calculateAge = (dateOfBirth) => {
  if (!dateOfBirth) return "";
  const birthDate = new Date(dateOfBirth);
  const today = new Date("2026-07-02T00:00:00");
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }
  return age > 0 ? String(age) : "";
};

export const createPaymentHistory = (student) => [
  {
    month: "Admission",
    amount: Number(student.admissionFee || 0),
    status: student.paymentStatus || "Pending",
    date: student.admissionDate || "2026-07-02",
  },
  {
    month: "July 2026",
    amount: Number(student.monthlyFee || 0),
    status: student.paymentStatus || "Pending",
    date: "2026-07-02",
  },
];

export const enrichStudent = (student, existing = {}) => {
  const progress =
    existing.progress ?? Math.min(96, 58 + Math.floor(Math.random() * 34));
  const attendance =
    existing.attendance ?? Math.min(98, 72 + Math.floor(Math.random() * 22));

  return {
    ...existing,
    ...student,
    age: student.age || calculateAge(student.dateOfBirth),
    admissionFee: Number(student.admissionFee || 0),
    monthlyFee: Number(student.monthlyFee || 0),
    progress,
    attendance,
    strikeRate: existing.strikeRate ?? Math.max(42, 72 + Math.floor(Math.random() * 58)),
    bowlingEconomy:
      existing.bowlingEconomy ??
      (student.playingRole === "Bowler" || student.playingRole === "All-Rounder"
        ? Number((4.1 + Math.random() * 1.9).toFixed(1))
        : 0),
    fitnessScore: existing.fitnessScore ?? Math.min(98, 70 + Math.floor(Math.random() * 24)),
    paymentHistory:
      existing.paymentHistory && existing.paymentHistory.length
        ? existing.paymentHistory.map((entry, index) =>
            index === existing.paymentHistory.length - 1
              ? {
                  ...entry,
                  amount: Number(student.monthlyFee || entry.amount || 0),
                  status: student.paymentStatus || entry.status,
                }
              : entry
          )
        : createPaymentHistory(student),
  };
};

export const academyStats = (students) => {
  const totalStudents = students.length;
  const paidStudents = students.filter((student) => student.paymentStatus === "Paid").length;
  const pendingStudents = students.filter((student) => student.paymentStatus === "Pending").length;
  const monthlyRevenue = students
    .filter((student) => student.paymentStatus === "Paid")
    .reduce((sum, student) => sum + Number(student.monthlyFee || 0), 0);
  const totalRevenue = students.reduce((sum, student) => {
    const paidHistory = student.paymentHistory?.filter((entry) => entry.status === "Paid") || [];
    return sum + paidHistory.reduce((entrySum, entry) => entrySum + Number(entry.amount || 0), 0);
  }, 0);
  const pendingAmount = students
    .filter((student) => student.paymentStatus === "Pending")
    .reduce((sum, student) => sum + Number(student.monthlyFee || 0), 0);
  const activeBatches = new Set(students.map((student) => student.batchTiming).filter(Boolean)).size;

  return {
    totalStudents,
    activeStudents: totalStudents,
    paidStudents,
    pendingStudents,
    monthlyRevenue,
    totalRevenue,
    pendingPayments: pendingStudents,
    pendingAmount,
    activeBatches,
  };
};

export const chartDataFor = (students) => {
  const stats = academyStats(students);
  return {
    growthData: [...growthBase, { month: "Jul", students: Math.max(40, stats.totalStudents + 38) }],
    revenueData: [
      ...revenueBase,
      { month: "Jul", revenue: Math.max(250000, 225000 + stats.monthlyRevenue) },
    ],
  };
};

export const recentAdmissions = (students) =>
  [...students]
    .sort((a, b) => new Date(b.admissionDate || 0) - new Date(a.admissionDate || 0))
    .slice(0, 4);

export const topPerformers = (students) =>
  [...students].sort((a, b) => Number(b.progress || 0) - Number(a.progress || 0)).slice(0, 4);
