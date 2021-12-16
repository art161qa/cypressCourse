/// <reference types = "cypress" />

import { navigate } from "../support/page-object-navigation"

const userName = 'artem_username'
describe('Tables', () => {
    beforeEach('Open app', () => {
        cy.visit('/')
        navigate.toSection(navigate.sections.tablesAndData, 'Smart Table')
    })
    it('Add new user', () => {

        cy.get('.ng2-smart-filters').find('i').click()
        cy.get('thead').find('tr').eq(2).then(tableRow => {
            cy.wrap(tableRow).find('[placeholder="ID"]').click().type('70')
            cy.wrap(tableRow).find('[placeholder="First Name"]').click().type('Artem')
            cy.wrap(tableRow).find('[placeholder="Last Name"]').click().type('Razinkin')
            cy.wrap(tableRow).find('[placeholder="Username"]').click().type(userName)
            cy.wrap(tableRow).find('[placeholder="E-mail"]').click().type('artem@mail.ru')
            cy.wrap(tableRow).find('[placeholder="Age"]').click().type('27')
            cy.wrap(tableRow).find('i.nb-checkmark').click()

        })
    })
    it('Delete user', () => {
        cy.get('tbody').contains('tr', '@mdo').find('i.nb-trash').click()
    })

    it('Edit user', () => {
        cy.get('tbody').contains('tr', '@snow')
            .find('i.nb-edit')
            .click()
        cy.get('input[ng-reflect-model = "@snow"]')
            .click()
            .clear()
            .type('@snow_edited')
        cy.get('i.nb-checkmark')
            .click()
        cy.contains('tr','Snow').should('contain', '@snow_edited')
    })

    it('Check table filter', () => {
        let age = [20, 30, 200]
        cy.wrap(age).each( age => {
            cy.get('thead [placeholder = "Age"]')
                    .type(age)
                    cy.wait(500)
            cy.get('tbody tr').then(tableRow => {
                cy.wrap(tableRow).each((row) => {
                    if (age == 200){
                        cy.get('tbody').should('contain', 'No data found')
                    }
                    else {
                        cy.wrap(row).find('td').eq(6).should('contain', age)
                    }
                    
                })
            })
            cy.get('thead [placeholder = "Age"]').clear()
        })

    })
})