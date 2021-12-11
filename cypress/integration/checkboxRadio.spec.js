/// <reference types = "cypress" />

describe('First test suite', () => {
    it('Check checkboxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        cy.get('[type = "checkbox"]').then( (checkboxes) => {
            cy.wrap(checkboxes)
                .eq(1)
                .check({force: true})
                .click({force: true})
                .should('not.be.checked')
        })
    })
    it.only('Check radiobuttons', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        cy.contains('nb-card', 'Using the Grid')
            .find('[type = "radio"]')
            .then ((btns) => {
                cy.wrap(btns)
                    .eq(0)
                    .check({force : true})
                    .should('be.checked')
                cy.wrap(btns)
                    .eq(1)
                    .should('not.be.checked')
                cy.wrap(btns)
                    .eq(2)
                    .should('be.disabled')

                
            })
    })

})