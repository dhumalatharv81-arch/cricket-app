import React from "react";

export default function MainSkeleton() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="shimmer h-56 rounded-lg bg-white/[0.055]" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="shimmer h-32 rounded-lg bg-white/[0.055]" />
        ))}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="shimmer h-80 rounded-lg bg-white/[0.055]" />
        <div className="shimmer h-80 rounded-lg bg-white/[0.055]" />
      </div>
    </main>
  );
}
