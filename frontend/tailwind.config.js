/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#DB4444',
          hover: '#C03939',
        },
        secondary: {
          DEFAULT: '#000000',
          2: '#7D8184',
        },
        text: {
          DEFAULT: '#000000',
          light: 'rgba(0, 0, 0, 0.5)',
          muted: '#7D8184',
        },
        bg: {
          light: '#F5F5F5',
          secondary: '#FAFAFA',
          auth: '#CBE4E8',
        },
        star: '#FFAD33',
        line: {
          DEFAULT: 'rgba(0, 0, 0, 0.3)',
          light: 'rgba(0, 0, 0, 0.1)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'figma-xs': ['12px', '18px'],
        'figma-sm': ['14px', '21px'],
        'figma-base': ['16px', '24px'],
        'figma-lg': ['20px', '28px'],
        'figma-xl': ['24px', '32px'],
        'figma-2xl': ['36px', '48px'],
        'figma-hero': ['48px', '60px'],
      },
      letterSpacing: {
        figma: '0.04em',
      },
      spacing: {
        container: '1170px',
        'section-y': '70px',
        'header-y': '25px',
      },
      maxWidth: {
        container: '1170px',
      },
      borderRadius: {
        figma: '4px',
      },
      boxShadow: {
        figma: '0px 1px 13px 0px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
