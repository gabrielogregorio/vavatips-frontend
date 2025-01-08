import i18next from 'i18next';

i18next.init({
  lng: 'pt',
  debug: true,
  resources: {
    en: {
      translation: {
        'label.dashboard.countAlAgents': 'Agents',
        'label.dashboard.countAll': 'All access',
        'label.dashboard.countAllPosts': 'Posts',
        'label.dashboard.countAllSuggestions': 'Suggestions',
        'label.dashboard.countAllUsers': 'Users',
        'label.dashboard.countAlMaps': 'Maps',
        'label.dashboard.countIps': 'All access by ip',
      },
    },
    pt: {
      translation: {
        'label.dashboard.countAlAgents': 'Agentes',
        'label.dashboard.countAllPosts': 'Postagens',
        'label.dashboard.countAllSuggestions': 'Sugestões',
        'label.dashboard.countAllUsers': 'Usuários',
        'label.dashboard.countAlMaps': 'Mapas',
        'label.dashboard.countAll': 'Todos os acessos',
        'label.dashboard.countIps': 'todos os acessos por IP',
      },
    },
  },
});

export const formatI18n = (key: string): string => {
  return i18next.t(key);
};
