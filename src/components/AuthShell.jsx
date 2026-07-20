import React from "react";
import { motion } from "framer-motion";

const heroImage =
  "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1500&q=80";

export default function AuthShell({ eyebrow, title, subtitle, children }) {
  return (
    <div className="site-shell min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.section
          className="relative min-h-[360px] overflow-hidden rounded-lg border border-white/10 bg-ink shadow-premium lg:min-h-[640px]"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={heroImage}
            alt="Cricket training session"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/64 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
            <div className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
              Elite academy operations
            </div>
            <h1 className="max-w-2xl text-4xl font-black leading-tight text-white md:text-6xl">
              Build sharp players and run a sharper academy.
            </h1>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Skill plans", "Fees", "Progress"].map((item) => (
                <div key={item} className="rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur">
                  <p className="text-sm font-semibold text-mist">{item}</p>
                  <p className="mt-1 text-xs text-white/60">Coach-ready workflows</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          className="rounded-lg border border-white/10 bg-white/[0.055] p-5 shadow-premium backdrop-blur-2xl sm:p-8"
          initial={{ opacity: 0, x: 22 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.58, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-bold uppercase text-pitchSoft">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">{title}</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-graphite">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </motion.section>
      </div>
    </div>
  );
}
