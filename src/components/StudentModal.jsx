import { AnimatePresence, motion } from "framer-motion";
import { Camera, Check, ChevronLeft, ChevronRight, Save, X } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { calculateAge } from "../utils/calculations";

const emptyStudent = {
  photo: "",
  studentName: "",
  dateOfBirth: "",
  age: "",
  gender: "Male",
  parentName: "",
  parentMobile: "",
  email: "",
  address: "",
  schoolName: "",
  standard: "",
  playingRole: "Batsman",
  experienceLevel: "Beginner",
  batchTiming: "Junior Foundation",
  admissionDate: "2026-07-02",
  admissionFee: "",
  monthlyFee: "",
  paymentStatus: "Pending",
};

const fallbackPhoto =
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=600&q=80";

const steps = ["Profile", "Cricket", "Fees"];

export default function StudentModal({ isOpen, onClose, onSave, student }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(emptyStudent);
  const isEditing = Boolean(student?.id);

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setForm({ ...emptyStudent, ...student });
    }
  }, [isOpen, student]);

  const preview = useMemo(() => form.photo || fallbackPhoto, [form.photo]);

  const update = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
      ...(field === "dateOfBirth" ? { age: calculateAge(value) || current.age } : {}),
    }));
  };

  const handlePhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("photo", reader.result);
    reader.readAsDataURL(file);
  };

  const submit = (event) => {
    event.preventDefault();
    if (step < steps.length - 1) {
      setStep((current) => current + 1);
      return;
    }
    onSave({
      ...form,
      photo: form.photo || fallbackPhoto,
      age: form.age || calculateAge(form.dateOfBirth),
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-midnight/76 px-4 py-6 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.form
            onSubmit={submit}
            className="max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-lg border border-white/12 bg-ink shadow-premium"
            initial={{ opacity: 0, y: 34, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 22, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div>
                <p className="text-xs font-bold uppercase text-pitchSoft">{isEditing ? "Edit student" : "New admission"}</p>
                <h2 className="mt-1 text-2xl font-black text-white">{isEditing ? "Edit Student Profile" : "Student Registration"}</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.055] text-mist hover:text-white"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex gap-2 border-b border-white/10 px-5 py-4">
              {steps.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setStep(index)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-bold ${
                    step === index ? "bg-pitch text-midnight" : "bg-white/[0.055] text-graphite"
                  }`}
                >
                  {index < step ? <Check size={15} /> : index + 1}
                  {item}
                </button>
              ))}
            </div>

            <div className="max-h-[58vh] overflow-y-auto p-5 sm:p-6">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -28 }}
                    transition={{ duration: 0.24 }}
                    className="grid gap-5 lg:grid-cols-[220px_1fr]"
                  >
                    <div>
                      <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.055]">
                        <img src={preview} alt="Student preview" className="h-56 w-full object-cover" />
                        <label className="absolute inset-x-4 bottom-4 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-midnight/82 px-4 py-3 text-sm font-black text-white backdrop-blur">
                          <Camera size={16} />
                          Student Photo
                          <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                        </label>
                      </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Student Name" value={form.studentName} onChange={(value) => update("studentName", value)} required />
                      <Field label="Date of Birth" type="date" value={form.dateOfBirth} onChange={(value) => update("dateOfBirth", value)} />
                      <Field label="Age" value={form.age} onChange={(value) => update("age", value)} />
                      <Select label="Gender" value={form.gender} onChange={(value) => update("gender", value)} options={["Male", "Female", "Other"]} />
                      <Field label="Parent Name" value={form.parentName} onChange={(value) => update("parentName", value)} />
                      <Field label="Parent Mobile Number" value={form.parentMobile} onChange={(value) => update("parentMobile", value)} />
                      <Field label="Email" type="email" value={form.email} onChange={(value) => update("email", value)} />
                      <Field label="Address" value={form.address} onChange={(value) => update("address", value)} className="sm:col-span-2" />
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="cricket"
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -28 }}
                    transition={{ duration: 0.24 }}
                    className="grid gap-4 sm:grid-cols-2"
                  >
                    <Field label="School Name" value={form.schoolName} onChange={(value) => update("schoolName", value)} />
                    <Field label="Standard" value={form.standard} onChange={(value) => update("standard", value)} />
                    <Select label="Playing Role" value={form.playingRole} onChange={(value) => update("playingRole", value)} options={["Batsman", "Bowler", "All-Rounder", "Wicket Keeper"]} />
                    <Select label="Experience Level" value={form.experienceLevel} onChange={(value) => update("experienceLevel", value)} options={["Beginner", "Intermediate", "Advanced"]} />
                    <Select label="Batch Timing" value={form.batchTiming} onChange={(value) => update("batchTiming", value)} options={["Junior Foundation", "Morning Elite", "Evening Pace", "Weekend Match Lab", "One-to-One Coaching"]} />
                    <Field label="Admission Date" type="date" value={form.admissionDate} onChange={(value) => update("admissionDate", value)} />
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="fees"
                    initial={{ opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -28 }}
                    transition={{ duration: 0.24 }}
                    className="grid gap-4 sm:grid-cols-2"
                  >
                    <Field label="Admission Fee" type="number" value={form.admissionFee} onChange={(value) => update("admissionFee", value)} />
                    <Field label="Monthly Fee" type="number" value={form.monthlyFee} onChange={(value) => update("monthlyFee", value)} />
                    <Select label="Payment Status" value={form.paymentStatus} onChange={(value) => update("paymentStatus", value)} options={["Paid", "Pending"]} />
                    <div className="rounded-lg border border-white/10 bg-white/[0.055] p-4">
                      <p className="text-sm font-bold text-white">Admission summary</p>
                      <p className="mt-2 text-sm leading-6 text-graphite">
                        {form.studentName || "Student"} joins {form.batchTiming} as a {form.playingRole}. Current fee status is {form.paymentStatus}.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col gap-3 border-t border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={() => setStep((current) => Math.max(0, current - 1))}
                disabled={step === 0}
                className="premium-button border-white/10 bg-white/[0.055] text-mist disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={17} />
                Back
              </button>
              <button
                type="submit"
                className="premium-button bg-gradient-to-r from-pitch to-trophy text-midnight shadow-glow"
              >
                {step === steps.length - 1 ? <Save size={17} /> : <ChevronRight size={17} />}
                {step === steps.length - 1 ? (isEditing ? "Save Changes" : "Save Student") : "Next Step"}
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, value, onChange, type = "text", className = "", required = false }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-bold text-mist">{label}</span>
      <input
        className="form-input"
        type={type}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        required={required}
      />
    </label>
  );
}

function Select({ label, value, onChange, options, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-bold text-mist">{label}</span>
      <select className="form-input" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
