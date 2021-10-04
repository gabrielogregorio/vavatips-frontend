console.log(process.env.REACT_APP_MODE_RUN, process.env.REACT_APP_API_HOST)

export const formatImage = (file: string) => {
  if(process.env.REACT_APP_MODE_RUN === 'DEVELOP') {
    let urlImage = process.env.REACT_APP_API_HOST + '/images/' + file
    console.log('dev =>', urlImage)
    return urlImage

  } else if (process.env.REACT_APP_MODE_RUN === 'PRODUCTION') {
    return file

  } else {
    return 'error_envieronment_file'
  }

}
