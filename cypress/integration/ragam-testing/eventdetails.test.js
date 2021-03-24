/// <reference types="cypress" />
import dayjs from "dayjs";

var events
var userdetails
context('Testing EventDetailsPage', () => {
    before(() => {
        cy.getEvents()
        cy.getUserdetails()
        cy.getLocalStorage('events').then(data => { events = JSON.parse(data) })
        cy.getLocalStorage('userdetails').then(data => { userdetails = JSON.parse(data) })

    })

    it('Check Events-page without login', () => {


        for (var i of events) {
            console.log(i)
            cy.visit('http://localhost:3000/event/' + i['slug'])
            //login and back buttons
            cy.get('[data-test-id=login-btn]').should("exist")
            cy.get('[data-test-id=login-btn]').click()
            cy.url().should('include', '/login')
            cy.go('back')
            cy.get('[data-test-id=back-btn]').should('exist')
            //eventname
            cy.contains(i['name']).should('exist')
            //desc-check
            cy.contains('Description').click()
            if (i['descriprion']) {
                var r = i['descriprion'].replace(/\n/g, '');
                cy.get('div[data-test-id=description-card]').should('contain.text', r)
            }
            //rules-check
            cy.contains('Rules').click()
            if (i['rules']) {
                var r = i['rules'].replace(/\n/g, '');
                cy.get('div[data-test-id=rules-card]').should('contain.text', r)
            }
            //contacts
            cy.contains('Contact').click()
            for (var j of i['contacts']) {
                cy.contains(j['name']).should('exist')
                cy.contains(j['phoneNumber']).should('exist')
            }
            //result
            if (i['result']) {
                cy.contains('Results').click()
                var r = i['result'].replace(/\n/g, '');
                cy.get('div[data-test-id=result-card]').should('contain.text', r)

            }
            /////registration
            //myreg-not-exist
            cy.contains('Myregistration').should('not.exist')
            if (dayjs(i['regStartDate']).diff(dayjs()) > 0) {
                cy.contains('Registration starts on ' + dayjs(i['regStartDate']).format("DD MMMM hh:mm a "))
                cy.contains('Register').should('not.exist')//////////////////////should consider
            }
            else if (dayjs(i['regStartDate']).diff(dayjs()) < 0 && dayjs(i['regEndDate']).diff(dayjs()) > 0) {
                cy.contains('Registration Open..')
                cy.contains('Register').should('exist')
                //cy.contains('Register').click()


            }
            else {
                cy.contains('Registration has Ended!!').should('exist')
                cy.contains('Register').should('not.exist')//////////////////////should consider
            }

        }
    })

    it('Check Events-page after login', () => {
        console.log(userdetails)
        cy.login()

        for (var i of events) {
            console.log(i)
            cy.visit('http://localhost:3000/event/' + i['slug'])
            //login and back buttons
            cy.get('[data-test-id=profile-btn]').should("exist")
            cy.get('[data-test-id=profile-btn]').click()
            cy.url().should('include', '/profile')
            cy.go('back')
            cy.get('[data-test-id=back-btn]').should('exist')
            //eventname
            cy.contains(i['name']).should('exist')
            //desc-check
            cy.contains('Description').click()
            if (i['descriprion']) {
                var r = i['descriprion'].replace(/\n/g, '');
                cy.get('div[data-test-id=description-card]').should('contain.text', r)
            }
            //rules-check
            cy.contains('Rules').click()
            if (i['rules']) {
                var r = i['rules'].replace(/\n/g, '');
                cy.get('div[data-test-id=rules-card]').should('contain.text', r)
            }
            //contacts
            cy.contains('Contact').click()
            for (var j of i['contacts']) {
                cy.contains(j['name']).should('exist')
                cy.contains(j['phoneNumber']).should('exist')
            }
            //result
            if (i['result']) {
                cy.contains('Results').click()
                var r = i['result'].replace(/\n/g, '');
                cy.get('div[data-test-id=result-card]').should('contain.text', r)

            }
            /////registration

            if (dayjs(i['regStartDate']).diff(dayjs()) > 0) {
                cy.contains('Registration starts on ' + dayjs(i['regStartDate']).format("DD MMMM hh:mm a "))
                cy.contains('Register').should('not.exist')//////////////////////should consider
            }
            else if (dayjs(i['regStartDate']).diff(dayjs()) < 0 && dayjs(i['regEndDate']).diff(dayjs()) > 0) {
                var flag = 0;
                for (var j of userdetails['eventDetails']) {
                    if (i['id'] == j['event']) {
                        flag = 1;
                        cy.contains('Myregistration').should('exist')
                        cy.contains('Register').should('not.exist')
                    }
                }
                if (flag == 0) {
                    cy.contains('Registration Open..')
                    cy.contains('Register').should('exist')
                    cy.contains('Myregistration').should('not.exist')
                }
            }
            else {
                cy.contains('Registration has Ended!!').should('exist')
                cy.contains('Register').should('not.exist')//////////////////////should consider

            }

        }
    })







})