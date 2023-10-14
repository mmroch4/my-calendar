import type { Config } from "tailwindcss";

import { palette } from "./palette";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: { ...palette },
    fontFamily: {
      emoji: ["var(--font-emoji)"],
    },
  },
  plugins: [],
};
export default config;
