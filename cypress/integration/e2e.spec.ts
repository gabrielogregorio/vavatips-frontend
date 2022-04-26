describe('<E2e />', () => {
  beforeEach(() => {
    cy.task('stopServer');
    cy.task('startServer');

    cy.intercept('/suggestion', (req) => {
      if (
        req.body.description === 'my description' &&
        req.body.email === 'myEmail@gmail.com' &&
        req.body.idPost === '6159d1db1775570b9c406147'
      ) {
        return req.reply({
          email: 'myEmail@gmail.com',
          description: 'my description',
          _id: '61f72cb5bb0a62db4131bc36',
          createdAt: '2022-01-31T00:26:29.293Z',
          updatedAt: '2022-01-31T00:26:29.293Z',
          __v: 0,
        });
      }
      return req.reply({ error: 'error' });
    });
  });

  it.only('should e2e test', () => {
    cy.visit('/');
    cy.contains('Ascent');

    cy.get('button[href="/agents/Ascent"]').click();
    cy.contains('Escolha um Agente');

    cy.get('button[href="/posts/Ascent/Cypher"]').click();

    cy.contains(/as melhores dicas de valorant/i);

    cy.contains('button', 'QualquerMomento');
    cy.contains('button', 'Facil');
    cy.contains('button', 'CâmeraDeVigilância');
    cy.contains('button', 'Defensores');
    cy.contains('button', 'B');
    cy.contains('button', 'Medio');
    cy.contains('button', 'JaulaCibernética');
    cy.contains('button', 'A');

    cy.contains('developer');

    cy.contains('Aquela câmera mocada do cypher');
    cy.contains('1 de 2 : Basta posicionar nessa região');

    cy.contains('Aquela câmera mocada do cypher');

    cy.contains('#Ascent');
    cy.contains('#Cypher');
    cy.contains('#CâmeraDeVigilância');
    cy.contains('#QualquerMomento');
    cy.contains('#Facil');
    cy.contains('#Defensores #B');

    cy.contains('button', 'Testado');
    cy.contains('button', 'Salvar');
    cy.contains('button', 'Sugerir');

    cy.contains('One Way no bom A');

    cy.contains(
      '1 de 5 : Essa One Way pode e deve ser combinada com o fio armadilha, e você deve ficar na espera por alguém do time atacante cair na armadilha',
    );

    cy.contains('Essa One Way te fornece uma grande vantagem, em especial quando combinada com os fios armadilhas');

    cy.contains('#Ascent');
    cy.contains('#Cypher');
    cy.contains('#JaulaCibernética');
    cy.contains('#QualquerMomento');
    cy.contains('#Medio');
    cy.contains('#Defensores #A');

    cy.contains('button', 'Testado');
    cy.contains('button', 'Salvar');
    cy.contains('button', 'Sugerir');

    cy.contains('Contribua');
    cy.get('a').contains('Solicitar agentes e mapas');
    cy.get('a').contains('Backend em Node.js github');
    cy.get('a').contains('Frontend com React.Js github');

    cy.contains('Projeto');
    cy.contains(
      /Esse é um projeto feito por fãs do Valorant, com intenção de aumentar a qualidade das gameplays do nosso cenário./i,
    );

    cy.contains('Sobre');
    cy.contains(/Valorant tips foi criado seguindo a política /i);

    cy.get('button[data-testid="prev-btn"]').first().click();

    cy.contains('2 de 2 : Não subestime essa câmera, o time inimigo poderá demorar para perceber essa câmera');

    cy.get('button[type=button]').contains('Sugerir').first().click();

    cy.contains('Fazer sugestão');

    cy.contains('Dica');
    cy.get('input[placeholder="Digite seu e-mail"]').type('myEmail@gmail.com');

    cy.get('textarea[id="description"]').type('my description');

    cy.contains('button', 'Cancelar').should('be.visible');
    cy.contains('button', 'Adicionar').should('be.visible').should('be.enabled');

    cy.get('button:contains("Adicionar")').click();

    cy.contains('Sugestão enviada com sucesso, muito obrigado!');

    cy.get('button[aria-label="close"]').click();
  });

  it('slould save and tested posts', () => {
    cy.get('button:contains("Salvar")').eq(1).click();
    cy.get('button:contains("Testado")').first().click();

    cy.get('a:contains("salvos")').click();
    cy.get('h1:contains("Posts Salvos")').should('be.visible');

    cy.get('h3:contains("One Way no bom A")').should('be.visible');

    cy.get('a:contains("testados")').click();
    cy.get('h1:contains("Posts para testar")').should('be.visible');

    cy.get('h3:contains("Aquela câmera mocada do cypher")').should('be.visible');
  });
});
