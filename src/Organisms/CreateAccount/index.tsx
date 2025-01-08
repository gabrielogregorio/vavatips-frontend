'use client';
import { CreateAccountFormInterface } from './validationSchema';
import { useCreateAccountFormController } from './useCreateAccountFormController';
import { TextFieldForm } from '../../Molecules/TextFieldForm';
import { Button, ButtonVariantEnum } from '../../Molecules/Button';
import { Text } from '../../Atoms/Text';
import { ErrorMessage } from '../../Molecules/ErrorMessage';
import { SuccessMessage } from '../../Molecules/Success';
import { useHandleRouter } from '../../libs/useHandleRouter';
import { RouteScreensEnum } from '../../@types/routeScreenEnum';

export default function CreateAccount() {
  const { control, onSubmit, isLoading, errorMessage, success } = useCreateAccountFormController();
  const { push } = useHandleRouter();

  return (
    <form
      className="animate-fadeIn300"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(event);
      }}>
      <div className="flex flex-col gap-xl">
        <TextFieldForm<CreateAccountFormInterface>
          control={control}
          id="name"
          name="name"
          label="Nome"
          placeholder="Seu nome"
          helpText="Digite o nome que você quer que apareça nos seus posts"
        />

        <TextFieldForm<CreateAccountFormInterface>
          control={control}
          id="username"
          name="username"
          label="USUÁRIO"
          placeholder="Seu usuário"
          helpText="Digite o usuário  para fazer login no site, isso DEVE SER SEGREDO"
        />

        <TextFieldForm<CreateAccountFormInterface>
          type="password"
          control={control}
          id="password"
          name="password"
          autoComplete="password"
          label="SENHA"
          placeholder="******"
          helpText=""
        />

        <TextFieldForm<CreateAccountFormInterface>
          type="password"
          control={control}
          id="confirmPassword"
          name="confirmPassword"
          autoComplete="password"
          label="CONFIRME SUA SENHA"
          placeholder="******"
          helpText=""
        />

        <TextFieldForm<CreateAccountFormInterface>
          type="password"
          control={control}
          id="code"
          name="code"
          label="CODIGO DE USO UNICO"
          placeholder="******"
          helpText="Esse é o código secreto que você deve ter recebido"
        />
      </div>

      <div className="flex flex-col gap-xl">
        <Text className="text-center text-content-fg">Já tenho conta?</Text>

        <Button onClick={() => push(RouteScreensEnum.login)} variant={ButtonVariantEnum.Secondary}>
          FAZER LOGIN
        </Button>

        {errorMessage ? <ErrorMessage text={errorMessage} /> : undefined}

        {success ? <SuccessMessage text={success} /> : undefined}

        <Button type="submit" variant={ButtonVariantEnum.Primary} disabled={isLoading}>
          {isLoading ? 'CRIANDO...' : 'CRIAR CONTA'}
        </Button>
      </div>
    </form>
  );
}
