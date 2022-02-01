/* eslint-disable no-unused-vars */
export enum navbarEnumPublic {
  Inicio = '/Inicio',
  Posts = '/posts',
  Save = '/save',
  Tested = '/tested',
  Mistic = '#',
  None = '',
}

export enum navbarEnum {
  Profile = '/admin/profile',
  PostCreate = '/admin/post-create',
  ViewPosts = '/admin/view-posts',
  EditScreen = '#',
  SuggestionScreen = '/admin/suggestions',
  Dashboard = '/admin/dashboard',
  None = '',
}

export interface NavbarPropsPublicComponent {
  selected: navbarEnumPublic;
}

export interface NavbarPropsNavbarBasic {
  selected: navbarEnum;
}
