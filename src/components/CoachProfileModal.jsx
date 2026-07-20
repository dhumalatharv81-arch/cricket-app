import { AnimatePresence, motion } from "framer-motion";
import { Camera, Save, X } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function CoachProfileModal({ isOpen, coach, onClose, onSave }) {
  const [form, setForm] = useState(coach);

  useEffect(() => {
    if (isOpen) setForm(coach);
  }, [coach, isOpen]);

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const handlePhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("photo", reader.result);
    reader.readAsDataURL(file);
  };

  const submit = (event) => {
    event.preventDefault();
    onSave(form);
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
            className="w-full max-w-3xl overflow-hidden rounded-lg border border-white/12 bg-ink shadow-premium"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div>
                <p className="text-xs font-bold uppercase text-pitchSoft">Coach profile</p>
                <h2 className="mt-1 text-2xl font-black text-white">Edit Coach Profile</h2>
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

            <div className="grid max-h-[68vh] gap-5 overflow-y-auto p-5 sm:p-6 lg:grid-cols-[220px_1fr]">
              <div>
                <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.055]">
                  <img src={form.photo} alt={form.coachName} className="h-56 w-full object-cover" />
                  <label className="absolute inset-x-4 bottom-4 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-midnight/82 px-4 py-3 text-sm font-black text-white backdrop-blur">
                    <Camera size={16} />
                    Coach Photo
                    <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                  </label>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Coach Name" value={form.coachName} onChange={(value) => update("coachName", value)} />
                <Field label="Academy Name" value={form.academyName} onChange={(value) => update("academyName", value)} />
                <Field label="Experience" value={form.experience} onChange={(value) => update("experience", value)} />
                <Field label="Contact Number" value={form.contact} onChange={(value) => update("contact", value)} />
                <Field label="Email" type="email" value={form.email} onChange={(value) => update("email", value)} />
                <Field label="Specialization" value={form.specialization} onChange={(value) => update("specialization", value)} className="sm:col-span-2" />
                <Field label="Academy Address" value={form.address} onChange={(value) => update("address", value)} className="sm:col-span-2" />
              </div>
            </div>

            <div className="flex justify-end border-t border-white/10 p-5">
              <button className="premium-button bg-gradient-to-r from-pitch to-trophy text-midnight shadow-glow">
                <Save size={17} />
                Save Profile
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
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
