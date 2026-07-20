import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck } from "lucide-react";
import React, { useState } from "react";
import AuthShell from "../components/AuthShell";

export default function SignUp({ onSignUp }) {
  const [form, setForm] = useState({
    name: "",
    academy: "",
    email: "",
    password: "",
  });

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const submit = (event) => {
    event.preventDefault();
    onSignUp();
  };

  return (
    <AuthShell
      eyebrow="Create account"
      title="Start with a new coach account"
      subtitle="Create the login identity, then complete the coach registration profile."
    >
      <form onSubmit={submit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Coach Name" value={form.name} onChange={(value) => update("name", value)} />
          <Field label="Academy Name" value={form.academy} onChange={(value) => update("academy", value)} />
          <Field label="Email" type="email" value={form.email} onChange={(value) => update("email", value)} />
          <Field label="Password" type="password" value={form.password} onChange={(value) => update("password", value)} />
        </div>
        <motion.button
          className="premium-button w-full bg-gradient-to-r from-pitch to-trophy text-midnight shadow-glow"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <BadgeCheck size={18} />
          Sign Up
          <ArrowRight size={18} />
        </motion.button>
      </form>
    </AuthShell>
  );
}

function Field({ label, value, onChange, type = "text" }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-mist">{label}</span>
      <input className="form-input" type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}
