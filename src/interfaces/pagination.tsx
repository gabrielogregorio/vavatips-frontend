/* eslint-disable no-unused-vars */
type urlBase = 'ViewPosts' | 'Posts' | 'save' | 'tested';

export interface propsInterfacePaginationComponent {
  initial: number;
  finish: number;
  selected: number;
  map: string;
  agent: string;
  urlBase: urlBase;
}

export interface PaginationButtonInterface {
  numberOfPage: any;
  active: boolean;
  map: string;
  agent: string;
  urlBase: string;
}
