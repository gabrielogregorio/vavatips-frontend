module.exports = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx}', './src/pages/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      zIndex: {
        modal: 'var(--z-modal)',
        modalMessage: 'var(--z-modal-message)',
        btnPost: 'var(--z-btn-post)',
      },
      maxWidth: {
        maxWidthDefault: 'var(--max-width)',
        maxWidthDefaultForm: 'var(--max-width-form)',
        maxWidthModal: 'var(--max-width-modal)',
      },
      height: {
        maxHeightContent: '500px',
      },
      textColor: {
        skin: {
          primaryExtra: 'var(--primaryExtra)',
          textColor: 'var(--text-color)',
          secondary: 'var(--secondary)',
          primary: 'var(--primary)',
          primarySmall: 'var(--primarySmall)',
          textColorInDarkness: 'var(--text-color-in-darkness)',
        },
      },
      backgroundColor: {
        skin: {
          bgPage: 'var(--bgPage)',
          primary: 'var(--primary)',
          secondary: 'var(--secondary)',
          bgContainer: 'var(--bgContainer)',
          backgroundDescription: 'var(--background-description)',
          primaryExtra: 'var(--primaryExtra)',
          primarySmall: 'var(--primarySmall)',
          textColorInDarkness: 'var(--text-color-in-darkness)',
        },
      },
      borderColor: {
        skin: {
          secondary: 'var(--secondary)',
          primaryExtra: 'var(--primaryExtra)',
          primarySmall: 'var(--primarySmall)',
        },
      },
    },
  },
  plugins: [],
};
