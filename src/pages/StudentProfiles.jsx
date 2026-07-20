import { Filter, Search, UsersRound } from "lucide-react";
import React, { useMemo, useState } from "react";
import AnimatedPage from "../components/AnimatedPage";
import GlassCard from "../components/GlassCard";
import StudentCard from "../components/StudentCard";

export default function StudentProfiles({ students, onOpenStudent }) {
  const [search, setSearch] = useState("");
  const [batch, setBatch] = useState("All");
  const [payment, setPayment] = useState("All");

  const batches = useMemo(
    () => ["All", ...Array.from(new Set(students.map((student) => student.batchTiming).filter(Boolean)))],
    [students]
  );

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch = [student.studentName, student.playingRole, student.parentName]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesBatch = batch === "All" || student.batchTiming === batch;
      const matchesPayment = payment === "All" || student.paymentStatus === payment;
      return matchesSearch && matchesBatch && matchesPayment;
    });
  }, [batch, payment, search, students]);

  return (
    <AnimatedPage className="mx-auto max-w-7xl px-4 pb-28 pt-8 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="inline-flex rounded-full border border-pitch/30 bg-pitch/10 px-4 py-2 text-sm font-black text-pitchSoft">
            Student Profiles
          </p>
          <h1 className="mt-4 text-4xl font-black text-white md:text-5xl">Academy players</h1>
          <p className="mt-3 max-w-2xl text-graphite">
            Search, filter, and open complete student records from premium cards.
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-white/[0.055] px-5 py-4 text-right">
          <p className="text-sm font-bold text-graphite">Showing</p>
          <p className="text-3xl font-black text-white">{filteredStudents.length}</p>
        </div>
      </div>

      <GlassCard className="mt-6 p-4">
        <div className="grid gap-3 lg:grid-cols-[1fr_220px_220px]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-graphite" size={18} />
            <input
              className="form-input pl-12"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by student, role, or parent"
            />
          </label>
          <label className="relative block">
            <Filter className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-graphite" size={18} />
            <select className="form-input pl-12" value={batch} onChange={(event) => setBatch(event.target.value)}>
              {batches.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <select className="form-input" value={payment} onChange={(event) => setPayment(event.target.value)}>
            {["All", "Paid", "Pending"].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </GlassCard>

      {filteredStudents.length > 0 ? (
        <section className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredStudents.map((student) => (
            <StudentCard key={student.id} student={student} onOpen={() => onOpenStudent(student.id)} />
          ))}
        </section>
      ) : (
        <GlassCard className="mt-6 p-10 text-center">
          <UsersRound className="mx-auto text-pitchSoft" size={40} />
          <h2 className="mt-4 text-2xl font-black text-white">No students found</h2>
          <p className="mt-2 text-graphite">Try a different search or filter.</p>
        </GlassCard>
      )}
    </AnimatedPage>
  );
}
