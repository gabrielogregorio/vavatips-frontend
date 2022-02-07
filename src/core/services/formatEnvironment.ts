function removeUrlGoogleStorageFromImages(urlImage: string): string {
  return urlImage.replace('https://storage.googleapis.com/valorant-tips-bucket/', '');
}

export default function formatImage(file: string) {
  const urlImage = `${process.env.NEXT_PUBLIC_API_HOST}/images/${file}`;
  return removeUrlGoogleStorageFromImages(urlImage);
}
