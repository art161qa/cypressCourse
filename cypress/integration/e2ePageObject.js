import { setegid } from "process";
import { navigate, Navigation, sections } from "../support/pageObjects/page-object-navigation"
import { StepperPage, stepper } from "../support/pageObjects/page-object-navigation-stepper";
/// <reference types = "cypress" />

describe('Tryna write e2e tests using Page Object pattern', () => {
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
})