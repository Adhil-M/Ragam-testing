/// <reference types="cypress" />


context("Login", () => {
    
    it('Login-check',()=>{
        cy.visit('http://localhost:3000/')
        cy.get('[data-test-id=login-btn]').click()
        cy.contains("Login").should("exist")
        cy.contains("Not").should("not.exist")
        cy.get('[data-test-id=google-btn]').should("exist")
        cy.get('[data-test-id=google-btn]').should('have.attr','href','http://api.staging.ragam.live/connect/google')
    })
    it.only('google-login',()=>{
        cy.visit('http://api.staging.ragam.live/connect/google')
        cy.get("[type=email]").type('adhilfake123@gmail.com')
        cy.contains("Next").click()
        cy.url({timeout:60000}).should("include",'signin/v2/challenge')
      
        cy.contains("Welcome",{timeout:60000}).should("exist")
        
        cy.get("input[name=password]",{timeout:120000}).type("asd")
        cy.contains("Next").click()
    })
})