describe('<Maps />', () => {
  beforeEach(() => {
    cy.intercept('/maps', (req) =>
      req.reply({ maps: ['Ascent', 'Bind', 'Breeze', 'Fracture', 'Haven', 'Icebox', 'Split'] }),
    );

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

    cy.intercept('/agents/Ascent', (req) =>
      req.reply({
        agents: ['Viper', 'Cypher', 'Killjoy', 'Sage', 'Sova'],
      }),
    );

    cy.intercept('GET', '**/images/1633276293553-6e67c4f0-b931-438b-856f-db6d4e7f5e8a', {
      fixture: '1633276293553-6e67c4f0-b931-438b-856f-db6d4e7f5e8a',
    });
    cy.intercept('GET', '**/images/1633276257045-227ae204-eace-4ecb-8a2c-41d891d9f358', {
      fixture: '1633276257045-227ae204-eace-4ecb-8a2c-41d891d9f358',
    });
    cy.intercept('GET', '**/images/1633629560818-c444af87-6b6d-4965-b15e-f789e249a296', {
      fixture: '1633629560818-c444af87-6b6d-4965-b15e-f789e249a296',
    });
    cy.intercept('GET', '**/images/1633629626605-5a1af8c8-53a8-465f-9e27-73d1081ba295', {
      fixture: '1633629626605-5a1af8c8-53a8-465f-9e27-73d1081ba295',
    });
    cy.intercept('GET', '**/images/1633629640926-253d1fbb-346b-4257-aa4f-cd7098901512', {
      fixture: '1633629640926-253d1fbb-346b-4257-aa4f-cd7098901512',
    });
    cy.intercept('GET', '**/images/1633629660300-b1f53bb9-6660-44f3-9f13-42226705db77', {
      fixture: '1633629660300-b1f53bb9-6660-44f3-9f13-42226705db77',
    });
    cy.intercept('/images/1633629710516-758b3624-000e-4110-88f6-0cf13775a45a', {
      fixture: '1633629710516-758b3624-000e-4110-88f6-0cf13775a45a',
    });

    cy.intercept('/posts?map=Ascent&page=1&agent=Cypher&filters=', (req) =>
      req.reply({ fixture: 'maps/request.json' }),
    );
  });

  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/', { timeout: 120000 });
    cy.contains('Ascent', { timeout: 10000 });

    // Find a link with an href attribute containing "about" and click it
    cy.get('button[href="/agents?map=Ascent"]').click();

    // // The new page should contain an h1 with "About page"
    cy.contains('Escolha um Agente', { timeout: 10000 });

    cy.get('button[href="/posts?map=Ascent&agent=Cypher"]').click();

    cy.contains(/as melhores dicas de valorant/i, { timeout: 5000 });

    cy.contains('button', 'QualquerMomento');
    cy.contains('button', 'Facil');
    cy.contains('button', 'CâmeraDeVigilância');
    cy.contains('button', 'Defensores');
    cy.contains('button', 'B');
    cy.contains('button', 'Medio');
    cy.contains('button', 'JaulaCibernética');
    cy.contains('button', 'A');
    cy.contains('button', 'FioArmadilha');
    cy.contains('button', 'InicioPartida');
    cy.contains('button', 'Meio');

    // second first
    cy.contains('developer');

    cy.contains('Aquela câmera mocada do cypher', { timeout: 10000 });
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

    // second post
    cy.contains('One Way no bom A');

    cy.contains(
      '1 de 5 : Essa One Way pode e deve ser combinada com o fio armadilha, e você deve ficar na espera por alguém do time atacante cair na armadilha',
    );

    cy.contains(
      'Essa One Way te fornece uma grande vantagem, em especial quando combinada com os fios armadilhas',
    );

    cy.contains('#Ascent');
    cy.contains('#Cypher');
    cy.contains('#JaulaCibernética');
    cy.contains('#QualquerMomento');
    cy.contains('#Medio');
    cy.contains('#Defensores #A');

    cy.contains('button', 'Testado');
    cy.contains('button', 'Salvar');
    cy.contains('button', 'Sugerir');

    // footer
    cy.contains('Contribua');
    cy.get('a').contains('Entre em contato');
    cy.get('a').contains('Backend em Node.js github');
    cy.get('a').contains('Frontend com React.Js github');

    cy.contains('Projeto');
    cy.contains(
      /Esse é um projeto feito por fãs do Valorant, com intenção de aumentar a qualidade das gameplays do nosso cenário./i,
    );

    cy.contains('Sobre');
    cy.contains(
      /Vavatips foi criado seguindo a política do“Lenga-Lenga Jurídico”da Riot Games com recursos pertencentes à Riot Games. A Riot Games não endossa ou patrocina este projeto./i,
    );

    // next page image
    cy.get('button[data-testid="prev-btn"]').first().click();

    cy.contains(
      '2 de 2 : Não subestime essa câmera, o time inimigo poderá demorar para perceber essa câmera',
    );

    // open suggestion
    cy.get('button[type=button]').contains('Sugerir').first().click();

    // make sugestion
    cy.contains('fazer sugestão');

    cy.contains('Dica');
    // cy.get('input[value="Aquela câmera mocada do cypher"]')
    cy.get('input[placeholder="Email para contato (Opcional)"]').type('myEmail@gmail.com');

    // Descrição
    cy.get('textarea[id="description"]').type('my description');

    cy.contains('button', 'Cancelar').should('be.visible');
    cy.contains('button', 'Adicionar').should('be.visible').should('be.enabled');

    cy.get('button:contains("Adicionar")').click();

    cy.contains('Sugestão enviada com sucesso, muito obrigado!', { timeout: 15000 });

    // close notify
    cy.get('button[aria-label="close"]').click();
  });
});
