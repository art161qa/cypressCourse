
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
    checkPrevBtnIsDisabled(){
        this.getPrevButton().should('have.class', 'btn-disabled')
    }
    checkPrevBtnIsActive(){
        this.getPrevButton().should('not.have.class', 'btn-disabled')
    }
    checkNextBtnIsDisabled(){
        this.getNextButton().should('have.class', 'btn-disabled')
    }
    checkNextBtnIsActive(){
        this.getNextButton().should('not.have.class', 'btn-disabled')
    }
    checkStepIsCompleted(stepNumber){
        return cy.get('nb-stepper[orientation= "horizontal"]').find('div.step').then( steps =>{
            cy.wrap(steps).eq(stepNumber-1).should('have.class', 'completed')
            cy.wrap(steps).eq(stepNumber-1).find('div.label-index').should('have.css', 'background-color', 'rgb(51, 102, 255)')
        })
    }
    checkStepIsSelected(stepNumber){
        return cy.get('nb-stepper[orientation= "horizontal"]').find('div.step').then( steps =>{
            cy.wrap(steps).eq(stepNumber-1).should('have.class', 'selected')
            cy.wrap(steps).eq(stepNumber-1).find('div.label-index').should('have.css', 'border-color', 'rgb(39, 75, 219)')
        })
    }
}

export let stepper = new StepperPage() 