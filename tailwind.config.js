module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
        dropdown:
          'dropdown 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both',
      },
      colors: {
        lightGold: '#DDCCAA',
        background: '#11101A',
        orange: '#E31221',
        lightGray: '#D9D9D9',
      },
      fontFamily: {
        'Helvetica-Neue': ['Helvetica Neue'],
        'Helvetica-Neue-Geo': ['Helvetica Neue Geo'],
        Montserrat: ['Montserrat'],
      },
      backgroundPosition: {
        'bottom-left-center': 'bottom right -14rem',
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          to: {
            opacity: '1',
          },
        },
        dropdown: {
          '0%': {
            transform: 'scaleY(.4)',
            'transform-origin': '100% 0%',
          },
          to: {
            transform: 'scaleY(1)',
            'transform-origin': '100% 0%',
          },
        },
      },
    },
  },
  plugins: [],
}
