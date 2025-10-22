import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Paleta de culori NOBIS FARM
        nobis: {
          // Verde - Culoare principală (sănătate, echilibru, natura)
          green: {
            DEFAULT: "#22c55e", // Verde principal
            50: "#f0fdf4",
            100: "#dcfce7", 
            200: "#bbf7d0",
            300: "#86efac",
            400: "#4ade80",
            500: "#22c55e", // Verde principal
            600: "#16a34a",
            700: "#15803d", // Verde închis pentru contraste
            800: "#166534",
            900: "#14532d",
          },
          // Albastru calm - Culoare secundară (încredere, profesionalism)
          blue: {
            DEFAULT: "#0ea5e9",
            50: "#f0f9ff",
            100: "#e0f2fe",
            200: "#bae6fd",
            300: "#7dd3fc",
            400: "#38bdf8",
            500: "#0ea5e9", // Albastru calm principal
            600: "#0284c7",
            700: "#0369a1",
            800: "#075985",
            900: "#0c4a6e",
          },
          // Alb pur - Fundal principal
          white: "#ffffff",
          // Gri deschis - Fundal secundar, delimitări
          gray: {
            50: "#f9fafb",
            100: "#f3f4f6", // Gri deschis principal
            200: "#e5e7eb",
            300: "#d1d5db",
            400: "#9ca3af",
            500: "#6b7280",
            600: "#4b5563",
            700: "#374151",
            800: "#1f2937",
            900: "#111827",
          },
          // Bej cald - Culoare complementară (grijă, apropiere)
          beige: {
            DEFAULT: "#f5f5dc",
            50: "#fefefe",
            100: "#fefdfb",
            200: "#faf9f0",
            300: "#f5f5dc", // Bej cald principal
            400: "#ede6c7",
            500: "#e5d7b2",
            600: "#d4c299",
            700: "#b8a782",
            800: "#978b6b",
            900: "#7d7258",
          },
        },
        
        // Păstrăm culorile existente pentru compatibilitate
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          light: "hsl(var(--primary-light))",
          dark: "hsl(var(--primary-dark))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        orange: {
          DEFAULT: "hsl(var(--orange))",
          foreground: "hsl(var(--orange-foreground))",
        },
        gold: {
          DEFAULT: "hsl(var(--gold))",
          foreground: "hsl(var(--gold-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-hero-overlay': 'var(--gradient-hero-overlay)',
        'gradient-loyalty': 'var(--gradient-loyalty)',
        'gradient-card': 'var(--gradient-card)',
        'gradient-tombola': 'var(--gradient-tombola)',
        'gradient-overlay': 'var(--gradient-overlay)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        'hover': 'var(--shadow-hover)',
        'glow': 'var(--shadow-glow)',
        'card': 'var(--shadow-card)',
      },
      transitionProperty: {
        'base': 'var(--transition-base)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
