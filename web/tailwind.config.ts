import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#19202a",
        muted: "#5d697a",
        paper: "#f8fafc",
        line: "#d8dee8",
        accent: "#0f766e",
        blue: "#2563eb",
        amber: "#b45309",
        rose: "#be123c",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
