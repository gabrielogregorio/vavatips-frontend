<div align="center">

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)
![cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)

</div>

<div align="center">

![statements](./coverage/badge-statements.svg)
![branchs](./coverage/badge-branches.svg)
![functions](./coverage/badge-functions.svg)
![lines](./coverage/badge-lines.svg)

</div>

<div align="center">

![GitHub estrelas](https://img.shields.io/github/stars/gabrielogregorio/vavatips-frontend)
![GitHub last commit](https://img.shields.io/github/last-commit/gabrielogregorio/vavatips-frontend?style=flat-square)
![GitHub contributors](https://img.shields.io/github/contributors/gabrielogregorio/vavatips-frontend)
![GitHub language count](https://img.shields.io/github/languages/count/gabrielogregorio/vavatips-frontend)
![GitHub repo size](https://img.shields.io/github/repo-size/gabrielogregorio/vavatips-frontend)

</div>

<h2 align="center">Valorant's tips</h2>

<p align="center">
  a Valorant tips blog<br/>
  <a href="https://valorant-tips.vercel.app/"><strong>Access the blog</strong></a>
  <br>
  <br>
</p>

## Introduction

This project was developed using NextJs, Typescript and React Testing Library. Backend is available at [vavatips-backend](https://github.com/gabrielogregorio/vavatips-backend)

## Run Project

1. Fully start the backend, available in the [vavatips-backend](<(https://github.com/gabrielogregorio/vavatips-backend)>) repository.
2. With the backend working, create an .env file, based on the .env.example file.

## Contributing with project

Read [Contributing.md](CONTRIBUTING.md)

## Available scripts

### Run in develop mode

```bash
yarn dev
```

Runs the app in the development mode using react testing library.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Run in production mode

```bash
yarn build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

```bash
yarn start`
```

Run in production mode, after run `yarn build`

### Tests with react testing library and cypress(e2e)

```bash
yarn test
yarn e2e
```

### Tests in watch mode and coverage

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```bash
yarn test:watch-all
yarn test:watch-all:coverage
```

## Vscode extensions for this project

1. Eslint (Microsoft)
2. Prettier - Code formatter (Prettier)
3. Prettier Eslint (Rebecca Vest)
4. Stylelint (Stylelint)
5. Gitignore (CodeZombie)
6. EditorConfig for VS code (EditorConfig)
7. Tailwind CSS IntelliSense (Tailwind Labs)
8. TODO Highlight v2 (Jonathan Clark)

## Check tests, eslint and typescript

```bash
yarn check-all
```

## Prettier fix all

```bash
yarn prettier --write .
```

## Check libs not used

```bash
npx depcheck
```

## Uprade packages

```bash
yarn upgrade-interactive --latest
```
