import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        black: "#000000",
        background: "#F7F7F7",
        textColor: "#333333",
        primary: {
          50: "##f0f0fe",
          100: "#d3d1fb",
          200: "#c5c2f9",
          300: "#b6b3f8",
          400: "#a7a4f7",
          500: "#9995f5",
          600: "#8a85f4",
          700: "#7c76f2",
          800: "#6d67f1",
          900: "#5752c1",
          950: "#413e91",
        },
        accent: {
          50: "#fef0f0",
          100: "#fbd3d3",
          200: "#f9c5c5",
          300: "#f8b6b6",
          400: "#f7a7a7",
          500: "#f59999",
          600: "#f48a8a",
          700: "#f27c7c",
          800: "#f16d6d",
          900: "#c15757",
          950: "#914141",
        },
        gradientrose: {
          50: "#7963ee",
          100: "#845eea",
          200: "#8f5ae4",
          300: "#9856de",
          400: "#a152d7",
          500: "#a94ecf",
          600: "#b14bc6",
          700: "#b847bd",
          800: "#be44b3",
          900: "#c440a8",
          950: "#c93d9d",
          1000: "#ce3b92",
        },
        gradientblue: {
          101: "#5f6bf3",
          102: "#5f6bf3",
          103: "#4f70f4",
          104: "#3b75f4",
          105: "#1979f3",
          106: "#007fe3",
          107: "#0084d3",
          108: "#0186ca",
          109: "#0088c2",
          1010: "#028ab9",
          1011: "#038bb1",
          1012: "#048da8",
          1013: "#008fa0",
          1014: "#009098",
          1015: "#03918f",
          1016: "#029287",
          1017: "#04937e",
          1018: "#009475",
          1019: "#00956c",
          1020: "#049663",
          1021: "#009759",
          1022: "#009848",
          1023: "#029929",
          1024: "#329700",
          1025: "#519202",
          1026: "#608f02",
          1027: "#6c8c00",
          1028: "#778900",
        },
      },
    },
  },
  plugins: [],
};
export default config;
