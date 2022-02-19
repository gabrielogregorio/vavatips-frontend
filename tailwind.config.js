module.exports = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx}', './src/pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(0)' },
          '50%': { transform: 'rotate(-10deg) scale(1.2)' },
        },

        scale: {
          '0%, 100%': { transform: 'rotateX(1)' },
          '50%': { transform: 'scaleX(1.1)' },
        },
      },
      animation: {
        wiggle: 'wiggle 200ms ease-in-out',
        scale: 'scale 200ms ease-in-out',
      },

      zIndex: {
        modal: 50,
        modalMessage: 50,
        btnPost: 40,
      },
      maxWidth: {
        maxWidthDefault: '800px',
        maxWidthDefaultForm: '500px',
        maxWidthModal: '400px',
      },
      height: {
        maxHeightContent: '500px',
      },
      textColor: {
        skin: {
          'secondary-regular': 'var(--secondary-regular)',
          'gray-400': 'var(--gray-400)',
          'gray-800': 'var(--gray-800)',
          'gray-500': 'var(--gray-500)',
          'primary-light': 'var(--primary-light)',
          'gray-900': 'var(--gray-900)',
        },
      },
      backgroundColor: {
        skin: {
          'gray-300': 'var(--gray-300)',
          'gray-700': 'var(--gray-700)',
          'primary-light': 'var(--primary-light)',
          white: 'var(--white)',
          'gray-900': 'var(--gray-900)',
          black: 'var(--black)',
          'secondary-light': 'var(--secondary-light)',
          'gray-400': 'var(--gray-400)',
        },
      },
      borderColor: {
        skin: {
          'primary-light': 'var(--primary-light)',
          'secondary-regular': 'var(--secondary-regular)',
        },
      },
    },
  },
  plugins: [],
};
