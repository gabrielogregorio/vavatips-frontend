import Router from 'next/router';

const defaultStatusCode = {
  403: { label: 'UNAUTHORIZED', action: () => Router.push('/login') },
};

type handleInputErrorsType = {
  statusCode: number;
};

function handleInputErrors(error: any): handleInputErrorsType {
  const statusCode = error?.response?.status ?? 0;

  return {
    statusCode,
  };
}

export const handleDashboard = (error: any): string => {
  const { statusCode } = handleInputErrors(error);

  const resultByStatusCode = defaultStatusCode[statusCode];

  if (resultByStatusCode) {
    resultByStatusCode.action();
  }

  return 'Erro ao obter dados do dashboard';
};

export const handleErrorLogin = (error: any): string => {
  const { statusCode } = handleInputErrors(error);

  const literalHandler = {
    404: 'Usuário não cadastrado!',
    403: 'Senha inválida!',
    default: 'Erro Desconhecido',
  };

  return literalHandler[statusCode] ?? literalHandler.default;
};

export const handleErrorRegister = (error: any): string => {
  const { statusCode } = handleInputErrors(error);

  const literalHandler = {
    409: 'Esse e-mail já está cadastrado',
    default: 'Erro ao cadastrar usuário',
  };

  return literalHandler[statusCode] ?? literalHandler.default;
};

export const handleErrorViewAdminPosts = (error: any): string => {
  const { statusCode } = handleInputErrors(error);

  const literalHandler = {
    default: 'Erro ao carregar dados',
  };

  return literalHandler[statusCode] ?? literalHandler.default;
};

export const handleErrorSuggestion = (error: any): string => {
  const { statusCode } = handleInputErrors(error);

  const literalHandler = {
    default: 'Erro no servidor',
  };

  return error.message || literalHandler[statusCode] || literalHandler.default;
};

export const handleErrorProfile = (error: any): string => {
  const { statusCode } = handleInputErrors(error);

  const literalHandler = {
    default: 'Erro ao carregar dados',
  };

  return literalHandler[statusCode] ?? literalHandler.default;
};
