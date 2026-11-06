/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Peaceful low-contrast academic theme (inspired by evs-vit.vercel.app)
        bg: '#18181A',
        side: '#1E1E21',
        panel: '#232326',
        raised: '#2C2C30',
        line: '#36363B',
        lineSoft: '#2A2A2E',
        dim: '#85858D',
        textSecondary: '#BFBFC5',
        textPrimary: '#F4F4F6',
        accent: {
          DEFAULT: '#E05656',
          hover: '#C94545',
          subtle: 'rgba(224, 86, 86, 0.12)',
        },
        sage: {
          DEFAULT: '#5BA887',
          hover: '#4C9174',
          subtle: 'rgba(91, 168, 135, 0.12)',
        },

        // Backward-compatible palette mappings
        op: {
          red: {
            DEFAULT: "#E05656",
            dark: "#C94545",
            light: "#E87373",
            subtle: "rgba(224, 86, 86, 0.12)",
            glow: "rgba(224, 86, 86, 0.18)",
          },
          black: {
            DEFAULT: "#18181A",
            pure: "#18181A",
            surface: "#1E1E21",
            card: "#232326",
            elevated: "#2C2C30",
          },
          grey: {
            50: "#F4F4F6",
            100: "#E5E5E9",
            200: "#BFBFC5",
            300: "#9A9AA2",
            400: "#85858D",
            500: "#6A6A72",
            600: "#47474E",
            700: "#36363B",
            800: "#2C2C30",
            900: "#232326",
          },
        },
      },
      fontFamily: {
        serif: ["Newsreader", "Iowan Old Style", "Georgia", "serif"],
        sans: ["Figtree", "Segoe UI", "system-ui", "-apple-system", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        'soft-card': '0 2px 8px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};
