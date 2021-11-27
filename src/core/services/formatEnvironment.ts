export const formatImage = (file: string) => {
  if (process.env.REACT_APP_MODE_RUN === 'DEVELOP') {
    const urlImage = process.env.REACT_APP_API_HOST + '/images/' + file;
    return urlImage;
  } else if (process.env.REACT_APP_MODE_RUN === 'PRODUCTION') {
    return file;
  } else {
    return 'error_envieronment_file';
  }
};
