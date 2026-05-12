/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#18202f',
        surface: '#f7f8fb',
        brand: '#135e6f',
        accent: '#9a5b00',
        success: '#197a4d',
        danger: '#b42318'
      },
      boxShadow: {
        focus: '0 0 0 3px rgba(19, 94, 111, 0.35)'
      }
    }
  },
  plugins: []
};
