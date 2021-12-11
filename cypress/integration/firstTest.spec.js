/// <reference types="cypress" />

const { wrap } = require("module")

describe("First test suite", () => {
  // beforeEach(() => {
  //   cy.visit("/")
  //   cy.contains('Forms').click()
  //   cy.contains('Datepicker').click()
  // })
  // it('first test', () => {
  //   cy.get('#inputEmail1').type("test2@mail.ru")
  //   cy.get("#exampleInputEmail1")
  //     .parents('form')
  //     .find('nb-checkbox')
  //     .click()
  // })
  it('Check headers', () => {
    cy.visit("/")
    cy.contains("Forms").click()
    cy.contains("Form Layouts").click()

    cy.contains('Sign in')

    cy.contains('[status = "warning"]',"Sign in")

    cy.get('#inputEmail3')
      .parents('form')
      .find('button')
      .should('contain', 'Sign in')
      .parents('form')
      .find('nb-checkbox')
      .click()
  })
  
  it('Check email input name', () => {
    cy.visit("/")
    cy.contains("Forms").click()
    cy.contains("Form Layouts").click()

    cy.contains('nb-card','Horizontal form')
      .find('label')
      .contains('Email')
  })

  it('then and wrap methods', () => {
    cy.visit("/")
    cy.contains("Forms").click()
    cy.contains("Form Layouts").click()

    cy.contains('nb-card', 'Using the Grid')
      .then(firstForm => {
        const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
        const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
        expect(emailLabelFirst).to.equal('Email')
        expect(passwordLabelFirst).to.equal('Password')

        cy.wrap(firstForm).find('[for="inputEmail1"]').should('contain', 'Email')
      })
  })

  it ('Invoke command', () => {
    cy.visit("/")
    cy.contains("Forms").click()
    cy.contains("Form Layouts").click()

    cy.get('[for="exampleInputPassword1"]').invoke('text').then (text => {
      expect(text).to.equal('Password')

    })

    cy.contains('nb-card', 'Basic form')
      .find('nb-checkbox')
      .click()
      .find('.custom-checkbox')
      .invoke('attr', 'class')
      .should('contain', 'checked')
  })
  it.only ('Check date', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    cy.contains('nb-card', 'Common Datepicker')
      .find('input')
      .then(input => {
        cy.wrap(input).click()
        cy.get('nb-calendar-day-picker').contains('25').click()
        cy.wrap(input).invoke('prop', 'value').should('contain', 'Dec 25, 2021')
      })

  })
})