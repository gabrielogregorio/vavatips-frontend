export function convertToSelectedRender(data: any[]): { id: string; name: string }[] {
  const dataSelected: { id: string; name: string }[] = [];

  data.forEach((item) => {
    dataSelected.push({ id: item?.id?.toString() ?? '', name: item?.name?.toString() ?? '' });
  });

  return dataSelected;
}
