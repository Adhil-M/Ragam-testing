/// <reference types="cypress" />




    var userdetails;

    context('Test Edit profile page(logged in)', () => {
        before(() => {
            cy.login()
            cy.getUserdetails()
            cy.getLocalStorage('userdetails').then(data=> {userdetails=JSON.parse(data)})
            console.log(userdetails)
            cy.visit('http://localhost:3000/editprofile')
        })
        it('check elements do exist', () => {
            //profile button
            cy.get('[data-test-id=profile-btn]').should("exist")
            cy.get('[data-test-id=profile-btn]').click()
            cy.url().should('include', '/profile')
            cy.contains('Edit Profile').click()
            //back-button
            cy.get('[data-test-id=back-btn]').should('exist')

            //heading
            cy.contains('Edit User Profile').should('exist')

            //ragamid
            cy.contains('RagamId').should('exist')
            cy.contains(userdetails['ragamID']).should('exist')
            //labels
            cy.contains('RagamId').should('exist')
            cy.contains('Name').should('exist')
            cy.contains('College').should('exist')
            cy.contains('Phone').should('exist')
            if (userdetails['name'] == null) {

                //empty submit
                cy.contains('Submit').click()
                cy.contains('Enter a valid Name').should('exist')
                //only name
                cy.get('[data-test-id=name-inp]').type('adhil')
                cy.contains('Submit').click()
                cy.contains('Enter a valid College Name').should('exist')
                //only college-name
                cy.get('[data-test-id=name-inp]').clear()
                cy.get('[data-test-id=college-inp]').type('nitc')
                cy.contains('Submit').click()
                cy.contains('Enter a valid Name').should('exist')
                //only number
                cy.get('[data-test-id=college-inp]').clear()
                cy.get('[data-test-id=phone-inp]').type('9786543215')
                cy.contains('Submit').click()
                cy.contains('Enter a valid Name').should('exist')
                //without number
                cy.get('[data-test-id=phone-inp]').clear()
                cy.get('[data-test-id=name-inp]').type('adhil')
                cy.get('[data-test-id=college-inp]').type('nitc')
                cy.contains('Submit').click()
                cy.contains('Enter a Valid 10 digit phone number').should('exist')
                //invalid number
                cy.get('[data-test-id=name-inp]').clear()
                cy.get('[data-test-id=college-inp]').clear()
                cy.get('[data-test-id=phone-inp]').clear()
                cy.get('[data-test-id=name-inp]').type('adhil')
                cy.get('[data-test-id=college-inp]').type('nitc')
                cy.get('[data-test-id=phone-inp]').type('123456')
                cy.contains('Submit').click()
                cy.contains('Enter a Valid 10 digit phone number').should('exist')
                //valid data
                cy.get('[data-test-id=name-inp]').clear()
                cy.get('[data-test-id=college-inp]').clear()
                cy.get('[data-test-id=phone-inp]').clear()
                cy.get('[data-test-id=name-inp]').type('adhil')
                cy.get('[data-test-id=college-inp]').type('nitc')
                cy.get('[data-test-id=phone-inp]').type('1234567891')
                cy.contains('Submit').click()
                cy.contains('Profile Updated Successfully').should('exist')
            }
            else {
                //check for existing value
                cy.get('[data-test-id=name-inp]').should('have.prop', 'defaultValue', userdetails['name'])
                cy.get('[data-test-id=college-inp]').should('have.prop', 'defaultValue', userdetails['collegeName'])
                cy.get('[data-test-id=phone-inp]').should('have.prop', 'defaultValue', userdetails['phoneNumber'])
                cy.get('[data-test-id=name-inp]').clear()
                cy.get('[data-test-id=college-inp]').clear()
                cy.get('[data-test-id=phone-inp]').clear()
                //empty submit
                cy.contains('Submit').click()
                cy.contains('Enter a valid Name').should('exist')
                //only name
                cy.get('[data-test-id=name-inp]').type('adhil')
                cy.contains('Submit').click()
                cy.contains('Enter a valid College Name').should('exist')
                //only college-name
                cy.get('[data-test-id=name-inp]').clear()
                cy.get('[data-test-id=college-inp]').type('nitc')
                cy.contains('Submit').click()
                cy.contains('Enter a valid Name').should('exist')
                //only number
                cy.get('[data-test-id=college-inp]').clear()
                cy.get('[data-test-id=phone-inp]').type('9786543215')
                cy.contains('Submit').click()
                cy.contains('Enter a valid Name').should('exist')
                //without number
                cy.get('[data-test-id=phone-inp]').clear()
                cy.get('[data-test-id=name-inp]').type('adhil')
                cy.get('[data-test-id=college-inp]').type('nitc')
                cy.contains('Submit').click()
                cy.contains('Enter a Valid 10 digit phone number').should('exist')
                //invalid number
                cy.get('[data-test-id=name-inp]').clear()
                cy.get('[data-test-id=college-inp]').clear()
                cy.get('[data-test-id=phone-inp]').clear()
                cy.get('[data-test-id=name-inp]').type('adhil')
                cy.get('[data-test-id=college-inp]').type('nitc')
                cy.get('[data-test-id=phone-inp]').type('123456')
                cy.contains('Submit').click()
                cy.contains('Enter a Valid 10 digit phone number').should('exist')
                //valid data
                cy.get('[data-test-id=name-inp]').clear()
                cy.get('[data-test-id=college-inp]').clear()
                cy.get('[data-test-id=phone-inp]').clear()
                cy.get('[data-test-id=name-inp]').type('adhil')
                cy.get('[data-test-id=college-inp]').type('nitc')
                cy.get('[data-test-id=phone-inp]').type('1234567891')
                cy.contains('Submit').click()
                cy.contains('Profile Updated Successfully').should('exist')
            }





        })











    })