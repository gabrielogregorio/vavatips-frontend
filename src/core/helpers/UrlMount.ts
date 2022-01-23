import { useRouter } from 'next/router';

interface propsNewValueInterface {
  name: string;
  value: string;
}

export function UrlMount(props: propsNewValueInterface): string {
  const location = useRouter();
  const queries = location.query;
  let urlMounted = '';
  if (props.name !== '') {
    queries[props.name] = props.value;
  }

  const objectQueries = Object.keys(queries);

  for (let x = 0; x < objectQueries.length; x += 1) {
    urlMounted += `&${objectQueries[x]}=${queries[objectQueries[x]]}`;
  }

  return urlMounted;
}

export function generateUrl(numberOfPage: number, urlBase: any, map: any, agent: any): string {
  return `/${urlBase}?map=${map}&agent=${agent}&page=${numberOfPage}`;
}