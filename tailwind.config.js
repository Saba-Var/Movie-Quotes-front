module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
        dropdown: 'dropdown 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
        'scale-up':
          'scale-up 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
        'focus-in-text-expand':
          'focus-in-text-expand 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
      },
      colors: {
        lightGold: '#DDCCAA',
        background: '#11101A',
        darkBlue: '#181623',
        orange: '#E31221',
        lightGray: '#D9D9D9',
        medGray: '#6C757D',
        darkGray: 'rgba(0, 0, 0, 0.54)',
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
            transform: 'scaleY(.3)',
            'transform-origin': '100% 0%',
          },
          to: {
            transform: 'scaleY(1)',
            'transform-origin': '100% 0%',
          },
        },
        'scale-up': {
          '0%': {
            transform: 'scale(.5)',
          },
          to: {
            transform: 'scale(1)',
          },
        },
        'focus-in-text-expand': {
          '0%': {
            'letter-spacing': '-.5em',
            filter: 'blur(12px)',
            opacity: '0',
          },
          to: {
            filter: 'blur(0)',
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [],
}
