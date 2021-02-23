/// <reference types="Cypress" />

import React from 'react';

describe ('complete e2e test', () => {
    beforeEach(() => {
        cy.clock();
        cy.visit('/');
        cy.contains('Slacker');
        cy.get('[data-cy=home-button]').click();
        cy.contains('Slacker').should('not.exist');
    })

    it('verify components are loaded when navigating between tabs', () => {

        // Verifying Leisure tab and its content
        cy.get('[data-cy=leisure-tab]').should('have.class', 'selected').should('not.have', 'unselected');
        cy.contains('Work');
        cy.contains('Slack');
        cy.get('[data-cy=total-time-work]').should('contain', '00:00:00.000');
        cy.get('[data-cy=total-time-slack]').should('contain', '00:00:00.000');
        cy.get('[data-cy=pause-all-work]').should('have.class', 'disabled');
        cy.get('[data-cy=pause-all-slack]').should('have.class', 'disabled');
        cy.get('[data-cy=reset-all-work]').should('have.class', 'function');
        cy.get('[data-cy=reset-all-slack]').should('have.class', 'function');
        cy.get('[data-cy=leisure-card-list-work] > .leisure-card').should(($div) => {
            expect($div).to.have.length(1);
        })
        cy.get('[data-cy=leisure-card-list-slack] > .leisure-card').should(($div) => {
            expect($div).to.have.length(1);
        })

        // Verifying Strict tab and its content
        cy.get('[data-cy=strict-tab]').should('have.class', 'unselected').should('not.have', 'selected').click();
        cy.get('[data-cy=strict-tab]').should('have.class', 'selected').should('not.have', 'unselected');
        cy.get('[data-cy=leisure-tab]').should('have.class', 'unselected').should('not.have', 'selected');
        cy.contains('Coming soon');

        // Verifying User tab and its content
        cy.get('[data-cy=user-tab]').should('have.class', 'unselected').should('not.have', 'selected').click();
        cy.get('[data-cy=user-tab]').should('have.class', 'selected').should('not.have', 'unselected');
        cy.get('[data-cy=strict-tab]').should('have.class', 'unselected').should('not.have', 'selected');
        cy.get('[data-cy=leisure-tab]').should('have.class', 'unselected').should('not.have', 'selected');
        cy.get('[data-cy=login-form]');
        cy.get('.link').should('contain.text', 'Register').click();
        cy.get('[data-cy=register-form]');
        cy.get('.link').should('contain.text', 'Already have an account? Login').click();
        cy.get('[data-cy=login-form]');
    })

    it('verify adding work cards and name change on add' , () => {
        cy.get('[data-cy=add-card-work]').click().click();
        cy.focused().type("CypressTest").blur();
        cy.get('[data-cy=leisure-card-list-work] > .leisure-card').should(($div) => {
            expect($div).to.have.length(3);
            const cardContent = $div[2].innerHTML
            expect(cardContent).to.contain("CypressTest");
        })
    })

    it('verify adding slack cards and name change on add' , () => {
        cy.get('[data-cy=add-card-slack]').click().click();
        cy.focused().type("CypressTest").blur();
        cy.get('[data-cy=leisure-card-list-slack] > .leisure-card').should(($div) => {
            expect($div).to.have.length(3);
            const cardContent = $div[2].innerHTML
            expect(cardContent).to.contain("CypressTest");
        })
    })

    it('verify that cards are not deletable nor the timer can be reset when running', () => {
        // Work cards
        cy.get('[data-cy=leisure-card-list-work] > .leisure-card > .time-group > [data-cy=play]').first().click();
        cy.tick(1000);
        cy.get('[data-cy=leisure-card-list-work] > .leisure-card').first().should('contain', "00:00:01");
        cy.get('[data-cy=leisure-card-list-work] > .leisure-card > .time-group > [data-cy=pause]');
        cy.get('[data-cy=leisure-card-list-work] > .leisure-card > [data-cy=delete]').first().should('have.class', 'disabled');
        cy.get('[data-cy=reset-all-work]').should('have.class', 'disabled');
        cy.get('[data-cy=pause-all-work]').should('have.class', 'function');
        cy.get('[data-cy=reset-all-slack]').should('have.class', 'function');
        cy.get('[data-cy=pause-all-slack]').should('have.class', 'disabled');

        // Slack cards
        cy.get('[data-cy=leisure-card-list-slack] > .leisure-card > .time-group > [data-cy=play]').first().click();
        cy.tick(1000);
        cy.get('[data-cy=leisure-card-list-slack] > .leisure-card').first().should('contain', "00:00:01");
        cy.get('[data-cy=leisure-card-list-slack] > .leisure-card > .time-group > [data-cy=pause]');
        cy.get('[data-cy=leisure-card-list-slack] > .leisure-card > [data-cy=delete]').first().should('have.class', 'disabled');
        cy.get('[data-cy=reset-all-slack]').should('have.class', 'disabled');
        cy.get('[data-cy=pause-all-slack]').should('have.class', 'function');
        cy.get('[data-cy=reset-all-work]').should('have.class', 'function');
        cy.get('[data-cy=pause-all-work]').should('have.class', 'disabled');
    })

    it('verify that the accumulated time is correct when running/deleting and resetting', () => {
        // Work Cards
        cy.get('[data-cy=add-card-work]').click().click()

        cy.get('[data-cy=leisure-card-list-work] > .leisure-card > .time-group > [data-cy=play]').first().click();
        cy.tick(1000);
        cy.get('[data-cy=leisure-card-list-work] > .leisure-card').first().should('contain', "00:00:01");

        cy.get('[data-cy=leisure-card-list-work] > .leisure-card > .time-group > [data-cy=play]').last().click();
        cy.tick(1000);
        cy.get('[data-cy=leisure-card-list-work] > .leisure-card').last().should('contain', "00:00:01");

        cy.get('[data-cy=leisure-card-list-work] > .leisure-card > .time-group > [data-cy=play]').eq(1).click();
        cy.tick(2000);
        cy.get('[data-cy=leisure-card-list-work] > .leisure-card').eq(1).should('contain', "00:00:02");

        cy.get('[data-cy=total-time-work]').should('contain', '00:00:04');
        cy.get('[data-cy=total-time-slack]').should('contain', '00:00:00');

        // Slack Cards
        cy.get('[data-cy=add-card-slack]').click().click()

        cy.get('[data-cy=leisure-card-list-slack] > .leisure-card > .time-group > [data-cy=play]').first().click();
        cy.tick(1000);
        cy.get('[data-cy=leisure-card-list-slack] > .leisure-card').first().should('contain', "00:00:01");

        cy.get('[data-cy=leisure-card-list-slack] > .leisure-card > .time-group > [data-cy=play]').last().click();
        cy.tick(1000);
        cy.get('[data-cy=leisure-card-list-slack] > .leisure-card').last().should('contain', "00:00:01");

        cy.get('[data-cy=leisure-card-list-slack] > .leisure-card > .time-group > [data-cy=play]').eq(1).click();
        cy.tick(2000);
        cy.get('[data-cy=leisure-card-list-slack] > .leisure-card').eq(1).should('contain', "00:00:02");

        cy.get('[data-cy=leisure-card-list-slack] > .leisure-card > .time-group > [data-cy=pause]').click();

        cy.get('[data-cy=total-time-slack]').should('contain', '00:00:04');
        cy.get('[data-cy=total-time-work]').should('contain', '00:00:04');

        cy.get('[data-cy=leisure-card-list-work] > .leisure-card > [data-cy=delete]').eq(1).click();
        cy.tick(500); // animation
        cy.get('[data-cy=leisure-card-list-work] > .leisure-card').should(($div) => {
            expect($div).to.have.length(2);
        });
        cy.get('[data-cy=total-time-work]').should('contain', '00:00:02');
        cy.get('[data-cy=total-time-slack]').should('contain', '00:00:04');

        cy.get('[data-cy=reset-all-slack]').click();
        cy.get('[data-cy=total-time-slack]').should('contain', '00:00:00');

    })

})