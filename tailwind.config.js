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
          primaryExtra: '#d85f5f',
          textColor: '#dedede',
          textColorDark: '#2c2c2c',
          textColorGray: '#6c6c6c',
          secondary: '#3386d3',
          primary: '#2d333b',
          primarySmall: '#a75fd1',
          textColorInDarkness: '#dedede',
        },
      },
      backgroundColor: {
        skin: {
          bgPageWhite: '#efefef',
          bgPage: '#22272e',
          primary: '#2d333b',
          secondary: '#3386d3',
          bgContainerWhite: '#fff',
          bgContainer: '#2d333b',
          backgroundDescription: '#111',
          primaryExtra: '#cb4343',
          primarySmall: '#a75fd1',
          textColorInDarkness: '#dedede',
        },
      },
      borderColor: {
        skin: {
          secondary: '#3386d3',
          primaryExtra: '#d85f5f',
          primarySmall: '#a75fd1',
        },
      },
    },
  },
  plugins: [],
};
