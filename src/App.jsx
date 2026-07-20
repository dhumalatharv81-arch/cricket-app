import React, { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import CoachProfileModal from "./components/CoachProfileModal";
import FloatingAddButton from "./components/FloatingAddButton";
import MainSkeleton from "./components/MainSkeleton";
import Navbar from "./components/Navbar";
import StudentModal from "./components/StudentModal";
import { coachSeed, studentSeed } from "./data/mockData";
import CoachProfile from "./pages/CoachProfile";
import CoachRegistration from "./pages/CoachRegistration";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Payments from "./pages/Payments";
import SignUp from "./pages/SignUp";
import StudentDetail from "./pages/StudentDetail";
import StudentProfiles from "./pages/StudentProfiles";
import { academyStats, enrichStudent } from "./utils/calculations";

const authViews = new Set(["coach-registration", "login", "signup"]);

export default function App() {
  const [currentView, setCurrentView] = useState("coach-registration");
  const [coach, setCoach] = useState(coachSeed);
  const [students, setStudents] = useState(studentSeed);
  const [selectedStudentId, setSelectedStudentId] = useState(studentSeed[0]?.id);
  const [selectedPaymentStudentId, setSelectedPaymentStudentId] = useState(null);
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [coachModalOpen, setCoachModalOpen] = useState(false);
  const [loadingMain, setLoadingMain] = useState(false);

  const stats = useMemo(() => academyStats(students), [students]);
  const selectedStudent = students.find((student) => student.id === selectedStudentId);
  const isMainWebsite = !authViews.has(currentView);

  const navigate = (view) => {
    if (view === "students") setSelectedPaymentStudentId(null);
    if (view === "payments") setSelectedPaymentStudentId(null);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const login = () => {
    setCurrentView("home");
    setLoadingMain(true);
    window.setTimeout(() => setLoadingMain(false), 650);
  };

  const logout = () => {
    setStudentModalOpen(false);
    setCoachModalOpen(false);
    setCurrentView("login");
  };

  const openAddStudent = () => {
    setEditingStudent(null);
    setStudentModalOpen(true);
  };

  const openEditStudent = (student) => {
    setEditingStudent(student);
    setStudentModalOpen(true);
  };

  const saveStudent = (student) => {
    if (editingStudent?.id) {
      setStudents((current) =>
        current.map((item) =>
          item.id === editingStudent.id ? enrichStudent({ ...student, id: item.id }, item) : item
        )
      );
      setSelectedStudentId(editingStudent.id);
    } else {
      const id = `stu-${Date.now()}`;
      const newStudent = enrichStudent({ ...student, id });
      setStudents((current) => [newStudent, ...current]);
      setSelectedStudentId(id);
    }
    setStudentModalOpen(false);
    setEditingStudent(null);
  };

  const openStudentDetail = (id) => {
    setSelectedStudentId(id);
    setCurrentView("student-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openPaymentHistory = (id) => {
    setSelectedPaymentStudentId(id);
    setCurrentView("payments");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const saveCoach = (nextCoach) => {
    setCoach(nextCoach);
    setCoachModalOpen(false);
  };

  const registerCoach = (nextCoach) => {
    setCoach(nextCoach);
    setCurrentView("login");
  };

  const renderPage = () => {
    if (currentView === "coach-registration") {
      return <CoachRegistration coach={coach} onRegister={registerCoach} onLogin={() => setCurrentView("login")} />;
    }
    if (currentView === "login") {
      return <Login onLogin={login} onSignup={() => setCurrentView("signup")} />;
    }
    if (currentView === "signup") {
      return <SignUp onSignUp={() => setCurrentView("coach-registration")} />;
    }

    if (loadingMain) return <MainSkeleton />;

    if (currentView === "home") {
      return (
        <Home
          coach={coach}
          students={students}
          stats={stats}
          onNavigate={navigate}
          onAddStudent={openAddStudent}
        />
      );
    }
    if (currentView === "students") {
      return <StudentProfiles students={students} onOpenStudent={openStudentDetail} />;
    }
    if (currentView === "student-detail") {
      return (
        <StudentDetail
          student={selectedStudent}
          onBack={() => navigate("students")}
          onEdit={openEditStudent}
          onPayments={openPaymentHistory}
        />
      );
    }
    if (currentView === "payments") {
      return (
        <Payments
          students={students}
          stats={stats}
          selectedStudentId={selectedPaymentStudentId}
          onClearStudent={() => setSelectedPaymentStudentId(null)}
          onOpenStudent={openStudentDetail}
        />
      );
    }
    if (currentView === "coach-profile") {
      return (
        <CoachProfile
          coach={coach}
          stats={stats}
          onEdit={() => setCoachModalOpen(true)}
          onLogout={logout}
        />
      );
    }
    return null;
  };

  return (
    <div className="site-shell">
      {isMainWebsite && (
        <Navbar
          currentView={currentView}
          onNavigate={navigate}
          coachName={coach.coachName}
          onLogout={logout}
        />
      )}

      <AnimatePresence mode="wait">{renderPage()}</AnimatePresence>

      {isMainWebsite && <FloatingAddButton onClick={openAddStudent} />}

      <StudentModal
        isOpen={studentModalOpen}
        student={editingStudent}
        onClose={() => {
          setStudentModalOpen(false);
          setEditingStudent(null);
        }}
        onSave={saveStudent}
      />

      <CoachProfileModal
        isOpen={coachModalOpen}
        coach={coach}
        onClose={() => setCoachModalOpen(false)}
        onSave={saveCoach}
      />
    </div>
  );
}
