/// <reference types="cypress" />
import "cypress-localstorage-commands"
import {tokenKey,tokenValue, refresh_tokenKey, refresh_tokenValue, expire_dateKey, expire_dateValue, employeePhone} from '../integration/creds'

let pickerSurname = 'Миронов'
let pickerName = 'Иван'
let pickerMidlenName = 'Иванович'
let initialCompany = 'Чижик'
let replaceCompany = 'Пятёрочка'

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

describe ('Testing authorization on dev-admin', () => {
    beforeEach (() => {
        let dateNow = new Date().toISOString()
        if (expire_dateValue > dateNow){
            cy.setLocalStorage(tokenKey,tokenValue)
            cy.setLocalStorage(refresh_tokenKey,refresh_tokenValue)
            cy.setLocalStorage(expire_dateKey, expire_dateValue)
            cy.visit("https://dev-admin.okolo.app/")
        }
        else {
            cy.visit("https://dev-admin.okolo.app/auth")
            cy.get('input[placeholder="Введите телефон"]').type(employeePhone)
            cy.wait(1000)

            cy.request({
                method: 'POST',
                url: 'http://dev-auth.okolo.app/mod/employee/get-auth-code',
                body: {
                    "phone": employeePhone
                }
            })
            .then((resp) => {
                let code = resp.body.code
                console.log(code)
                cy.get('input[placeholder="Введите код из смс"]').type(code)
            })
                } 

            })
    // it('Display orders', () => {
    //     cy.contains('div', 'Заказы').click()
    //     cy.contains('h5', 'Сборка').click()
    //     cy.contains('span[data-cy="select-placeholder"]', ' Выберите горoд ').click()
    //     cy.get('.list-item').contains('Москва').click()
          
    // })
    it.only ('Create picker', () => {
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
    it('Change company for picker', () => {
        cy.wait(500)
        cy.contains('div', 'Сотрудники').click()
        cy.contains('h5', 'Сборщики'). click()
        cy.wait(1000)
        cy.get('input[placeholder="Поиск по ФИО"]')
            .click()
            .type(pickerSurname)
        cy.wait(1000)
        cy.contains('td[data-cy = "table-data-name"]', pickerSurname)
            .click()
        cy.contains('div[class = "info-block__text info-block__text_editable"]', 'Сеть магазинов')
            .parent()
            .find('span[data-cy="open-editor-button"]')
            .click({ force: true })
        cy.contains('label', initialCompany).click()
        cy.contains('div.list-item', replaceCompany).click()
        cy.contains('div[class = "editor"]', replaceCompany)
            .find('button[data-cy = "xedit-accept"]').click()
        cy.contains('div[class="info-block__text info-block__text_editable"]', 'Сеть магазинов')
            .find('div.info-block__description')
            .invoke('text')
            .should('contain', replaceCompany)
     })
        


})