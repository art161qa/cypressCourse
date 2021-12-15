/// <reference types = "cypress" />
describe('Check tooltips and dialogs', () => {
    it('Check a tooltip', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()
        cy.contains('button', 'Success').click()
        cy.contains('span', 'This is a tooltip').then(tooltip => {
            cy.wrap(tooltip).should('contain', 'This is a tooltip')
            cy.wrap(tooltip).should('be.visible')
        })
    })
    it.only('Check confirm', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
        // 1
        // cy.on('window:confirm', confirm => {
        //     expect(confirm).to.equal('Are you sure you want to delete?')
        // })
        
        //2
        // const stub = cy.stub()
        // cy.on('window:confirm', stub)
        // cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
        //     expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
        // })

        //if you want to cancel confirm
        cy.get('tbody tr').first().find('.nb-trash').click()
        cy.on('window:confirm', confirm => {
            return false
        })
    })
})