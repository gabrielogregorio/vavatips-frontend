import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        xxs: "2px",
        xs: "4px",
        sm: "6px",
        md: "8 px",
        lg: "12px",
        xl: "16px",

        "2xl": "20px",
        "3xl": "24px",

        "4xl": "28px",
        "5xl": "32px",

        "6xl": "36px",
        "7xl": "48px",
      },

      screens: {
        mobile: "412px",
        desktop: "1366px",
      },
      width: {
        "content-desktop": "840px",
      },

      borderRadius: {
        xs: "2px",
        sm: "4px",
        md: "6px",
        full: "100%",
      },

      colors: {
        primary: {
          DEFAULT: "#D85F5F",
          hard: "#E03F3F",
          soft: "#E07A7A",
        },

        secondary: {
          DEFAULT: "#3386D3",
          hard: "#0764BA",
          soft: "#72A8DB",
        },

        root: {
          bg: "#F4F7FC",
        },
        content: {
          fg: {
            DEFAULT: "#444444",
            subcontent: "#6A7281",
            contrast: "#FFFFFF",
            placeholder: "#99A1AE",
            disabled: "#848589",
          },
          bg: {
            DEFAULT: "#FFFFFF",
            disabled: "#F0F3FA",
            highlight: "#D9D9D9",
          },
        },
        accent: {
          radiant: "#FE9E2E",
          rose: "#D81E65",
          purple: "#9747FF",
          pacific: {
            blue: "#029ABC",
          },
        },
        feedback: {
          error: {
            hard: "#CB4343",
            soft: "#FCD2D2",
          },
          success: {
            soft: "#D1E7DD",
            hard: "#125134",
          },
        },
        overlay: {
          bg: "rgba(0,0,0, 0.6)",
          "bg-blur": "rgba(26,26,26,0.5)",
        },
        border: {
          DEFAULT: "#A8A8A8",
          soft: "#E8E8E8",
        },
        neutral: {
          900: "#111111",
          800: "#1A1A1A",
          750: "#383838",
          650: "#2C2C2C",
          500: "#6C6C6C",
          100: "#EFEFEF",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
