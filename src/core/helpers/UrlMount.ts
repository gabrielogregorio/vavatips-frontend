export default function generateUrl(numberOfPage: number, urlBase: any, map: any, agent: any): string {
  return `/${urlBase}?map=${map}&agent=${agent}&page=${numberOfPage}`;
}
