/* eslint-disable no-unused-vars */
export enum navbarEnumPublic {
  Inicio = '/Inicio',
  Posts = '/posts',
  Save = '/save',
  Tested = '/tested',
  Mistic = '#',
}

export enum navbarEnum {
  Profile = '/Profile',
  PostCreate = '/PostCreate',
  ViewPosts = '/ViewPosts',
  Config = '/Config',
  EditScreen = '#',
  ReportScreen = '/Reports',
  SuggestionScreen = '/Suggestions',
  Dashboard = '/Dashboard',
}

export interface NavbarPropsPublicComponent {
  selected: navbarEnumPublic;
}

export interface NavbarPropsNavbarBasic {
  selected: navbarEnum;
}
