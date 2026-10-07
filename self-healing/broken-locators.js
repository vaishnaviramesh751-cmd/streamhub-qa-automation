// AI Self-Healing Locator Exercise
// These locators are intentionally incorrect/brittle.
// They are NOT used by the main passing test suite.

const brokenLocators = {
  // Broken: incorrect ID
  homeLoanAmount: '#wrong-home-loan-amount',

  // Broken: incorrect class
  interestRate: '.wrong-interest-rate',

  // Brittle: depends on a specific DOM position
  loanTenure: 'body > div:nth-child(3) > div:nth-child(2) input',

  // Broken: incorrect text
  homeLoanTab: 'text=Wrong Home Loan',

  // Broken: incorrect test attribute
  emiResult: '[data-testid="wrong-emi-result"]'
};

module.exports = { brokenLocators };