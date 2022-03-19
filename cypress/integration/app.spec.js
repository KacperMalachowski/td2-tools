/// <reference types="Cypress" />

describe("Test", () => {
  it("Should open home page", () => {
    cy.visit("/");
  })
})