module.exports = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx}', './src/pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  plugins: [],
  theme: {
    extend: {
      animation: {
        scale: 'scale 200ms ease-in-out',
        wiggle: 'wiggle 200ms ease-in-out',
      },

      backgroundColor: {
        skin: {
          black: '#111111',
          'gray-300': '#efefef',
          'gray-700': '#22272e',
          'gray-900': '#2d333b',
          'primary-light': '#3386d3',
          'secondary-light': '#cb4343',
          white: '#ffffff',
        },
      },

      borderColor: {
        skin: {
          'primary-light': '#3386d3',
          'secondary-regular': '#d85f5f',
        },
      },
      colors: {
        primary: '#3386d3',
        secondary: '#d85f5f',
        success: '#9df76f',
      },

      height: {
        maxHeightContent: '500px',
      },

      keyframes: {
        scale: {
          '0%, 100%': { transform: 'rotateX(1)' },
          '50%': { transform: 'scaleX(1.1)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0)' },
          '50%': { transform: 'rotate(-10deg) scale(1.2)' },
        },
      },

      maxWidth: {
        maxWidthDefault: '800px',
        maxWidthDefaultForm: '400px',
        maxWidthModal: '400px',
      },
      textColor: {
        skin: {
          'gray-500': '#6c6c6c',
          'gray-800': '#2c2c2c',
          'gray-900': '#2d333b',
          'primary-light': '#3386d3',
          'secondary-regular': '#d85f5f',
          white: '#ffffff',
        },
      },
      zIndex: {
        btnPost: 40,
        modal: 50,
        modalMessage: 50,
      },
    },
  },
};
