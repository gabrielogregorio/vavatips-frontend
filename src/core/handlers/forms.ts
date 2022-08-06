import * as yup from 'yup';

const messagePass = 'Você precisa informar uma senha';

const username = yup.string().required('Digite um usuário!');
const password = yup.string().required(messagePass);
const emailNotRequired = yup.string().email('O e-mail precisa ser válido').notRequired();

export const schemaLogin = yup.object().shape({
  password,
  username,
});

export const schemaRegister = yup.object().shape({
  keyCode: yup.string().required('Você precisa informar seu código'),
  password,
  passwordConfirmation: yup
    .string()
    .required(messagePass)
    .oneOf([yup.ref('password'), null], 'Senhas não combinam'),
  username,
});
const MINIMUM_SIZE_DESCRIPTION = 8;

export const schemaSendSuggestion = yup.object().shape({
  description: yup
    .string()
    .min(MINIMUM_SIZE_DESCRIPTION, 'Essa descrição está muito curta')
    .required('Você precisa fornecer uma descrição'),
  email: emailNotRequired,
  tip: yup.string(),
});

export const schemaManagementPosts = yup.object().shape({
  ability: yup.string().required('Qual é principal habilidade usada'),
  agent: yup.string().required('Escolha um agente'),
  description: yup.string().required('A dica precisa ter uma descrição'),
  difficult: yup.string().required('Escolha uma dificuldade'),
  map: yup.string().required('Escolha um mapa'),
  moment: yup.string().required('Escolha um momento da partida'),
  position: yup.string().required('Escolha uma posição'),
  side: yup.string().required('Escolha um lado'),
  title: yup.string().required('A dica precisa ter um título'),
});

export const schemaUpdateProfile = yup.object().shape({
  password,
  passwordConfirmation: yup
    .string()
    .required(messagePass)
    .oneOf([yup.ref('password'), null], 'Senhas não combinam'),
  username,
});

export const schemaModalNewSep = yup.object().shape({
  descriptionImage: yup.string().required('Você precisa informar uma descrição'),
  id: yup.string().notRequired(),
});
