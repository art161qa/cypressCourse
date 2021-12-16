/// <reference types = "cypress" />
describe('Datepicker tests', () => {
    it('Check date', () => {
        function selectDayFromCurrent(day){
            let date = new Date ()
            date.setDate(date.getDate() + day)
            let futureDay = date.getDate()
            let futureMonth = date.toLocaleString('en', {month: 'short'})
            let dateAssert = futureMonth + ' ' + futureDay + ', ' + date.getFullYear()
            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then( dateAttr => {
                if(!dateAttr.includes(futureMonth) || !dateAttr.includes(date.getFullYear())){
                    cy.get('[data-name="chevron-right"]').click()
                    console.log(dateAttr)
                    console.log(futureMonth)
                    selectDayFromCurrent(day)
                }
                else{
                    cy.get('nb-calendar-day-cell[class = "day-cell ng-star-inserted"]').contains(futureDay).click()
                }
            })
            return dateAssert
        }
        
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()
        cy.get('input[placeholder = "Form Picker"]').then(inputCalendar => {
            cy.wrap(inputCalendar).click()
            let dateAssert = selectDayFromCurrent(5)
            cy.wrap(inputCalendar).invoke('prop', 'value').should('contain', dateAssert)

        })
    })
})