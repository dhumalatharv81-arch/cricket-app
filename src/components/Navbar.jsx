import React from "react";
import { motion } from "framer-motion";
import { BadgeIndianRupee, Home, LogOut, UserRound, UsersRound } from "lucide-react";

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "students", label: "Students", icon: UsersRound },
  { id: "payments", label: "Payments", icon: BadgeIndianRupee },
  { id: "coach-profile", label: "Coach", icon: UserRound },
];

export default function Navbar({ currentView, onNavigate, coachName, onLogout }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-midnight/78 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate("home")}
          className="flex min-w-0 items-center gap-3 text-left"
          aria-label="Go to home"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-pitch to-trophy text-midnight shadow-glow">
            <span className="text-lg font-black">C</span>
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-black text-white sm:text-base">
              Cricket Coach
            </span>
            <span className="block truncate text-xs text-graphite">{coachName}</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.045] p-1 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              currentView === item.id || (item.id === "students" && currentView === "student-detail");
            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${
                  active ? "text-midnight" : "text-mist hover:text-white"
                }`}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                {active && (
                  <motion.span
                    layoutId="navActive"
                    className="absolute inset-0 rounded-full bg-pitch"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon className="relative" size={16} />
                <span className="relative">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex rounded-full border border-white/10 bg-white/[0.045] p-1 md:hidden">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active =
                currentView === item.id || (item.id === "students" && currentView === "student-detail");
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`grid h-9 w-9 place-items-center rounded-full ${
                    active ? "bg-pitch text-midnight" : "text-mist"
                  }`}
                  aria-label={item.label}
                >
                  <Icon size={17} />
                </button>
              );
            })}
          </div>
          <motion.button
            onClick={onLogout}
            className="premium-button hidden border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-mist hover:border-ember/50 hover:text-white sm:inline-flex"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut size={16} />
            Logout
          </motion.button>
        </div>
      </div>
    </header>
  );
}
