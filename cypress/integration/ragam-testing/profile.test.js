/// <reference types="cypress" />




var userdetails;

context("Profile", () => {
    before(() => {
        cy.login()
        cy.getUserdetails()
        cy.getLocalStorage('userdetails').then(data=> {userdetails=JSON.parse(data)})
        cy.visit('http://localhost:3000/profile')
    })
   
    it('Profile login', () => {
        cy.get('[data-test-id=profile-back-btn]').should("exist")
        cy.contains('RagamId').should('exist')
        cy.contains(userdetails['ragamID']).should('exist')

        cy.contains('Name').should('exist')
        console.log(userdetails['name'])

        if (userdetails['name']) {
            cy.contains(userdetails['name']).should('exist')

        }


        cy.contains('College').should('exist')
        if (userdetails['collegeName']) {
            cy.contains(userdetails['collegeName']).should('exist')

        }

        cy.contains('Phone').should('exist')
        if (userdetails['phoneNumber']) {
            cy.contains(userdetails['phoneNumber']).should('exist')

        }

        cy.contains('Edit Profile').should('exist')
        cy.contains('Edit Profile').click()
        cy.url().should('include', '/editprofile')
        cy.get('[data-test-id=back-btn]').click()

        cy.contains('Registered Events').should('exist')


        cy.log("regestered events=" + userdetails['eventDetails'].length)





        //Logout test
        /*cy.contains('Logout').should('exist')
        cy.contains('Logout').click()
        cy.contains('Logged out successfully').should('exist')*/












    })
})