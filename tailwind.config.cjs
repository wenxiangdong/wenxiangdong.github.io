import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        primary: "#515a6e",
        secondary: "#C9C9C9",
        "primary-light": "#ffffff",
        "secondary-light": "#c7c9d3",
      },
      backgroundColor: {
        page: "rgb(var(--color-bg-page) / <alpha-value>)",
      },
      spacing: {
        ...Array.from(Array(20)).reduce(
          (res, _, index) => ({
            ...res,
            [`${index * 5}vmin`]: `${index * 5}vmin`,
          }),
          {}
        ),
      },
    },
  },
  variants: {
    extend: {
      borderColor: ["focus"],
      backgroundColor: ["active"],
      backgroundOpacity: ["active"],
      boxShadow: ["hover"],
    },
  },
  plugins: [],
};
