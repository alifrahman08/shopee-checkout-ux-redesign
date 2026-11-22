/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        shopee: {
          primary: "#EE4D2D",
          primaryHover: "#D73211",
          primaryLight: "#FFF5F1",
          primaryDark: "#C02A0B",
          secondary: "#F94E2F",
          accent: "#FA5A3A",
          orangeSubtle: "#FFF1EC",
          border: "#E8E8E8",
          textDark: "#222222",
          textMuted: "#757575",
          bgLight: "#F6F6F6",
          badgeBg: "#FFEFEA",
          greenSuccess: "#26AA99",
          greenLight: "#E8F8F5",
          goldStar: "#FFBA00"
        }
      },
      boxShadow: {
        'mobile': '0 4px 20px -2px rgba(0, 0, 0, 0.1)',
        'float-bottom': '0 -4px 16px rgba(0, 0, 0, 0.08)',
        'card-subtle': '0 1px 3px rgba(0,0,0,0.05)',
        'modal': '0 20px 40px -15px rgba(0, 0, 0, 0.25)',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
