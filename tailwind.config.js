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
          danger: 'var(--btnActionsSave)',
          textColor: 'var(--text-color)',
          textColorBold: 'var(--text-color-bold)',
          linkNormal: 'var(--link-normal)',
          linkActive: 'var(--link-active)',
          textColorNormal: 'var(--text-color-normal)',
          textColorLink: 'var(--text-color-link)',
          secondary: 'var(--secondary)',
          primary: 'var(--primary)',
          btnActionsSave: 'var(--btnActionsSave)',
          btnActionsTested: 'var(--btnActionsTested)',
          btnActionsSuggestion: 'var(--btnActionsSuggestion)',
          textColorINVERSE: 'var(--text-color-INVERSE)',
        },
      },
      backgroundColor: {
        skin: {
          bgPrimary: 'var(--background-primary)',
          primary: 'var(--primary)',
          secondary: 'var(--secondary)',
          backgroundSecondary: 'var(--background-secondary)',
          backgroundDescription: 'var(--background-description)',
          btnActionsSave: 'var(--btnActionsSave)',
          btnActionsTested: 'var(--btnActionsTested)',
          btnActionsSuggestion: 'var(--btnActionsSuggestion)',
          textColorINVERSE: 'var(--text-color-INVERSE)',
        },
      },
      borderColor: {
        skin: {
          secondary: 'var(--secondary)',
          btnActionsSave: 'var(--btnActionsSave)',
          btnActionsTested: 'var(--btnActionsTested)',
          btnActionsSuggestion: 'var(--btnActionsSuggestion)',
        },
      },
    },
  },
  plugins: [],
};
