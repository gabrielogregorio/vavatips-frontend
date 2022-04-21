import * as yup from 'yup';

const username = yup.string().required('Digite um usuário!');
const password = yup.string().required('Você precisa informar uma senha');
const emailNotRequired = yup.string().email('O e-mail precisa ser válido').notRequired();
const MINIMAL_DESCRIPTION_SIZE: number = 8;

export const schemaLogin = yup.object().shape({
  username,
  password,
});

export const schemaRegister = yup.object().shape({
  keyCode: yup.string().required('Você precisa informar seu código'),
  username,
  password,
  passwordConfirmation: yup
    .string()
    .required('Você precisa informar uma senha')
    .oneOf([yup.ref('password'), null], 'Senhas não combinam'),
});

export const schemaSendSuggestion = yup.object().shape({
  tip: yup.string(),
  email: emailNotRequired,
  description: yup
    .string()
    .min(MINIMAL_DESCRIPTION_SIZE, 'Essa descrição está muito curta')
    .required('Você precisa fornecer uma descrição'),
});

export const schemaManagementPosts = yup.object().shape({
  title: yup.string().required('A dica precisa ter um título'),
  description: yup.string().required('A dica precisa ter uma descrição'),
  moment: yup.string().required('Escolha um momento da partida'),
  difficult: yup.string().required('Escolha uma dificuldade'),
  ability: yup.string().required('Qual é principal habilidade usada'),
  side: yup.string().required('Escolha um lado'),
  map: yup.string().required('Escolha um mapa'),
  position: yup.string().required('Escolha uma posição'),
  agent: yup.string().required('Escolha um agente'),
});

export const schemaUpdateProfile = yup.object().shape({
  username,
  password,
  passwordConfirmation: yup
    .string()
    .required('Você precisa informar uma senha')
    .oneOf([yup.ref('password'), null], 'Senhas não combinam'),
});

export const schemaModalNewSep = yup.object().shape({
  id: yup.string().notRequired(),
  descriptionImage: yup.string().required('Você precisa informar uma descrição'),
});
