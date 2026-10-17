/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#060606',
          800: '#0b0b0b',
          700: '#121211',
          600: '#1a1a18',
        },
        bone: {
          DEFAULT: '#ece7dd',
          dim: '#b8b2a6',
          mute: '#8b8578',
          faint: '#57534c',
        },
        ember: {
          DEFAULT: '#d0342c',
          soft: '#e2564a',
        },
        line: 'rgba(236,231,221,0.14)',
      },
      fontFamily: {
        display: ['Anton', 'Archivo Expanded', '"Arial Black"', 'Helvetica', 'sans-serif'],
        headline: ['"Archivo Variable"', 'Archivo', 'Helvetica', 'Arial', 'sans-serif'],
        sans: ['"Inter Variable"', 'Inter', 'system-ui', '-apple-system', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        mega: '-0.055em',
        tightest: '-0.035em',
        label: '0.34em',
        wide2: '0.2em',
      },
      screens: {
        xs: '420px',
        '3xl': '1800px',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
        swift: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      maxWidth: {
        editorial: '96rem',
      },
    },
  },
  plugins: [],
};
