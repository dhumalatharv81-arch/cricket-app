/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#07111f",
        ink: "#0a1628",
        pitch: "#0fbf74",
        pitchSoft: "#6ee7b7",
        trophy: "#f6c453",
        ember: "#ff7a59",
        mist: "#dbeafe",
        graphite: "#93a4b8",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        premium: "0 24px 80px rgba(0, 0, 0, 0.32)",
        glow: "0 0 34px rgba(15, 191, 116, 0.28)",
      },
      backgroundImage: {
        "stadium-lines":
          "linear-gradient(135deg, rgba(15,191,116,0.14), rgba(246,196,83,0.08) 42%, rgba(10,22,40,0.02))",
      },
    },
  },
  plugins: [],
};
