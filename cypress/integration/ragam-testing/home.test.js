/// <reference types="cypress" />


context("Home", () => {
   
    it('Home-check-without login', () => {
       
        cy.visit('http://localhost:3000/')
        cy.contains("Home").should("exist")
        cy.get('[data-test-id=explore-btn]').click()
        cy.url().should('include', '/events')
        cy.contains("EVENTS").should("exist")

        cy.get('[data-test-id=back-btn]').click()
        cy.contains("Home").should("exist")
        cy.get('[data-test-id=login-btn]').should("exist")



    })
    it('Home-check-with login', () => {
        cy.login()
        cy.visit('http://localhost:3000/')
        cy.contains("Home").should("exist")
        cy.get('[data-test-id=explore-btn]').click()
        cy.url().should('include', '/events')
        cy.contains("EVENTS").should("exist")

        cy.get('[data-test-id=back-btn]').click()
        cy.contains("Home").should("exist")
        cy.get('[data-test-id=profile-btn]').should("exist")
        cy.get('[data-test-id=profile-btn]').click()
        cy.url().should('include', '/profile')
        cy.get('[data-test-id=profile-back-btn]').click()
        cy.contains("Home").should("exist")







    })
})