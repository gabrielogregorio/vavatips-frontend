const resolveQuery = (urlBase: string, filters: any = []) => {
  let urlFinal = urlBase;
  if (filters.length === 0) {
    return urlFinal;
  }
  urlFinal += '?';

  const keys: string[] = Object.keys(filters);
  for (let x = 0; x < keys.length; x += 1) {
    const key: string = keys[x];
    let value: string = filters[key];
    if (value === undefined || value === null) {
      value = '';
    }

    if (x === keys.length - 1) {
      urlFinal = `${urlFinal}${key}=${value}`;
    } else {
      urlFinal = `${urlFinal}${key}=${value}&`;
    }
  }

  return `${urlFinal}`;
};
export default resolveQuery;
