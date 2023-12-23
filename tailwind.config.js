/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        pre: [
          "Consolas",
          "Andale Mono WT",
          "Andale Mono",
          "Lucida Console",
          "Lucida Sans Typewriter",
          "DejaVu Sans Mono",
          "Bitstream Vera Sans Mono",
          "Liberation Mono",
          "Nimbus Mono L",
          "Monaco",
          "Courier New",
          "Courier",
          "monospace",
        ],
      },
      animation: {
        loader: "loader 1s linear infinite",
      },
      keyframes: {
        loader: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
