# Contribuição

Ao contribuir para este repositório, primeiro discuta a mudança que deseja fazer por meio de uma Issue,
e-mail ou qualquer outro método com os proprietários deste repositório antes de fazer uma alteração.

Observe que temos um [código de conduta](CODE_OF_CONDUCT.md), siga-o em todas as suas interações com o projeto.

# Processo de Pull Request

1. Preencha por completo o template de PULL_REQUEST

## Como contribuir na prática

1. Faça um Fork do projeto.
2. Clone o projeto na sua máquina

```shell
git clone <your-repository-forked>
```

3. Acesse a Branch de desenvolvimento

```shell
git checkout -b develop origin/develop
```

4. Atualize a branch de desenvolvimento sempre

```shell
git pull
```

5. Crie uma nova branch baseada na develop, seguindo uma das opções abaixo:

```shell
# Nova Branch de feature
# Substitua o 'dark-theme-button' pelo nome da feature
git checkout -b feature/dark-theme-button

# Nova Branch de correção de bug
# Substitua 'count-posts-pagination' pelo nome do bug
git checkout -b bugfix/count-posts-pagination

# Nova Branch de refatoração/adição de conteudo/ atualização de conteudo
# Substitua 'update-folders' pelo nome da refatoração
git checkout -b refactoring/update-folders

# Nova Branch Apenas de documentação
# Substitua 'contributing' pelo nome da documentação
git checkout -b doc/adjust-contributing

# Branch apenas para contribuidores diretos
git checkout -b hotfix/error-login
```

6. Crie as funcionalidades/correções
7. Adicione os testes
8. Adicione e faça um commit nos arquivos modificados, exemplo:

```shell
git add ./src/components/navbar.tsx ./src/store/

git commit -m "Adicionado um botão de troca de cores"
```

9. Faça um push, substituindo o 'feature/name-branch' pelo nome da branch que você criou

```shell
git push -u origin feature/name-branch
```

10. Abra o seu github e crie um pull request
11. Aponte o pull request para mesclar na branch 'develop' deste projeto (gabrielogregorio/project)
12. Crie o pull request
13. Acompanhe a discussão, e tudo dando certo, sua contribuição será mesclada na branch develop do projeto
