import { motion } from "framer-motion";
import { ArrowRight, UserPlus } from "lucide-react";
import React, { useState } from "react";
import AuthShell from "../components/AuthShell";

export default function Login({ onLogin, onSignup }) {
  const [email, setEmail] = useState("coach@greenlinecricket.com");
  const [password, setPassword] = useState("champions");

  const submit = (event) => {
    event.preventDefault();
    onLogin();
  };

  return (
    <AuthShell
      eyebrow="Coach login"
      title="Welcome back"
      subtitle="Enter the academy workspace and manage students, fees, progress, and profile details."
    >
      <form onSubmit={submit} className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-mist">Email</span>
          <input className="form-input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-bold text-mist">Password</span>
          <input className="form-input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <motion.button
            className="premium-button bg-gradient-to-r from-pitch to-trophy text-midnight shadow-glow"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Login
            <ArrowRight size={18} />
          </motion.button>
          <motion.button
            type="button"
            onClick={onSignup}
            className="premium-button border-white/10 bg-white/[0.055] text-white hover:border-pitch/50"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <UserPlus size={18} />
            Create New Account
          </motion.button>
        </div>
      </form>
    </AuthShell>
  );
}
