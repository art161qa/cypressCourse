import { setegid } from "process";
import { navigate, Navigation, sections } from "../support/pageObjects/page-object-navigation"
import { StepperPage, stepper } from "../support/pageObjects/page-object-navigation-stepper";
/// <reference types = "cypress" />

describe('Tryna write e2e tests using Page Object pattern', () => {
    beforeEach(() => {
        cy.visit('/')
    });
    it('e2e', () => {
        navigate.toSection(navigate.sections.layout, 'Stepper')
        stepper.completeSteps()
        // stepper.clickNextButton()
        // stepper.clickPrevButton()

    })
    it('Go to the previous step', () => {
        navigate.toSection(navigate.sections.layout, 'Stepper')
        stepper.goToPreviousStep()
    });
    it.only(`
    Go to stepper
    Check that the button "Previous" is disabled
    Go to 2 step clicking on the button "Next"
    Check that the button "Previous" is active
    Check that step 1 has completed
    Check that step 2 has selected
    Click on the button "Previous"
    Check that step 2 has completed
    Check that step 1 has selected
    Check that the button "Previous" is disabled
    `, () => {
        navigate.toSection(navigate.sections.layout, 'Stepper')
        stepper.checkPrevBtnIsDisabled()
        stepper.clickNextButton()
        stepper.checkPrevBtnIsActive()
        stepper.checkStepIsCompleted(1)
        stepper.checkStepIsSelected(2)
        stepper.clickPrevButton()
        stepper.checkStepIsCompleted(2)
        stepper.checkStepIsSelected(1)
        stepper.checkPrevBtnIsDisabled()
    });
})