export function formatImage(file: string) {
  if (process.env.NEXT_PUBLIC_MODE_RUN === 'DEVELOP') {
    return `${process.env.NEXT_PUBLIC_API_HOST}/images/${file}`;
  }
  return file;
}
