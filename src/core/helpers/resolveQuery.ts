const NOT_HAS_FILTERS = 0;

export const resolveQuery = (urlBase: string, filters: object = {}): string => {
  let urlFinal = urlBase;
  if (Object.keys(filters).length === NOT_HAS_FILTERS) {
    return urlFinal;
  }
  urlFinal += '?';

  const keys: string[] = Object.keys(filters);
  for (let count = 0; count < keys.length; count += 1) {
    const key: string = keys[count];
    let value: string = filters[key];
    if (value === undefined || value === null) {
      value = '';
    }

    if (count === keys.length - 1) {
      urlFinal = `${urlFinal}${key}=${value}`;
    } else {
      urlFinal = `${urlFinal}${key}=${value}&`;
    }
  }
  return `${urlFinal}`;
};
