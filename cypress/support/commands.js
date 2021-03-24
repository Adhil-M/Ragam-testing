// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
import "cypress-localstorage-commands"
// -- This is a parent command --
Cypress.Commands.add('login', () => {
    console.log("login called")
    window.localStorage.setItem('user', JSON.stringify({
        email: "muhammedadhil_b190406cs@nitc.ac.in",
        id: 13,
        isLoggedIn: true,
        name: null,
        phoneNumber: null,
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNjQxMDMyNiwiZXhwIjoxNjE5MDAyMzI2fQ.nWNIAEjURKLqPBAGDpLEnz-pSYXfv3iYP1dAK4aYhys"
    }))
})

Cypress.Commands.add('getCategories', () => {
    cy.request('http://api.staging.ragam.live/categories').then((response) => {
        return new Promise(resolve => {
            expect(response).property('status').to.equal(200)
            window.localStorage.setItem('categories', JSON.stringify(response.body))
            let categories = JSON.parse(window.localStorage.getItem('categories'))
            console.log(categories)
            resolve(response.body);
        })
    })
})

Cypress.Commands.add('getEvents', () => {
    cy.request('http://api.staging.ragam.live/events').then((response) => {
        return new Promise(resolve => {
            expect(response).property('status').to.equal(200)
            window.localStorage.setItem('events', JSON.stringify(response.body))
            let events = JSON.parse(window.localStorage.getItem('events'))
            console.log(events)
            resolve(response.body);
        })
    })
})

Cypress.Commands.add('getEvents2', () => {
    cy.request('http://api.staging.ragam.live/events').then((response) => {
        return new Promise(resolve => {
            expect(response).property('status').to.equal(200)
            window.localStorage.setItem('events', JSON.stringify(response.body))
            let events = JSON.parse(window.localStorage.getItem('events'))
            console.log(events)

            resolve(response.body);
        })
    })
})

Cypress.Commands.add('getUserdetails', () => {
    var i;
    cy.request({
        method: 'GET',
        url: 'http://api.staging.ragam.live/users/me',
        headers: {
            Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNjQxMDMyNiwiZXhwIjoxNjE5MDAyMzI2fQ.nWNIAEjURKLqPBAGDpLEnz-pSYXfv3iYP1dAK4aYhys"

        }

    }).then(response => {
        return new Promise(resolve => {
            expect(response).property('status').to.equal(200)
            window.localStorage.setItem('userdetails', JSON.stringify(response.body))
            let userdetails = window.localStorage.getItem('userdetails')
            console.log(userdetails)
            resolve(response.body);
        })
    })


})

Cypress.Commands.add('getUserEvent', (userEventId) => {
    var i;
    console.log('got call-getuserevents' + userEventId)
    cy.request({
        method: 'GET',
        url: 'http://api.staging.ragam.live/user-event-details/' + userEventId,
        headers: {
            Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNjQxMDMyNiwiZXhwIjoxNjE5MDAyMzI2fQ.nWNIAEjURKLqPBAGDpLEnz-pSYXfv3iYP1dAK4aYhys"
        }

    }).then(response => {
        return new Promise(resolve => {
            expect(response).property('status').to.equal(200)
            window.localStorage.setItem('userEventDetails', JSON.stringify(response.body))
            let userEventDetails = window.localStorage.getItem('userEventDetails')
            console.log(userEventDetails)
            resolve(response.body);
            return userEventDetails

        })
    })
})
Cypress.Commands.add('regTestUser', () => {
    cy.request({
        method: 'POST',
        url: 'http://api.staging.ragam.live/auth/local/register',
        body: {
            "email": "adhilfake@gmail.com",
            "username": "testuser",
            "name": "adhil-test",
            "password": "password"
        }
    }).then(response => {
        return new Promise(resolve => {
            expect(response).property('status').to.equal(200)
            console.log(response.body)
            resolve(response.body);
        })
    })
})
Cypress.Commands.add('deleteTestUser', (id) => {
    cy.request({

        method: 'DELETE',
        url: 'http://api.staging.ragam.live/users/'+id,
        headers: {
            Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTYxNjQxMDMyNiwiZXhwIjoxNjE5MDAyMzI2fQ.nWNIAEjURKLqPBAGDpLEnz-pSYXfv3iYP1dAK4aYhys"
        }
        
    }).then(response => {
        return new Promise(resolve => {
            expect(response).property('status').to.equal(200)
            console.log(response.body)
            resolve(response.body);
        })
    })
})

Cypress.Commands.add('getTestUserDetails', (token) => {
    var i;
    cy.request({
        method: 'GET',
        url: 'http://api.staging.ragam.live/users/me',
        headers: {
            Authorization: "Bearer " + token

        }

    }).then(response => {
        return new Promise(resolve => {
            expect(response).property('status').to.equal(200)

            resolve(response.body);
        })
    })


})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
