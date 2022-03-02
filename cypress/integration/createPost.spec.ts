describe('<CreatePost />', () => {
  beforeEach(() => {
    cy.intercept('/postLoadFile', (req) => {
      req.reply({
        body: { filename: 'image-1234' },
      });
    }).as('sendImage');

    cy.intercept('/images/image-1234', {
      fixture: 'images/img1.webp',
    });

    cy.intercept('/post', (req) => {
      expect(req.body.title).equal('Title of post');

      expect(req.body.description).equal('Description of post');
      expect(req.body.user).equal('');
      expect(req.body.tags.moment).equal('DuranteRush');
      expect(req.body.tags.difficult).equal('Medio');
      expect(req.body.tags.ability).equal('Torreta');
      expect(req.body.tags.side).equal('Defensores');
      expect(req.body.tags.map).equal('Ascent');
      expect(req.body.tags.mapPosition).equal('Meio');
      expect(req.body.tags.agent).equal('Killjoy');

      expect(req.body.tags.agent).equal('Killjoy');
      expect(req.body.imgs[0].description).equal('Description image 1');
      expect(req.body.imgs[0].image).equal('image-1234');

      expect(req.body.imgs[1].description).equal('Description image 2');
      expect(req.body.imgs[1].image).equal('image-1234');
      req.reply({
        statusCode: 200,
      });
    });
  });

  context('Create Post', () => {
    it('should navigate to the about page', () => {
      cy.visit('/admin/post-create');

      cy.get('#title').type('Title of post');
      cy.get('#description').type('Description of post');

      cy.get('#Agente').select('Killjoy');
      cy.get('#Mapa').select('Ascent');
      cy.get('#Habilidade').select('Torreta');
      cy.get('#Posição').select('Meio');
      cy.get('#Momento').select('DuranteRush');
      cy.get('#Dificuldade').select('Medio');
      cy.get('#Lado').select('Defensores');

      cy.get('button:contains("Novo Passo")').click();
      cy.get('h1:contains("Adicionar Post")').should('be.visible').should('exist');
      cy.get(':nth-child(1) > .flex > #description').type('Description image 1');
      // @ts-ignore
      cy.get('input[type="file"]').attachFile('images/img1.webp');
      cy.wait('@sendImage');
      cy.get('button:contains("Adicionar")').click();

      cy.get('button:contains("Novo Passo")').click();
      cy.get(':nth-child(1) > .flex > #description').type('Description image 2');
      // @ts-ignore
      cy.get('input[type="file"]').attachFile('images/img2.webp');
      cy.wait('@sendImage');
      cy.get('button:contains("Adicionar")').click();

      cy.get('button:contains("Publicar Dica")').click();

      cy.get('h1:contains("Todos os Posts")').should('be.visible');
    });
  });
});
