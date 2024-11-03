// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-file-upload';
import '@cypress/code-coverage/support';
// Alternatively you can use CommonJS syntax:
// require('./commands')



/**
 * Allows you to pause the execution of an interception, and can be released after certain validations have been carried out, such as if a load has occurred. Example below
 *
 *```ts
 *  const control = interceptWithPause({
 *   method: 'PUT',
 *   alias: 'exampleAliasName',
 *   url: '/v1/requestApi',
 *   sendResponse: (req) => {
 *     expect(req.body).to.deep.equal({});
 *      return { statusCode: 204 };
 *    }
 *  });
 *
 *  cy.get('button:contains("Redefinir")').click(); // trigger interceptWithPause
 *
 *  cy.get('button:contains("Redefinindo...")') // validate loading, before returning the response
 *   .should('be.visible')
 *
 *  control.continue(); // continue run
 *
 *  cy.wait('@exampleAliasName'); // wait for the request to complete completely
 * ```
 */
export const interceptWithPause = ({
  method,
  url,
  alias,
  sendResponse
}: {
  method: Method;
  alias: string;
  url: RouteMatcher;
  sendResponse: (req: CyHttpMessages.IncomingHttpRequest<any, any>) => StaticResponse | HttpResponseInterceptor<any>;
}) => {
  let finishRequest;

  const trigger = new Promise((resolve) => {
    finishRequest = resolve;
  });

  cy.intercept(method, url, (req) =>
    trigger.then(() => {
      req.reply(sendResponse(req));
    })
  ).as(alias);

  return { continue: () => cy.then(() => finishRequest()) };
};



const formatJson = (obj) => JSON.stringify(obj, null, 2).replace(/,$/gm, '').split('\n');

export const expectDeepEqual = (input1, input2) => {
  const formattedObject1 = formatJson(input1);
  const formattedObject2 = formatJson(input2);

  const differencesInObj1 = [];
  const remainingInObj2 = [...formattedObject2];

  for (let index = 0; index < formattedObject1.length; index += 1) {
    const lineA = formattedObject1[index];
    const foundElement = remainingInObj2.findIndex((itemB) => itemB === lineA);
    if (foundElement !== -1) {
      remainingInObj2.splice(foundElement, 1);
    } else {
      differencesInObj1.push(lineA);
    }
  }

  if (differencesInObj1.length === 0 && remainingInObj2.length === 0) {
    expect(input1).to.deep.equal(input2);
    return '';
  }

  const resto = formattedObject1.map((item) => (differencesInObj1.includes(item) ? `- ${item}` : `  ${item}`));
  const restoB = formattedObject2.map((item) => (remainingInObj2.includes(item) ? `+ ${item}` : `  ${item}`));

  const message = `diff first object, missing props (-)
${resto.join('\n')}

diff second object (+)
${restoB.join('\n')}
`;

  console.error(message);

  Cypress.log({
    name: 'Erro on compare object'
  });

  message.split('\n').forEach((messsageItem) => {
    Cypress.log({
      message: messsageItem
    });
  });

  Cypress.log({
    name: 'view objects',
    consoleProps: () => ({
      object1: input1,
      object2: input2
    })
  });

  expect(input1).to.deep.equal(input2);
};
