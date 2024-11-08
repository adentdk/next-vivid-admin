import type { Config } from "tailwindcss";

import { em, SCREENS } from "./lib/utils/theme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: Object.entries(SCREENS).reduce(
      (acc, [key, value]) => {
        acc[key] = `${value}px`;
        return acc;
      },
      {} as Record<string, string>,
    ),
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        mono: ["var(--font-geist-mono)", "Courier New"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      typography: {
        DEFAULT: {
          css: [
            {
              "--tw-prose-body": "hsl(var(--foreground))",
              "--tw-prose-headings": "hsl(var(--foreground))",
              "--tw-prose-lead": "hsl(var(--foreground))",
              "--tw-prose-links": "hsl(var(--primary))",
              "--tw-prose-bold": "hsl(var(--foreground))",
              "--tw-prose-counters": "hsl(var(--foreground))",
              "--tw-prose-bullets": "hsl(var(--foreground))",
              "--tw-prose-hr": "hsl(var(--ring))",
              "--tw-prose-quotes": "hsl(var(--muted-foreground))",
              "--tw-prose-quote-borders": "hsl(var(--border))",
              "--tw-prose-captions": "hsl(var(--foreground))",
              "--tw-prose-code": "hsl(var(--foreground))",
              "--tw-prose-code-bg": "hsl(var(--muted))",
              "--tw-prose-pre-code": "hsl(var(--foreground))",
              "--tw-prose-pre-bg": "hsl(var(--muted))",
              "--tw-prose-th-borders": "hsl(var(--border))",
              "--tw-prose-td-borders": "hsl(var(--border))",
            },
            {
              p: {
                marginTop: em(10, 16),
                marginBottom: em(10, 16),
              },
              '[class~="lead"]': {
                marginTop: em(12, 20),
                marginBottom: em(12, 20),
              },
              blockquote: {
                marginTop: em(16, 20),
                marginBottom: em(16, 20),
              },
              h1: {
                marginBottom: em(16, 36),
              },
              h2: {
                marginTop: em(24, 24),
                marginBottom: em(12, 24),
              },
              h3: {
                marginTop: em(16, 20),
                marginBottom: em(6, 20),
              },
              h4: {
                marginTop: em(12, 16),
                marginBottom: em(4, 16),
              },
              img: {
                marginTop: em(16, 16),
                marginBottom: em(16, 16),
              },
              picture: {
                marginTop: em(16, 16),
                marginBottom: em(16, 16),
              },
              video: {
                marginTop: em(16, 16),
                marginBottom: em(16, 16),
              },
              pre: {
                marginTop: em(12, 14),
                marginBottom: em(12, 14),
              },
              ol: {
                marginTop: em(10, 16),
                marginBottom: em(10, 16),
              },
              ul: {
                marginTop: em(10, 16),
                marginBottom: em(10, 16),
              },
              li: {
                marginTop: em(4, 16),
                marginBottom: em(4, 16),
              },
              "> ul > li p": {
                marginTop: em(6, 16),
                marginBottom: em(6, 16),
              },
              "> ul > li > p:first-child": {
                marginTop: em(10, 16),
              },
              "> ul > li > p:last-child": {
                marginBottom: em(10, 16),
              },
              "> ol > li > p:first-child": {
                marginTop: em(10, 16),
              },
              "> ol > li > p:last-child": {
                marginBottom: em(10, 16),
              },
              "ul ul, ul ol, ol ul, ol ol": {
                marginTop: em(6, 16),
                marginBottom: em(6, 16),
              },
              dl: {
                marginTop: em(10, 16),
                marginBottom: em(10, 16),
              },
              dt: {
                marginTop: em(10, 16),
              },
              dd: {
                marginTop: em(4, 16),
              },
              hr: {
                marginTop: em(24, 16),
                marginBottom: em(24, 16),
              },
              figure: {
                marginTop: em(16, 16),
                marginBottom: em(16, 16),
              },
              figcaption: {
                marginTop: em(6, 14),
              },
            },
          ],
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
export default config;
