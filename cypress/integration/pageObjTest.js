import { navigate, Navigation, sections } from "../support/page-object-navigation"

describe ('First page pbject test', () => {
    beforeEach('Open App', () => {
        cy.visit('/')
    })

    it('test navigation on menu', () => {
        navigate.toSection(navigate.sections.tablesAndData, 'Smart Table')
    })
})