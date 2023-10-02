/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      mobile: "641px",
      tablet: "769px",
      largeTablet: "1025px",
      desktop: "1441px",
    },
    extend: {
      colors: {
        primary: {
          50: "#efe9fa",
          100: "#cdbcf0",
          200: "#b59ce8",
          300: "#946ede",
          400: "#7f52d7",
          500: "#5f27cd",
          600: "#5623bb",
          700: "#431c92",
          800: "#341571",
          900: "#281056",
        },
        secondary: {
          50: "#f3f4f6",
          100: "#d9dde2",
          200: "#c7cdd5",
          300: "#adb6c1",
          400: "#9da8b5",
          500: "#8592a3",
          600: "#798594",
          700: "#5e6874",
          800: "#49505a",
          900: "#383d44",
        },
        green: {
          50: "#e7f9f1",
          100: "#b3edd2",
          200: "#8fe4bc",
          300: "#5cd79e",
          400: "#3cd08b",
          500: "#0bc46e",
          600: "#0ab264",
          700: "#088b4e",
          800: "#066c3d",
          900: "#05522e",
        },
        blue: {
          50: "#ebf0ff",
          100: "#c0d0ff",
          200: "#a1b9ff",
          300: "#7698ff",
          400: "#5c85ff",
          500: "#3366ff",
          600: "#2e5de8",
          700: "#2448b5",
          800: "#1c388c",
          900: "#152b6b",
        },
        yellow: {
          50: "#fef9e6",
          100: "#fdebb1",
          200: "#fce28c",
          300: "#fbd557",
          400: "#facd36",
          500: "#f9c004",
          600: "#e3af04",
          700: "#b18803",
          800: "#896a02",
          900: "#695102",
        },
        red: {
          50: "#ffebea",
          100: "#fec1be",
          200: "#fea39e",
          300: "#fd7972",
          400: "#fd5f57",
          500: "#fc372d",
          600: "#e53229",
          700: "#b32720",
          800: "#8b1e19",
          900: "#6a1713",
        },
        neutral: {
          50: "#f2f2f2",
          100: "#f1f4f9",
          200: "#e1e8f0",
          300: "#CBD5E0",
          400: "#94A2B8",
          500: "#64748B",
          600: "#465468",
          700: "#344056",
          800: "#1E2A3A",
          900: "#101729",
        },
        cyan: {
          50: "#f0f7ff",
          100: "#cfe7fe",
          200: "#b8dcfe",
          300: "#97cbfe",
          400: "#83c1fd",
          500: "#64b2fd",
          600: "#5ba2e6",
          700: "#477eb4",
          800: "#37628b",
          900: "#2a4b6a",
        },
        dark: {
          50: "#e7e9ec",
          100: "#b6bac5",
          200: "#9298a9",
          300: "#616982",
          400: "#424c69",
          500: "#131f44",
          600: "#111c3e",
          700: "#0d1630",
          800: "#0a1125",
          900: "#080d1d",
        },
      },
      fontSize: {
        h1: [
          "42px",
          {
            lineHeight: "50px",
            letterSpacing: "-0.02em",
          },
        ],
        h2: [
          "38px",
          {
            lineHeight: "46px",
            letterSpacing: "-0.02em",
          },
        ],
        h3: [
          "32px",
          {
            lineHeight: "38px",
            letterSpacing: "-0.02em",
          },
        ],
        h4: [
          "28px",
          {
            lineHeight: "34px",
            letterSpacing: "-0.02em",
          },
        ],
        title: [
          "24px",
          {
            lineHeight: "31px",
            letterSpacing: "-0.02em",
          },
        ],
        subtitle: [
          "18px",
          {
            lineHeight: "28px",
            letterSpacing: "-0.02em",
          },
        ],
        b1: [
          "16px",
          {
            lineHeight: "24px",
            letterSpacing: "-0.02em",
          },
        ],
        b2: [
          "14px",
          {
            lineHeight: "22px",
            letterSpacing: "-0.02em",
          },
        ],
        caption: [
          "12px",
          {
            lineHeight: "18px",
            letterSpacing: "-0.02em",
          },
        ],
      },
      boxShadow: {
        "xs-1":
          "0px 1px 2px 2px rgba(50, 71, 92, 0.02), 0px 1px 4px 1px rgba(50, 71, 92, 0.04), 0px 1px 2px 1px rgba(50, 71, 92, 0.06)",
        "xs-2":
          "0px 1px 3px 2px rgba(50, 71, 92, 0.02), 0px 2px 5px 1px rgba(50, 71, 92, 0.04), 0px 1px 3px 2px rgba(50, 71, 92, 0.06)",
        "xs-3":
          "0px 1px 4px 2px rgba(50, 71, 92, 0.02), 0px 2px 6px 1px rgba(50, 71, 92, 0.04), 0px 1px 6px 2px rgba(50, 71, 92, 0.06)",
        "xs-4":
          "0px 1px 4px 2px rgba(50, 71, 92, 0.02), 0px 3px 7px 1px rgba(50, 71, 92, 0.04), 0px 1px 7px 1px rgba(50, 71, 92, 0.06)",
        "xs-5":
          "0px 1px 5px 4px rgba(50, 71, 92, 0.02), 0px 3px 8px 1px rgba(50, 71, 92, 0.04), 0px 2px 8px 1px rgba(50, 71, 92, 0.06)",
        "xs-6":
          "0px 2px 6px 4px rgba(50, 71, 92, 0.02), 0px 4px 9px 1px rgba(50, 71, 92, 0.04), 0px 2px 9px 0px rgba(50, 71, 92, 0.06)",
        "sm-1":
          "0px 2px 7px 4px rgba(50, 71, 92, 0.02), 0px 4px 10px 1px rgba(50, 71, 92, 0.04), 0px 2px 10px 2px rgba(50, 71, 92, 0.06)",
        "sm-2":
          "0px 3px 8px 4px rgba(50, 71, 92, 0.02), 0px 6px 11px 1px rgba(50, 71, 92, 0.04), 0px 3px 11px 3px rgba(50, 71, 92, 0.06)",
        "sm-3":
          "0px 4px 9px 5px rgba(50, 71, 92, 0.02), 0px 5px 12px 1px rgba(50, 71, 92, 0.04), 0px 4px 12px 3px rgba(50, 71, 92, 0.06)",
        "sm-4":
          "0px 5px 10px 5px rgba(50, 71, 92, 0.02), 0px 6px 14px 3px rgba(50, 71, 92, 0.04), 0px 5px 13px 3px rgba(50, 71, 92, 0.06)",
        "sm-5":
          "0px 6px 11px 5px rgba(50, 71, 92, 0.02), 0px 8px 14px 1px rgba(50, 71, 92, 0.04), 0px 6px 14px 4px rgba(50, 71, 92, 0.06)",
        "sm-6":
          "0px 5px 12px 5px rgba(50, 71, 92, 0.02), 0px 10px 15px 2px rgba(50, 71, 92, 0.04), 0px 6px 15px 4px rgba(50, 71, 92, 0.06)",
        "md-1":
          "0px 5px 14px 6px rgba(50, 71, 92, 0.02), 0px 12px 16px 2px rgba(50, 71, 92, 0.04), 0px 7px 14px 4px rgba(50, 71, 92, 0.06)",
        "md-2":
          "0px 5px 14px 6px rgba(50, 71, 92, 0.02), 0px 12px 17px 2px rgba(50, 71, 92, 0.04), 0px 6px 17px 4px rgba(50, 71, 92, 0.06)",
        "md-3":
          "0px 5px 15px 6px rgba(50, 71, 92, 0.02), 0px 14px 18px 2px rgba(50, 71, 92, 0.04), 0px 7px 18px 5px rgba(50, 71, 92, 0.06)",
        "md-4":
          "0px 5px 16px 6px rgba(50, 71, 92, 0.02), 0px 15px 19px 2px rgba(50, 71, 92, 0.04), 0px 7px 19px 5px rgba(50, 71, 92, 0.06)",
        "md-5":
          "0px 5px 17px 7px rgba(50, 71, 92, 0.02), 0px 16px 20px 2px rgba(50, 71, 92, 0.04), 0px 7px 20px 5px rgba(50, 71, 92, 0.06)",
        "md-6":
          "0px 6px 18px 7px rgba(50, 71, 92, 0.02), 0px 17px 21px 2px rgba(50, 71, 92, 0.04), 0px 8px 21px 5px rgba(50, 71, 92, 0.06)",
        "lg-1":
          "0px 6px 19px 7px rgba(50, 71, 92, 0.02), 0px 18px 22px 2px rgba(50, 71, 92, 0.04), 0px 8px 22px 6px rgba(50, 71, 92, 0.06)",
        "lg-2":
          "0px 7px 20px 7px rgba(50, 71, 92, 0.02), 0px 18px 23px 3px rgba(50, 71, 92, 0.04), 0px 9px 23px 6px rgba(50, 71, 92, 0.06)",
        "lg-3":
          "0px 7px 21px 7px rgba(50, 71, 92, 0.02), 0px 18px 24px 3px rgba(50, 71, 92, 0.04), 0px 9px 24px 6px rgba(50, 71, 92, 0.06)",
        "lg-4":
          "0px 7px 22px 7px rgba(50, 71, 92, 0.02), 0px 20px 25px 3px rgba(50, 71, 92, 0.04), 0px 9px 25px 6px rgba(50, 71, 92, 0.06)",
        "lg-5":
          "0px 8px 23px 7px rgba(50, 71, 92, 0.02), 0px 22px 26px 3px rgba(50, 71, 92, 0.04), 0px 10px 26px 7px rgba(50, 71, 92, 0.06)",
        "lg-6":
          "0px 8px 24px 7px rgba(50, 71, 92, 0.02), 0px 22px 27px 3px rgba(50, 71, 92, 0.04), 0px 10px 27px 7px rgba(50, 71, 92, 0.06)",
      },
    },
  },
  variants: {
    extend: {
      fontSize: ["responsive", "hover", "focus", "placeholder"],
    },
  },
};
