module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'bounce-in-top': 'bounce-in-top   1.2s ease-in both',
        flying: 'flying 5s linear  infinite both',
        'bounce-out-top': 'bounce-out-top 1.5s ease both',
        'fade-in': 'fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
        dropdown: 'dropdown 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
        'scale-up':
          'scale-up 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
        'focus-in-text-expand':
          'focus-in-text-expand 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'shake-horizontal':
          'shake-horizontal 0.8s cubic-bezier(0.455, 0.030, 0.515, 0.955) both',
      },
      colors: {
        lightGold: '#DDCCAA',
        background: '#11101A',
        darkBlue: '#181623',
        orange: '#E31221',
        lightGray: '#D9D9D9',
        medGray: '#6C757D',
        inputGray: '#CED4DA',
        inputBlack: '#212529 ',
        darkGray: 'rgba(0, 0, 0, 0.54)',
        errorRed: '#DC3545',
        green: '#198754',
        blue: '#0D6EFD',
        backgroundGray: '#24222f',
      },
      screens: {
        '2.5xl': '1600px',
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
        flying: {
          '0%,to': {
            transform: 'translate(0)',
          },
          '20%': {
            transform: 'translate(-16px, 16px)',
          },
          '40%': {
            transform: 'translate(-16px, -16px)',
          },
          '60%': {
            transform: 'translate(16px, 16px)',
          },
          '80%': {
            transform: 'translate(16px, -16px)',
          },
        },
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
        'shake-horizontal': {
          '0%,to': {
            transform: 'translateX(0)',
          },
          '10%,30%,50%,70%': {
            transform: 'translateX(-2.5px)',
          },
          '20%,40%,60%': {
            transform: 'translateX(2.5px)',
          },
          '80%': {
            transform: 'translateX(2px)',
          },
          '90%': {
            transform: 'translateX(-2px)',
          },
        },
        'bounce-in-top': {
          '0%': {
            transform: 'translateY(-500px)',
            'animation-timing-function': 'ease-in',
            opacity: '0',
          },
          '38%': {
            transform: 'translateY(0)',
            'animation-timing-function': 'ease-out',
            opacity: '1',
          },
          '55%': {
            transform: 'translateY(-65px)',
            'animation-timing-function': 'ease-in',
          },
          '72%,90%,to': {
            transform: 'translateY(0)',
            'animation-timing-function': 'ease-out',
          },
          '81%': {
            transform: 'translateY(-28px)',
          },
          '95%': {
            transform: 'translateY(-8px)',
            'animation-timing-function': 'ease-in',
          },
        },
        'bounce-out-top': {
          '0%,15%,38%,70%': {
            transform: 'translateY(0)',
            'animation-timing-function': 'ease-out',
          },
          '5%': {
            transform: 'translateY(-30px)',
            'animation-timing-function': 'ease-in',
          },
          '25%': {
            transform: 'translateY(-38px)',
            'animation-timing-function': 'ease-in',
          },
          '52%': {
            transform: 'translateY(-75px)',
            'animation-timing-function': 'ease-in',
          },
          '85%': {
            opacity: '1',
          },
          to: {
            transform: 'translateY(-800px)',
            opacity: '0',
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
