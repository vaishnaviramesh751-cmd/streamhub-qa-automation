class EmiPage {
  constructor(page) {
    this.page = page;

    // Loan tabs
    this.homeLoanTab = page.getByRole('link', {
      name: 'Home Loan',
      exact: true
    });

    this.personalLoanTab = page.locator('#personal-loan a');

    // Home Loan amount
    this.homeLoanAmount = page.getByRole('textbox', {
      name: 'Home Loan Amount'
    });

    // Personal Loan amount
    this.personalLoanAmount = page.locator('#loanamount');

    // Interest Rate
    this.interestRate = page.getByRole('textbox', {
      name: 'Interest Rate'
    });

    this.personalLoanInterestRate = page.locator('#loaninterest');

    // Loan tenure
    this.loanTenure = page.locator('#loanterm');

    // Personal Loan tenure slider
    this.personalLoanTenureSlider = page
      .locator('#loantermslider .ui-slider-handle')
      .first();

    // EMI heading
    this.loanEmiHeading = page.getByRole('heading', {
      name: 'Loan EMI',
      exact: true
    });

    // EMI pie chart
    this.pieChart = page
      .locator('.highcharts-container')
      .first();

    // EMI schedule start date
    this.scheduleStartDate = page.locator('#startmonthyear');

    // Personal Loan repayment chart - Principal bars
    this.principalBars = page.locator(
      '.highcharts-series-0 .highcharts-point'
    );
  }
}

module.exports = { EmiPage };