// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('loginCookie', () => {
  const timeToExpire = 1 * 24 * 60 * 60 * 1000;

  const date = new Date();
  date.setTime(date.getTime() + timeToExpire);
  const expires = `; expires=${date.toUTCString()}`;

  document.cookie = `app-token-valorant=valueToken${expires}; path=/`;
});

Cypress.Commands.add('loginLocalStorage', () => {
  window.localStorage.setItem('app-token-valorant', 'valueToken');
});
