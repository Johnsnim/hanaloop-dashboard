import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { 50: "#DDE6ED", 200: "#9DB2BF", 500: "#526D82", 800: "#27374D", DEFAULT: "#526D82" },
        good: "#2563eb",
        bad: "#ef4444"
      },
      boxShadow: { elevated: "0 10px 20px -10px rgba(0,0,0,0.25)" }
    }
  },
  plugins: []
};
export default config;
