import { navbarEnum } from '@/enums/navbar';

export type modelNavbarType = { url: navbarEnum; text: string };

export const modelNavbarPublic: modelNavbarType[] = [
  { url: navbarEnum.Inicio, text: 'inicio' },
  { url: navbarEnum.Posts, text: 'posts' },
  { url: navbarEnum.Save, text: 'salvos' },
  { url: navbarEnum.Tested, text: 'testados' },
];

export const modelNavbarAdmin: modelNavbarType[] = [
  { url: navbarEnum.Dashboard, text: 'dashboard' },
  { url: navbarEnum.PostCreate, text: 'criar posts' },
  { url: navbarEnum.ViewPosts, text: 'posts' },
  { url: navbarEnum.Suggestions, text: 'sugestões' },
  { url: navbarEnum.Profile, text: 'perfil' },
];
