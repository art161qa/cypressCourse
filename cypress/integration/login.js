it('go to dev-admin', () => {
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
        code = resp.body.code
        console.log(code)
        cy.get('input[placeholder="Введите код из смс"]').type(code)
      })
    cy.contains('h5', 'Сборка').click()
    cy.contains('span', 'Выберите город').click()
    cy.get('.list-item').contains('Москва').click()
      
})