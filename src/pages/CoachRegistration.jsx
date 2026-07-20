import { motion } from "framer-motion";
import { ArrowRight, LogIn, ShieldCheck } from "lucide-react";
import React, { useState } from "react";
import AuthShell from "../components/AuthShell";

export default function CoachRegistration({ coach, onRegister, onLogin }) {
  const [form, setForm] = useState(coach);

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const submit = (event) => {
    event.preventDefault();
    onRegister(form);
  };

  return (
    <AuthShell
      eyebrow="Coach onboarding"
      title="Register your academy"
      subtitle="Set up the coach profile that powers the complete academy website."
    >
      <form onSubmit={submit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Coach Name" value={form.coachName} onChange={(value) => update("coachName", value)} />
          <Field label="Academy Name" value={form.academyName} onChange={(value) => update("academyName", value)} />
          <Field label="Experience" value={form.experience} onChange={(value) => update("experience", value)} />
          <Field label="Contact Number" value={form.contact} onChange={(value) => update("contact", value)} />
          <Field label="Email" type="email" value={form.email} onChange={(value) => update("email", value)} />
          <Field label="Specialization" value={form.specialization} onChange={(value) => update("specialization", value)} />
          <Field label="Academy Address" value={form.address} onChange={(value) => update("address", value)} className="sm:col-span-2" />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <motion.button
            className="premium-button bg-gradient-to-r from-pitch to-trophy text-midnight shadow-glow"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <ShieldCheck size={18} />
            Register
            <ArrowRight size={18} />
          </motion.button>
          <motion.button
            type="button"
            onClick={onLogin}
            className="premium-button border-white/10 bg-white/[0.055] text-white hover:border-pitch/50"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogIn size={18} />
            Already have account
          </motion.button>
        </div>
      </form>
    </AuthShell>
  );
}

function Field({ label, value, onChange, type = "text", className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-bold text-mist">{label}</span>
      <input className="form-input" type={type} value={value ?? ""} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}
