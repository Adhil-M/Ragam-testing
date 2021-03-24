/// <reference types="cypress" />

import dayjs from "dayjs";

var events
var userdetails
var userEventDetails
var testuser
var testUserToken
var testUserDetails



context('Testing Myregistration page', () => {

    before(() => {
        cy.getEvents()
        cy.getUserdetails()
        cy.regTestUser().then(response => { testuser = response })
        cy.getLocalStorage('events').then(data => { events = JSON.parse(data) })
        cy.getLocalStorage('userdetails').then(data => { userdetails = JSON.parse(data) })

        /*function getuserEventDetails(id) {
            cy.getUserEvent(id)
            userEventDetails = window.localStorage.getItem('userEventDetails')
            console.log(userEventDetails)
            return userEventDetails;
        }*/

    })
    beforeEach(() => {
        cy.getTestUserDetails(testuser['jwt']).then(response => { testUserDetails = response })

    })
    afterEach(() => {
        cy.deleteTestUser(testUserDetails['id'])
    })
    it('Myreg', () => {
        cy.getUserdetails().then(userdetails => {
            for (var userdetail of userdetails['eventDetails']) {
                for (var event of events) {
                    if (event['id'] == userdetail['event']) {
                        console.log('called-logi-hehr')
                        cy.login()
                        cy.visit('http://localhost:3000/event/' + event['slug'])
                        cy.contains('Myregistration').click()
                        //login and back buttons
                        cy.get('[data-test-id=profile-btn]').should("exist")
                        cy.get('[data-test-id=profile-btn]').click()
                        cy.url().should('include', '/profile')
                        cy.go('back')
                        cy.get('[data-test-id=back-btn]').should('exist')
                        //eventname
                        cy.log(event)
                                    console.log(event)

                        cy.contains(event['name']).should('exist')
                        //login should not exist
                        cy.get('[data-test-id=login-btn]').should("not.exist")
                        if (event['isTeamEvent']) {
                                    console.log(event)

                            cy.contains('Team Members', { "timeout": 60000 }).should('exist')
                            console.log('called')
                            //team

                            cy.getUserEvent(userdetail['id']).then((userEventDetails) => {
                                console.log('called-after')
                                cy.log(userEventDetails['teamMembers'].length)
                                cy.log(event['minTeamSize'])
                                if (userEventDetails['teamMembers'].length < event['minTeamSize']) {
                                    cy.contains(" members. minimum limit is")
                                } else if (userEventDetails['teamMembers'].length > event['maxTeamSize']) {
                                    cy.contains(" members. minimum limit is")
                                }
                                cy.contains(userdetails['ragamID']).should('exist')
                                for (var k of userEventDetails['teamMembers']) {
                                    cy.log(userEventDetails['teamMembers'])
                                    cy.contains(k['ragamID']).should('exist')
                                }
                                //adding memeber
                                cy.contains('Add Member').click()
                                //invalid ragam id
                                cy.get('[data-test-id=add-member-inp]').type('ASADS')
                                cy.contains('Enter a Valid RagamID').should('exist')
                                cy.get('[data-test-id=add-member-inp]').clear()
                                cy.get('[data-test-id=add-member-inp]').type('AS12io')
                                cy.contains('Enter a Valid RagamID').should('exist')
                                cy.get('[data-test-id=add-member-inp]').clear()
                                cy.get('[data-test-id=add-member-inp]').type('123456')
                                cy.contains('Enter a Valid RagamID').should('exist')
                                cy.get('[data-test-id=add-member-inp]').clear()
                                //same team member
                                for (var k of userEventDetails['teamMembers']) {
                                    cy.get('[data-test-id=add-member-inp]').type(k['ragamID'])
                                    cy.contains('User is already present').should('exist')
                                    cy.get('[data-test-id=add-member-inp]').clear()
                                }
                                //no user found
                                cy.get('[data-test-id=add-member-inp]').type('qwerty')
                                cy.contains('No user found with RagamId').should('exist')
                                cy.get('[data-test-id=add-member-inp]').clear()
                                cy.get('[data-test-id=add-member-inp]').type('zasdty')
                                cy.contains('No user found with RagamId').should('exist')
                                cy.get('[data-test-id=add-member-inp]').clear()
                                //user found with...
                                cy.get('[data-test-id=add-member-inp]').type(testUserDetails['ragamID'])
                                cy.contains('user found with name ' + testUserDetails['name']).should('exist')
                                cy.contains('ADD').click()
                                cy.contains("Added teammates successfully!!").should('exist')
                                //delete team mate


                                cy.get("[data-test-id=del-btn]").each(($el, index) => {
                                    cy.get($el).click()
                                    cy.contains('OK').click()
                                    cy.contains('teammate removed successfully!!').should('exist')
                                })
                                    console.log(event)

                                //submission
                                if (event["isSubmissionEvent"]) {
                                    console.log(event)

                                    cy.log(dayjs(event["submissionStartDate"]).format("DD MMMM hh:mm a"))
                                    //startsat
                                    if (dayjs(event["submissionStartDate"]).diff(dayjs()) > 0) {
                                        cy.contains("Submission Starts at " +
                                            dayjs(event["submissionStartDate"]).format("DD MMMM hh:mm a")).should('exist')

                                    }
                                    //going on
                                    if (dayjs(event["submissionStartDate"]).diff(dayjs()) < 0 && dayjs(event["submissionEndDate"]).diff(dayjs()) > 0) {
                                        cy.contains("Submission Ends at " +
                                            dayjs(event["submissionEndDate"]).format("DD MMMM hh:mm a").should('exist'))

                                    }




                                    //ended
                                    if (dayjs(event["submissionEndDate"]).diff(dayjs()) < 0) {
                                        cy.contains("Submission has Ended!").should('exist')
                                    }
                                }









                            });
                        }
                        else {
                            cy.contains('Team Members').should('not.exist')
                        }
                    }
                }
            }
        })
    })

})