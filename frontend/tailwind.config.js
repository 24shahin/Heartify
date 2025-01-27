/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    colors: {
      main_bg: "var(--main_bg)",
      page_color: "var(--page_color)",
      input_color: "var(--input_color)",
      line_color: "var(--line_color)",
      primary_bg: "var(--primarybgr)",
      single_color: "var(--single_color)",
      secondary_bg: "var(--secondary_bg)",
      hove_color: "var(--hove_color)",
      blur: "var(--blur)",
      text_color: "var(--text_color)",
      primary_color: "var(--primary_color)",
      secondary_color: "var(--secondary_color)",
      tittle_color: "var(--tittle_color)",
      black: "var(--black)",
      white: "var(--white)",
      "white-100": "var(--white-100)",
      green: "var(--green)",
      blue: "var(--blue)",
      red: "var(--red)",
      yellow: "var(--yellow)",
      "purple-100": "var(--purple-100)",
      "common-white": "var(--common_color)",
      "pink-100": "var(--pink-100)",
      "cyan-100": "var(--cyan-100)",
      transparent: "var(--transparent)",
    },
    fontFamily: {
      gilNormal: ["gilNormal"],
      gilBold: ["gilBold"],
      gilExtrablod: ["gilExtrablod"],
      gilMedium: ["gilMedium"],
      gilSemibold: ["gilSemibold"],
      gilLight: ["gilLight"],
    },
    extend: {
      screens: {
        xs: "320px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1230px",
        "2xl": "1400px",
        "3xl": "1620px",
      },
      container: {
        center: true,
      },
      animation: {
        colorCombinition: "colorCombinition 2s linear infinite",
      },
      keyframes: {
        colorCombinition: {
          "0%, 100%": {
            background: "#f3e8ff",
            transform: "translateY(-25%)",
            " animation-timing-function": " cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            background: "#21d997",
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
    },
  },
  plugins: [],
};
