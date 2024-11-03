import { Log } from '@/services/LogService';

enum availableLanguagesEnum {
  'pt-br' = 'pt-br',
  'en' = 'en',
}

const getValidBrownserPrefererLanguage = (): availableLanguagesEnum => {
  try {
    const languages = navigator.languages.map((language) => language.toLowerCase());
    const prefererLanguage = languages.find((language) =>
      Object.keys(availableLanguagesEnum).includes(language),
    ) as availableLanguagesEnum;

    if (!prefererLanguage) {
      return availableLanguagesEnum.en;
    }

    return prefererLanguage;
  } catch (error) {
    Log.addBreadcrumb({ data: error });
    Log.logError('Language is invalid');
    return availableLanguagesEnum.en;
  }
};

const KEY_LOCALSTORAGE_LANGUAGE = 'language'

const getValidPreferenceLocalStorageOrNull = (): availableLanguagesEnum | null => {
  const prefererLanguage = localStorage.getItem(KEY_LOCALSTORAGE_LANGUAGE) || ''
  if(Object.keys(availableLanguagesEnum).includes(prefererLanguage)) {
    return prefererLanguage as availableLanguagesEnum
  }

  return null
}

const getFinalLanguage = (): availableLanguagesEnum => {

  const validLocastorageLange = getValidPreferenceLocalStorageOrNull()
  if(!validLocastorageLange) {
    return validLocastorageLange
  }

  return getValidBrownserPrefererLanguage()
};


const useControlLanguage = () => {
  const finalLanguate = getFinalLanguage()
  localStorage.setItem(KEY_LOCALSTORAGE_LANGUAGE,finalLanguate )
}
