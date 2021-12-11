/// <reference types="cypress" />
import "cypress-localstorage-commands"
import {tokenKey,tokenValue, refresh_tokenKey, refresh_tokenValue, expire_dateKey, expire_dateValue, employeePhone} from '../integration/creds'
let pickerSurname = ''
let pickerName = ''
let pickerMidlenName = ''
let initialCompany = 'Чижик'
let replaceCompany = 'Пятёрочка'

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


describe('Actioms on pickers', () => {
    beforeEach (() => {
        cy.setLocalStorage(tokenKey,tokenValue)
        cy.setLocalStorage(refresh_tokenKey,refresh_tokenValue)
        cy.setLocalStorage(expire_dateKey, expire_dateValue)
        cy.visit("https://dev-admin.okolo.app/")
        
    })

    it('Create picker', () => {
        cy.request({
            method: 'GET',
            url: 'api.randomdatatools.ru',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => {
            pickerSurname = resp.body.LastName
            pickerName = resp.body.FirstName
            pickerMidlenName = resp.body.FatherName
        })

        cy.contains('div', 'Сотрудники').click()
        cy.contains('h5', 'Сборщики'). click().as('goToPickerList')
        cy.wait(500)
        cy.contains(' создать ').click()
        cy.get('h4[class = "modal-layout-header"]').invoke('text')
            .should('contain', 'Создать сборщика')
        cy.get('input[placeholder = "Иванов"]')
            .click()
            .type(pickerSurname)
        cy.get('input[placeholder = "Иван"]')
            .click()
            .type(pickerName)
        cy.get('input[placeholder = "Иванович"]')
            .click()
            .type(pickerMidlenName)
        cy.get('input[placeholder = "name@e-mail.com"]')
            .click()
            .type('fake' + getRandomInRange(100,1000) + '@mail.ru')
        cy.get('input[type = "tel"]')
            .click()
            .type(getRandomInRange(9000000000, 9999999999))
        cy.get('input[placeholder="Выберите горoд"]')
            .click()
        cy.contains('div', 'Ростов-на-Дону')
            .click()
        cy.contains('label', 'Выберите партнёра')
            .click()
        cy.contains('.list-item', 'Testing Company')
            .click()
        cy.contains('.popper__activator', 'Выберите сеть')
            .click()
        cy.get('div[class="list"]').contains('[data-v-30e91344][data-v-aaa165fc][data-cy = "select-option"]',initialCompany)
            .click()
    
        cy.contains('label', 'Выберите роль')
            .click()
        cy.contains('.list-item', 'Сборщик')
            .click()
        cy.contains('label', 'Выберите тип')
            .click()
        cy.contains('.list-item', 'Выделенный')
            .click()
        cy.get('input[placeholder="Укажите номер"]')
            .click()
            .type('56446132')
        cy.contains('label', 'Выберите опытность')
            .click()
        cy.contains('.list-item', 'Эксперт')
            .click()
        cy.get('button[data-cy = "modal-accept-btn"]')
            .click()        
                

    })
})