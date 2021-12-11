/// <reference types = "cypress" />
describe('Check list and dropdowns', () => {
    it('Change theme', () => {
        cy.visit('/')
        cy.get('nb-layout-header nb-select').click()
        cy.get('nb-option').then((options) => {
            const optionsArr = options
            const expectedArray = ['Light', 'Dark', 'Cosmic', 'Corporate']
            const nameTheme = []
            for (let i = 0; i < optionsArr.length; i++){
                nameTheme.push(options[i].textContent.trim())
            }
            for (let i = 0; i < expectedArray.length; i++){
                expect(expectedArray[i]).to.equal(nameTheme[i])
            }
            expect(optionsArr.length).to.equal(4)
        cy.get('nb-option').contains(' Dark').click()
        cy.get('nb-sidebar').should('have.css', 'background-color', 'rgb(34, 43, 69)')
        cy.get('nb-select').should('contain', ' Dark')
        })

    })
})

