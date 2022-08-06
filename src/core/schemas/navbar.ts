import { navbarEnum } from '@/enums/navbar';

export type modelNavbarType = { url: navbarEnum; text: string };

export const modelNavbarPublic: modelNavbarType[] = [
  { text: 'inicio', url: navbarEnum.Inicio },
  { text: 'salvos', url: navbarEnum.Save },
  { text: 'testados', url: navbarEnum.Tested },
];

export const modelNavbarAdmin: modelNavbarType[] = [
  { text: 'dashboard', url: navbarEnum.Dashboard },
  { text: 'criar posts', url: navbarEnum.PostCreate },
  { text: 'posts', url: navbarEnum.ViewPosts },
  { text: 'sugestões', url: navbarEnum.Suggestions },
  { text: 'perfil', url: navbarEnum.Profile },
];
