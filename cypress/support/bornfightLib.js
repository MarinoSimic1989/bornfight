let bornfight = function () {
    this.order = function (index) {
        cy.get(':nth-child(' + index +') > a')
          .as('order')
          .get('@order')
          .click()
          .url().should('include', '.bornfight')
    }

    this.addToCart = function () {
        cy.get('.btn')
          .as('addToCart')
          .get('@addToCart')
          .contains('cart')
          .click()
          .url().should('include', '/order')
    }

    this.itemInCart = function() {
        cy.get('#orderform-publisher')
          .invoke('text')
          .then((gameName) => {
                let splitText1 = gameName.split(' ')[0]

        cy.get('.alert')
          .invoke('text')
          .then((notificationValue) => {
                let splitText2 = notificationValue.split(' ')[12]

        expect((splitText1).replace(/\s+/g, '').toLowerCase()).equal((splitText2).replace(/\s+/g, '').toLowerCase())
           })
        })
    }

    this.fillOrderForm = function(action, text) {
        cy.get('#orderform-' + action + '').click().type(text)
    }
    
    this.placeOrder = function() {
        cy.get(':nth-child(4) > .btn')
          .as('placeOrder')
          .get('@placeOrder')
          .contains('Place')
          .click()
          .url().should('include', '/place')
    }

    this.orderDetails = function(action, index, text) {
        cy.get(action + ':nth-child(' + index +') > td')
          .invoke('text')
          .then((textResult) => {
              expect(textResult.trim())
              .equal(text)
          })
    }
}
module.exports = new bornfight();