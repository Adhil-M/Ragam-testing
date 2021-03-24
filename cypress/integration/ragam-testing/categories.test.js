/// <reference types="cypress" />
var i;
var categories 

context("Categories page", () => {
    before(() => {
        cy.getCategories()
        cy.getLocalStorage('categories').then(data=> {categories=JSON.parse(data)})
        
        console.log(categories)


    })
    it('categories-check-without login', () => {
        cy.visit('http://localhost:3000/events')
        cy.contains("EVENTS").should("exist")
        cy.get('[data-test-id=login-btn]').should("exist")
        cy.get('[data-test-id=login-btn]').click()
        cy.url().should('include', '/login')
        cy.go('back')
        cy.get('[data-test-id=back-btn]').should('exist')
        for (var j of categories) {
            // console.log(i)
            cy.log(j["name"])
            cy.contains(j["name"]).should("exist")
            cy.contains(j["name"]).click()
            cy.url().should("include", j["slug"])
            cy.contains(j["name"]).should("exist")
            cy.get('[data-test-id=back-btn]').click()
        }
        cy.url().should('include', '/events')
        cy.contains("EVENTS").should("exist")
    })
    it('categories-check after login', () => {
        cy.login()
        cy.visit('http://localhost:3000/events')
        cy.contains("EVENTS").should("exist")
        cy.get('[data-test-id=profile-btn]').should("exist")
        cy.get('[data-test-id=profile-btn]').click()
        cy.url().should('include', '/profile')
        cy.get('[data-test-id=profile-back-btn]').click()
        for (var j of categories) {
            // console.log(i)
            cy.log(j["name"])
            cy.contains(j["name"]).should("exist")
            cy.contains(j["name"]).click()
            cy.url().should("include", j["slug"])
            cy.contains(j["name"]).should("exist")
            cy.get('[data-test-id=back-btn]').click()

        }
        cy.url().should('include', '/events')
        cy.contains("EVENTS").should("exist")
    })
})