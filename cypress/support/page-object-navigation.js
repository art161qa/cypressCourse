export class Navigation {
    sections  = {
        layout : 'Layout',
        forms: 'Forms',
        modalAndOverlays: 'Modal & Overlays',
        extraComponents: 'Extra Components',
        tablesAndData: 'Tables & Data',
        auth: 'Auth'

    };
    toSection(section,subsection) {
        cy.contains(section).click()
        if (subsection){
            cy.contains(subsection).click()
        }
        
    }
}

export const navigate = new Navigation()

