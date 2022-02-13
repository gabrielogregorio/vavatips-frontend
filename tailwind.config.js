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
          primaryExtra: 'var(--primary-extra)',
          textColor: 'var(--text-color)',
          secondary: 'var(--secondary)',
          primary: 'var(--primary)',
          primarySmall: 'var(--primary-small)',
          textColorInDarkness: 'var(--text-color-in-darkness)',
        },
      },
      backgroundColor: {
        skin: {
          bgPage: 'var(--bg-page)',
          primary: 'var(--primary)',
          secondary: 'var(--secondary)',
          bgContainer: 'var(--bg-container)',
          backgroundDescription: 'var(--background-description)',
          primaryExtra: 'var(--primary-extra)',
          primarySmall: 'var(--primary-small)',
          textColorInDarkness: 'var(--text-color-in-darkness)',
        },
      },
      borderColor: {
        skin: {
          secondary: 'var(--secondary)',
          primaryExtra: 'var(--primary-extra)',
          primarySmall: 'var(--primary-small)',
        },
      },
    },
  },
  plugins: [],
};
