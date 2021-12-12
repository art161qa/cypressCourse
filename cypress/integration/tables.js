/// <reference types = "cypress" />
const userName = 'artem_username'
describe('Tables', () => {
    it('Add new user', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table'). click()
        cy.get('.ng2-smart-filters').find('i').click()
        cy.get('tr[class = "ng-star-inserted"]').find('[placeholder="ID"]').click().type('70')
        cy.get('tr[class = "ng-star-inserted"]').find('[placeholder="First Name"]').click().type('Artem')
        cy.get('tr[class = "ng-star-inserted"]').find('[placeholder="Last Name"]').click().type('Razinkin')
        cy.get('tr[class = "ng-star-inserted"]').find('[placeholder="Username"]').click().type(userName)
        cy.get('tr[class = "ng-star-inserted"]').find('[placeholder="E-mail"]').click().type('artem@mail.ru')
        cy.get('tr[class = "ng-star-inserted"]').find('[placeholder="Age"]').click().type('27')
        cy.get('tr[class = "ng-star-inserted"]').find('i.nb-checkmark').click()

    })
    it('Delete user', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table'). click()
        cy.get('tbody').contains('tr', '@mdo').find('i.nb-trash').click()
    })
    it.only('Edit user', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table'). click()
        cy.get('tbody')
            .contains('tr', '@snow')
            .find('i.nb-edit')
            .click()
        cy.get('input[ng-reflect-model = "@snow"]')
            .click()
            .clear()
            .type('@snow_edited')
        cy.get('i.nb-checkmark')
            .click()

    })
})