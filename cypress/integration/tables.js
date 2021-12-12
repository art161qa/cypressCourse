/// <reference types = "cypress" />
const userName = 'artem_username'
describe('Tables', () => {
    it('Add new user', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table'). click()
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
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table'). click()
        cy.get('tbody').contains('tr', '@mdo').find('i.nb-trash').click()
    })
    it.only('Edit user', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table'). click()
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
})