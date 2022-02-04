/*
    Hi there!
    Stragety of this test will be to check core functionality: Starting app, checking if all tabs are working, 
    adding items to cart, deleting items from cart, placing order, closing app
    
    In this cypress test I'll write two tests:
    -> First one will be about clicking all elements in application, and see if everything is working fine
    -> Second one will be about placing order, checking results of placed order, and all that using page object
    Let's start!
*/

import bornfight from '../support/bornfightLib.js'

beforeEach(() => {
    Cypress.Cookies.defaults ({
        preserve: (cookie) => {
            return true;
        }
    })
});
// FIRST TEST -> Starting app 
describe ('firstTest', () => {
    it ('Starting app', () => {
        cy.visit('')
          .url().should('include', 'dev')
    })

// Let's get started!
    it ('Lets get started', () => {
        cy.get('.btn')
          .as('letsGetStarted')
          .get('@letsGetStarted')
          .contains('started')
          .click()
          .url().should('include', '/order')
    })

// Add item to cart
    it ('Add to cart', () => {
        cy.get('.btn')
          .as('addToCart')
          .get('@addToCart')
          .contains('cart')
          .click()
          .url().should('include', '/order')
    })

// Check if correct item is added to cart
    it ('Item in cart', () => {
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
    })

// Go to checkout
    it ('Checkout', () => {
        cy.get(':nth-child(3) > a')
          .as('checkout')
          .get('@checkout')
          .contains('Checkout')
          .click()
          .url().should('include', '/checkout')
    })

// Clear items in cart
    it ('Empty cart', () => {
        cy.get('.btn-danger')
          .as('clearCart')
          .get('@clearCart')
          .contains('Empty')
          .click()
          .url().should('include', '/checkout')
    })

// Check if correct message is shown after clearning cart

    it ('Deleted item message', () => {
        cy.get('.empty')
          .invoke('text')
          .then((emptyCart) => {
             expect(emptyCart.trim())
            .equal('No results found.')
        })
    })
})

// SECOND TEST -> Starting app again
describe ('secondTest', () => {
    it('Starting app', () => {
        cy.visit('')
          .url().should('include', 'dev')
    })

// Adding variables that I will use for filling order form
let firstName = 'testName',
    lastName = 'testLastName',
    eMail = 'test@test.com',
    country = 'Malaysia',
    city = 'Kuala Lumpur',
    shippingAddress = 'Bornfight';

// Set item in cart to order
    it('Adding item to cart',  () => {
        bornfight.order(2)
    })

// Add item to cart
    it('Added item', () => {
        bornfight.addToCart()
    })

// Check if correct item is added to cart
    it('Item in cart', () => {
        bornfight.itemInCart()
    })

// Go to checkout
    it('Checkout', () => {
        bornfight.order(3)
    })

// Filling order form
    it('Filling Order Form', () => {
        bornfight.fillOrderForm('firstname', firstName)
        bornfight.fillOrderForm('lastname', lastName)
        bornfight.fillOrderForm('email', eMail)
        bornfight.fillOrderForm('country', country)
        bornfight.fillOrderForm('city', city)
        bornfight.fillOrderForm('shippingaddress', shippingAddress)
    })

// Placing order
    it('Place order', () => {
        bornfight.placeOrder()
    })

// Check if correct informations are saved after placing order
    it('Check order informations', () => {
        bornfight.orderDetails('#w0 > tbody > ', 1, firstName)
        bornfight.orderDetails('', 2, lastName)
        bornfight.orderDetails('', 3, eMail)
        bornfight.orderDetails('', 4, country)
        bornfight.orderDetails('', 5, city)
        bornfight.orderDetails('', 6, shippingAddress)
    })
})