
export class StepperPage {
    
    clickPrevButton (){
        return cy.contains('button', 'prev').click()
    }
    getPrevButton(){
        return cy.contains('button', 'prev')
    }
    clickNextButton (){
        return cy.contains('button', 'next').click({force:true})
    }
    getNextButton(){
        return cy.contains('button', 'next')
    }
    
    completeSteps(){
        let count = 1
        return  cy.get('nb-stepper[orientation= "horizontal"]').find('div.step').each( (step, index) => {
            cy.wrap(step).should('have.class', 'selected')
            if (index < 3){
                cy.get('nb-stepper[orientation= "horizontal"]').find('h3').should('contain', `Step content #${count}`)
                this.clickNextButton()
                cy.wrap(step).should('have.class', 'completed')
                count++
            }

        })
    
    }

    goToPreviousStep(){
        return cy.get('nb-stepper[orientation= "horizontal"]').find('div.step').then( steps => {
            this.getPrevButton().should('have.class','btn-disabled')
            this.clickNextButton()
            cy.wrap(steps).eq(0).should('have.class', 'completed')
            cy.wrap(steps).eq(1).should('have.class', 'selected').and('not.have.class', 'completed')
            this.getPrevButton().should('not.have.class','btn-disabled')
            this.clickPrevButton()
            cy.wrap(steps).eq(0).should('have.class', 'selected')
            cy.wrap(steps).eq(1).should('have.class', 'completed')
            

        })
    }
}

export let stepper = new StepperPage() 