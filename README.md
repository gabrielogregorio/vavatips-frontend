<div align="center">
  <img height="30" alt="ReactJs" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img height="30" alt="Express" src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge">
  <img height="30" alt="Typescript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
  <img height="30" alt="css3" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img height="30" alt="html5" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
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
  <a href="https://vavatips.herokuapp.com/"><strong>Access the blog</strong></a>
  <br>
  <br>
</p>

## Introduction

This project was developed using ReactJs, Typescript and React Testing Library. Backend is available at [vavatips-backend](https://github.com/gabrielogregorio/vavatips-backend)

## Security flaws

Unfortunately the React developers are not updating the development libraries, and in particular the react-scripts library which has some serious problems, so when running the "yarn audit" command we will see at least 13 security holes. To see which failures reach end users, we have to use the command below.

```shell
yarn audit --groups dependencies
```

We currently have no security holes in this requirement. Regarding React development packages, we don't have many options.

## Run Project

1. Fully start the backend, available in the [vavatips-backend](<(https://github.com/gabrielogregorio/vavatips-backend)>) repository.
2. With the backend working, create an .env file, based on the .env.example file.


## Contributing with project
Read [Contributing.md](CONTRIBUTING.md)

## Available scripts

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn start`

Run in production mode, after run `yarn build`

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
