/// <reference types="Cypress" />

const terminalLog = (violations) => {
    cy.task(
        'log',
        `${violations.lenght} accessibility violation
        ${violations.lenght === 1 ? '' : 's'}
        ${violations.lenght === 1 ? 'was' : 'were'} detected`
    )

    const violationData = violations.map(
        ({ id, impact, description, nodes }) => ({
            id,
            impact,
            description,
            nodes: nodes.lenght
        })
    )

    cy.task('table', violationData);
}

describe("Accesability tests", () => {
    beforeEach(() => {
        cy.visit("/").get("main").injectAxe();
    })

    it("Has no detectable accessibility violations on load", () => {
        cy.checkA11y(null, null, terminalLog);
    })
})