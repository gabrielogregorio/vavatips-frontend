export {};

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
      req.reply({
        posts: [
          {
            id: '6159d1db1775570b9c406147',
            title: 'Aquela câmera mocada do cypher',
            description: 'Aquela câmera mocada do cypher',
            user: {
              id: '61a3ae838fe6df463e7bc1cf',
              username: 'developer',
            },
            tags: {
              moment: 'QualquerMomento',
              difficult: 'Facil',
              ability: 'CâmeraDeVigilância',
              side: 'Defensores',
              map: 'Ascent',
              mapPosition: 'B',
              agent: 'Cypher',
            },
            imgs: [
              {
                id: '7eff28da-93b5-4386-a7fb-6a252dd57407',
                description: 'Basta posicionar nessa região',
                image: '1633276293553-6e67c4f0-b931-438b-856f-db6d4e7f5e8a',
              },
              {
                id: 'c0919e95-15bd-4984-8059-60c56583bf2f',
                description:
                  'Não subestime essa câmera, o time inimigo poderá demorar para perceber essa câmera',
                image: '1633276257045-227ae204-eace-4ecb-8a2c-41d891d9f358',
              },
            ],
          },
          {
            id: '615f3653d5dfc1f8ad206f4f',
            title: 'One Way no bom A',
            description:
              'Essa One Way te fornece uma grande vantagem, em especial quando combinada com os fios armadilhas',
            user: {
              id: '61a3ae838fe6df463e7bc1cf',
              username: 'developer',
            },
            tags: {
              moment: 'QualquerMomento',
              difficult: 'Medio',
              ability: 'JaulaCibernética',
              side: 'Defensores',
              map: 'Ascent',
              mapPosition: 'A',
              agent: 'Cypher',
            },
            imgs: [
              {
                id: '8233f2ec-f6df-45be-9358-d57974c8594b',
                description:
                  'Essa One Way pode e deve ser combinada com o fio armadilha, e você deve ficar na espera por alguém do time atacante cair na armadilha',
                image: '1633629560818-c444af87-6b6d-4965-b15e-f789e249a296',
              },
              {
                id: '9700e90d-ed03-4d23-9b4d-92b176b065a8',
                description: 'Encoste nesse cantinho',
                image: '1633629626605-5a1af8c8-53a8-465f-9e27-73d1081ba295',
              },
              {
                id: '24d3eb5f-3d14-4d32-9fd2-a6767b9fd263',
                description: 'Olhe para o céu',
                image: '1633629640926-253d1fbb-346b-4257-aa4f-cd7098901512',
              },
              {
                id: 'c6dfafdf-d49a-4b72-81eb-1b304da1b68f',
                description:
                  'Encontre essa chaminé da casa, e posicione a mira um pouco mais para a direita e para cima (use a marshal e depois vende ela para pegar outra arma)',
                image: '1633629660300-b1f53bb9-6660-44f3-9f13-42226705db77',
              },
              {
                id: '8c5baf19-801f-4847-bdbb-b2a6c26010a7',
                description: 'Jogue a jaula cibernética',
                image: '1633629710516-758b3624-000e-4110-88f6-0cf13775a45a',
              },
            ],
          },
        ],
        count: 1,
        tags: [
          'QualquerMomento',
          'Facil',
          'CâmeraDeVigilância',
          'Defensores',
          'B',
          'Medio',
          'JaulaCibernética',
          'A',
          'FioArmadilha',
          'InicioPartida',
          'Meio',
        ],
      }),
    );
  });

  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/');

    // Find a link with an href attribute containing "about" and click it
    cy.get('button[href="/agents?map=Ascent"]').click();

    // // The new page should contain an h1 with "About page"
    cy.contains('Escolha um Agente');

    cy.get('button[href="/posts?map=Ascent&agent=Cypher"]').click();

    cy.contains(/as melhores dicas de valorant/i, { timeout: 3000 });

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

    cy.contains('Aquela câmera mocada do cypher', { timeout: 3000 });
    cy.contains('1 de 2 : Basta posicionar nessa região');

    cy.contains('Aquela câmera mocada do cypher');

    cy.contains('#Ascent');
    cy.contains('#Cypher');
    cy.contains('#CâmeraDeVigilância');
    cy.contains('#QualquerMomento');
    cy.contains('#Facil');
    cy.contains('#Defensores #B');

    cy.contains('button', 'Testar');
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

    cy.contains('button', 'Testar');
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

    cy.contains('button', 'Cancelar');
    cy.contains('button', 'Adicionar');

    cy.get('button').contains('Adicionar').click();

    cy.contains('Sugestão enviado com sucesso, muito obrigado!');

    // close notify
    cy.get('button[aria-label="close"]').click();
  });
});
