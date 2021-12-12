/// <reference types = "cypress" />

describe('Check list and dropdowns', () => {
    it('Change theme', () => {
        cy.visit('/')
        cy.get('ngx-header nb-select').then(dropDown => {
            cy.wrap(dropDown).click()
            cy.get('nb-option').each((listItem,index, allItems) => {
                const itemText = listItem.text().trim()
            
                let colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                }

                cy.wrap(listItem).click()
                cy.wrap(dropDown).should('contain', itemText)
                cy.get('nb-sidebar').should('have.css', 'background-color', colors[itemText])
             
                if (index < allItems.length - 1){
                    cy.wrap(dropDown).click()
                }
            
            })

        }) 
    })
})