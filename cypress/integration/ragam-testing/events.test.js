/// <reference types="cypress" />

var categories

context("Events page before login", () => {
    before(() => {
        cy.getCategories()
        cy.getLocalStorage('categories').then(data => { categories = JSON.parse(data) })
        console.log(categories)

    })
    it('each-categories-check-without login', () => {
        console.log(categories)

        for (var j of categories) {

            cy.visit('http://localhost:3000/category/' + j['slug'])
            //login and back buttons
            cy.get('[data-test-id=login-btn]').should("exist")
            cy.get('[data-test-id=login-btn]').click()
            cy.url().should('include', '/login')
            cy.go('back')
            cy.get('[data-test-id=back-btn]').should('exist')
            //name exist?
            cy.contains(j['name']).should('exist')
            //search
            var searchStrings = ['Rajan', 'competition', 'memmorial', 'Music', 'events']
            var found = {
                'Rajan': [],
                'competition': [],
                'memmorial': [],
                'Music': [],
                'events': []
            }
            for (var i of searchStrings) {
                console.log(j['events'])
                console.log(i)
                for (var k of j['events']) {
                    if (k['name'].toLowerCase().includes(i.toLowerCase())) {
                        console.log(k['name'])
                        found[i].push(k['name'])
                    }
                }
                console.log(found[i])

            }
            console.log(found)
            for (var i of searchStrings) {
                cy.get('[data-test-id=search-inp]').type(i)
                for (var j of found[i])
                    cy.contains(j).should('exist')
                cy.get('[data-test-id=search-inp]').clear()
            }
            //toggle
            cy.get('[data-test-id=toggle-btn]').click()
            cy.contains('Registration has Ended').should('not.exist')
        }
    })
    it('each-categories-check-with login', () => {
        console.log(categories)
        cy.login()

        for (var j of categories) {

            cy.visit('http://localhost:3000/category/' + j['slug'])
            //login and back buttons
            cy.get('[data-test-id=profile-btn]').should("exist")
            cy.get('[data-test-id=profile-btn]').click()
            cy.url().should('include', '/profile')
            cy.go('back')
            cy.get('[data-test-id=back-btn]').should('exist')
            //name exist?
            cy.contains(j['name']).should('exist')
            //search
            var searchStrings = ['Rajan', 'competition', 'memmorial', 'Music', 'events']
            var found = {
                'Rajan': [],
                'competition': [],
                'memmorial': [],
                'Music': [],
                'events': []
            }
            for (var i of searchStrings) {
                console.log(j['events'])
                console.log(i)
                for (var k of j['events']) {
                    if (k['name'].toLowerCase().includes(i.toLowerCase())) {
                        console.log(k['name'])
                        found[i].push(k['name'])
                    }
                }
                console.log(found[i])

            }
            console.log(found)
            for (var i of searchStrings) {
                cy.get('[data-test-id=search-inp]').type(i)
                for (var j of found[i])
                    cy.contains(j).should('exist')
                cy.get('[data-test-id=search-inp]').clear()
            }
            //toggle
            cy.get('[data-test-id=toggle-btn]').click()
            cy.contains('Registration has Ended').should('not.exist')
        }
    })
    
})