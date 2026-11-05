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
        background: "var(--background)",
        foreground: "var(--foreground)",
        // OnePlus Brand Palette: Iconic Red, Obsidian Black, Industrial Greys, Pure White
        op: {
          red: {
            DEFAULT: "#EB0029",
            dark: "#B8001F",
            light: "#FF2E4D",
            subtle: "rgba(235, 0, 41, 0.12)",
            glow: "rgba(235, 0, 41, 0.35)",
          },
          black: {
            DEFAULT: "#0A0A0A",
            pure: "#000000",
            surface: "#121212",
            card: "#161616",
            elevated: "#1E1E1E",
          },
          grey: {
            50: "#F5F5F5",
            100: "#E5E5E5",
            200: "#CCCCCC",
            300: "#999999",
            400: "#737373",
            500: "#525252",
            600: "#3D3D3D",
            700: "#292929",
            800: "#1F1F1F",
            900: "#141414",
          },
        },
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        'op-red': '0 0 25px rgba(235, 0, 41, 0.35)',
        'op-red-sm': '0 0 12px rgba(235, 0, 41, 0.25)',
        'op-card': '0 4px 20px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
};
