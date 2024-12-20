import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#8B5CF6', // A vibrant purple
          DEFAULT: '#6D28D9', // A deep purple
          dark: '#5B21B6',
        },
        secondary: {
          light: '#60A5FA', // A bright blue
          DEFAULT: '#3B82F6', // A vivid blue
          dark: '#2563EB',
        },
        accent: {
          light: '#34D399', // A fresh green
          DEFAULT: '#10B981', // An emerald green
          dark: '#059669',
        },
        background: {
          light: '#F3F4F6',
          DEFAULT: '#E5E7EB',
          dark: '#D1D5DB',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
