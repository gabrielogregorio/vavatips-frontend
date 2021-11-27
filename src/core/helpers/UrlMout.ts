import { useLocation } from 'react-router-dom';
import query from 'query-string';

interface propsNewValueInterface {
  name: string;
  value: string;
}

export function UrlMount(props: propsNewValueInterface): string {
  const location = useLocation();
  const queries = query.parse(location.search);
  let urlMounted = '';
  if (props.name !== '') {
    queries[props.name] = props.value;
  }

  const objectQueries = Object.keys(queries);

  for (let x = 0; x < objectQueries.length; x++) {
    urlMounted += '&' + objectQueries[x] + '=' + queries[objectQueries[x]];
  }

  return urlMounted;
}
