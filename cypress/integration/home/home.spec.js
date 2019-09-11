

describe("Home", () => {

    beforeEach(() =>{

        cy.server();
        cy.route('/');
        cy.visit('/');
        
    });

    it('', () => {

    });
    

})