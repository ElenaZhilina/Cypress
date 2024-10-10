describe('Tests for library', () => {
  beforeEach( () => {
    cy.visit('/')
  })

  it('Page view test', () => {
    cy.get('.ml-2').should('be.visible').and('contain', 'Books list');
  })

  it("Login test", () => {
    cy.login("bropet@mail.ru", "123")
    cy.contains("Добро пожаловать bropet@mail.ru").should("be.visible", true)
  })

  it("Empty password test", () => {
    cy.login("bropet@mail.ru", null)
    cy.get('#pass').then((elements) => {
      expect(elements[0].checkValidity()).to.be.false
    })   
  })

  it("Empty mail test", () => {
    cy.login(null, "123")
    cy.get('#mail').then((elements) => {
      expect(elements[0].checkValidity()).to.be.false
    })
  })



  context('New tests', () => {

    beforeEach(() => {
      cy.login("bropet@mail.ru", "123");
      cy.contains("Add new").click();
      cy.get("#title").type(title);
      cy.get("#authors").type(author);
      cy.contains("Submit").click();

    })  

    let title = "Book-1";
    let author = "1";


    it("Add book test", () => {
      cy.get('.card-title.h5').contains(title).should('be.visible');
    })

    it("Добавление в избранное", () => {
      cy.get('.h-100.card').filter(`:contains('${title}')`).contains('Add to favorite').click();
      cy.contains("Favorites").click(); // Переход в избранное
      cy.get('.h-100.card').contains(title).parents('.h-100.card').contains('Delete from favorite').click();
      cy.contains("#title").should('not.exist');
    })

    it('View book details test', () => {
      cy.get('.h-100.card').contains(title).click(); // Клик на книгу
      cy.contains(title).should('be.visible');
      cy.contains(author).should('be.visible');
      cy.contains("Dowload book").should('be.visible');
    });
  })
})
