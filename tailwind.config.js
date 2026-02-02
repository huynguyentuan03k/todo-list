import { type Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // --- custom config ---
      keyframes: {
        "spin-slow-10s": {
          "0%": {
            transform: "rotate(0deg)",
            color: "currentColor"
          },
          "10%": {
            color: "#22c55e" // Chuyển sang màu xanh lá
          },
          "90%": {
            color: "#22c55e" // Giữ màu xanh
          },
          "100%": {
            transform: "rotate(670deg)", // Giảm từ 1800 xuống 720 để quay CHẬM lại
            color: "currentColor"
          },
        },
      },
      animation: {
        "spin-slow-10s": "spin-slow-10s 10s linear", // dùng 'linear' để tốc độ đều từ đầu đến cuối
      },
      // --------------------

      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
