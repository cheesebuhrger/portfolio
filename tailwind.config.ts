import type { Config } from "tailwindcss";
import fluid, { extract } from "fluid-tailwind";

const config: Config = {
  content: {
    files: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    extract,
  },
  theme: {
    extend: {
      height: {
        80: "80vh",
        85: "85vh",
        90: "90vh",
      },
    },
    fontSize: {
      xxs: [".625rem", ".75rem"], //10 / 12
      xs: [".75rem", "1rem"], //12 / 16
      sm: [".875rem", "1.25rem"], // 14 / 20
      base: ["1rem", "1.5rem"], //16 / 24
      lg: ["1.125rem", "1.5rem"], //18 / 24
      "lg-p": ["1.125rem", "1.75rem"], //18 / 28
      xl: ["1.25rem", "1.75rem"], //20 / 28
      "xl-p": ["1.25rem", "2rem"], //20 / 32
      "2xl": ["1.5rem", "1.75rem"], //24 / 28
      "2xl-p": ["1.5rem", "2rem"], //24 / 32
      "3xl": ["1.75rem", "2rem"], //28 / 32
      "3xl-p": ["1.75rem", "2.5rem"], //28 / 40
      "4xl": ["2rem", "2.5rem"], //32 / 40
      "4xl-p": ["2rem", "2.75rem"], //32 / 44
      "5xl": ["2.5rem", "3rem"], //40 / 48
      "5xl-p": ["2.5rem", "3.25rem"], //40 / 52
      "6xl": ["3rem", "3.5rem"], //48 / 56
      "6xl-p": ["3rem", "3.75rem"], //48 / 60
      "7xl": ["4rem", "4.5rem"], //64 / 72
      "8xl": ["5rem", "5.5rem"], //80 / 88
      "9xl": ["6rem", "6.5rem"], //96 / 104
      // "9xl-p": ["6rem", "7.75rem"], //96 / 124
      "10xl": ["8rem", "8.25rem"], //128 / 132
      "11xl": ["10rem", "10.25rem"], //160 / 164
      "12xl": ["12rem", "12.25rem"], //192 / 196
    },
    screens: {
      sm: "30rem", //480
      md: "48rem", //768
      lg: "60rem", //960
      xl: "80rem", //1280
      xxl: "100rem", //1600
    },
    aspectRatio: {
      square: "1 / 1",
      "2/3": "2 / 3",
      "3/2": "3 / 2",
      "4/3": "4 / 3",
      "16/9-half": "8 / 9",
      "16/9": "16 / 9",
      "21/9-half": "10.5 / 9",
      "21/9": "21 / 9",
    },
    borderRadius: {
      sm: ".75rem",
      md: "1rem",
      lg: "1.25rem",
    },
    colors: {
      text: {
        primary: "rgba(var(--black-100), .8)",
        secondary: "rgba(var(--black-100), .54)",
        tertiary: "rgba(var(--black-100), .4)",
        "primary-negative": "rgba(var(--white-100), .8)",
        "secondary-negative": "rgba(var(--white-100), .6)",
        "tertiary-negative": "rgba(var(--white-100), .4)",
        highlight: "rgba(var(--gold-60), 1)",
        action: "rgba(var(--red-100), 1)",
        "on-action": "rgba(var(--pink-05), 1)",
      },
      surface: {
        background: "rgba(var(--white-95), 1)",
        primary: "rgba(var(--white-95), 1)",
        secondary: "rgba(var(--pink-05), 1)",
        "background-negative": "rgba(var(--black-90), 1)",
        "primary-negative": "rgba(var(--black-90), 1)",
        "secondary-negative": "rgba(var(--black-80), 1)",
        action: "rgba(var(--red-100), 1)",
        "action-alt": "rgba(var(--pink-10), 1)",
        scrim: "rgba(var(--black-100), .9)",
        overlay: "rgba(var(--black-100), .75)",
        button: "rgba(var(--pink-05), 0)",
        "button-hover": "rgba(var(--pink-10), 1)",
        "button-active": "rgba(var(--pink-20), 1)",
        swiper: "rgba(var(--black-90), 1)",
      },
      border: {
        primary: "rgba(var(--black-100), .3)",
        secondary: "rgba(var(--black-100), .1)",
        tertiary: "rgba(var(--black-100), .6)",
        "primary-negative": "rgba(var(--white-100), .3)",
        "secondary-negative": "rgba(var(--white-100), .1)",
        "tertiary-negative": "rgba(var(--white-100), .6)",
        action: "rgba(var(--red-100), 1)",
      },
    },
    fontFamily: {
      sans: [
        '"Surt", "sans"',
        {
          fontFeatureSettings: '"dlig" on, "ss10" on, "liga" off;',
        },
      ],
      "sans-light": ["FoundersGroteskLight", "sans"],
      serif: [
        '"EditorialOldLight", "serif"',
        {
          fontFeatureSettings: '"dlig" on, "ss01" on, "liga" off, "clig" off',
          fontVariationSettings: "lining-nums tabular-nums",
        },
      ],
      "serif-p": [
        '"EditorialOldLight", "serif"',
        {
          fontFeatureSettings: '"ss01" on, "liga" off, "clig" off',
          fontVariationSettings: "lining-nums tabular-nums",
        },
      ],
      "serif-italic": [
        '"EditorialOldLightItalic", "serif"',
        {
          fontFeatureSettings: '"dlig" on, "ss01" on, "liga" off, "clig" off',
          fontVariationSettings: "lining-nums tabular-nums",
        },
      ],
      "serif-p-italic": [
        '"EditorialOldLightItalic", "serif"',
        {
          fontFeatureSettings: '"ss01" on, "liga" off, "clig" off',
          fontVariationSettings: "lining-nums tabular-nums",
        },
      ],
      "serif-ultralight": [
        '"EditorialOldUltralight", "serif"',
        {
          fontFeatureSettings: '"dlig" on, "ss01" on, "liga" off, "clig" off',
          fontVariationSettings: "lining-nums tabular-nums",
        },
      ],
      "serif-ultralight-italic": [
        '"EditorialOldUltralightItalic", "serif"',
        {
          fontFeatureSettings: '"dlig" on, "ss01" on, "liga" off, "clig" off',
          fontVariationSettings: "lining-nums tabular-nums",
        },
      ],
      mono: [
        ["Geist", "monospace"],
        {
          fontFeatureSettings: '"ss03" on, "liga" off',
        },
      ],
    },
  },
  plugins: [
    fluid({
      checkSC144: false, // default: true
    }),
  ],
};
export default config;
