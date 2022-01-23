export default function formatImage(file: string) {
  // if (process.env.NEXT_PUBLIC_MODE_RUN === 'DEVELOP') {
  const urlImage = `${process.env.NEXT_PUBLIC_API_HOST}/images/${file}`;
  return urlImage.replace('https://storage.googleapis.com/valorant-tips-bucket/', '');
  // }// else if (process.env.NEXT_PUBLIC_MODE_RUN === 'PRODUCTION') {
  //  return file;
  // } else {
  // return 'error_envieronment_file';
  // }
}
