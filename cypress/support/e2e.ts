/// <reference types="cypress" />
import './commands'
import { v4 as uuidv4 } from 'uuid';

beforeEach(function() {
    const title = this.test?.title || 'Unknown step';
    cy.log(`**${title}**`);
});

afterEach(function() {
    const currentTest = this.currentTest;
    
    if (currentTest?.state === 'failed') {
        const screenshotName = currentTest.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        cy.screenshot(`failure-${screenshotName}`);
    }
});
