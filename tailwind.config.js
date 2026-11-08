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
        // Native SwiftUI Monochromatic System Colors
        bg: '#000000',
        side: '#08080A',
        panel: 'rgba(255, 255, 255, 0.04)',
        raised: 'rgba(255, 255, 255, 0.08)',
        line: 'rgba(255, 255, 255, 0.12)',
        lineSoft: 'rgba(255, 255, 255, 0.08)',
        dim: 'rgba(255, 255, 255, 0.40)',
        textSecondary: 'rgba(255, 255, 255, 0.65)',
        textPrimary: '#FFFFFF',
        accent: {
          DEFAULT: '#FFFFFF',
          hover: '#E5E5E9',
          subtle: 'rgba(255, 255, 255, 0.10)',
        },
        sage: {
          DEFAULT: '#FFFFFF',
          hover: '#E5E5E9',
          subtle: 'rgba(255, 255, 255, 0.10)',
        },

        // Backward-compatible palette mappings
        op: {
          red: {
            DEFAULT: "#FFFFFF",
            dark: "#E5E5E9",
            light: "#FFFFFF",
            subtle: "rgba(255, 255, 255, 0.10)",
            glow: "rgba(255, 255, 255, 0.20)",
          },
          black: {
            DEFAULT: "#000000",
            pure: "#000000",
            surface: "#08080A",
            card: "rgba(255, 255, 255, 0.04)",
            elevated: "rgba(255, 255, 255, 0.08)",
          },
          grey: {
            50: "#FFFFFF",
            100: "#F4F4F6",
            200: "rgba(255, 255, 255, 0.85)",
            300: "rgba(255, 255, 255, 0.65)",
            400: "rgba(255, 255, 255, 0.50)",
            500: "rgba(255, 255, 255, 0.35)",
            600: "rgba(255, 255, 255, 0.20)",
            700: "rgba(255, 255, 255, 0.12)",
            800: "rgba(255, 255, 255, 0.08)",
            900: "rgba(255, 255, 255, 0.04)",
          },
        },
      },
      fontFamily: {
        serif: ["-apple-system", "BlinkMacSystemFont", "SF Pro Display", "SF Pro Text", "system-ui", "sans-serif"],
        sans: ["-apple-system", "BlinkMacSystemFont", "SF Pro Display", "SF Pro Text", "system-ui", "sans-serif"],
        mono: ["SF Mono", "SFMono-Regular", "ui-monospace", "Menlo", "Monaco", "monospace"],
      },
      boxShadow: {
        'apple-card': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08), 0 4px 20px rgba(0, 0, 0, 0.35)',
        'apple-glass': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.12), 0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'apple-active': '0 2px 8px rgba(0, 0, 0, 0.25), 0 1px 2px rgba(0, 0, 0, 0.15)',
        'soft-card': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.08), 0 2px 8px rgba(0, 0, 0, 0.3)',
      },
      borderRadius: {
        'sm': '6px',
        'DEFAULT': '8px',
        'md': '10px',
        'lg': '14px',
        'xl': '18px',
        '2xl': '22px',
      }
    },
  },
  plugins: [],
};
