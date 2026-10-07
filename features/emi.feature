Feature: EMI Calculator

  Scenario: Validate Home Loan EMI for Scenario A
    Given I open the EMI Calculator
    When I navigate to the Home Loan section
    And I enter Home Loan Amount as "2500000"
    And I enter Interest Rate as "10"
    And I enter Loan Tenure as "10"
    Then the displayed EMI should match my calculated EMI
    And the EMI pie chart should be visible
    And the pie chart values should be greater than zero
    
  Scenario: Validate Home Loan EMI for Scenario B
    Given I open the EMI Calculator
    When I navigate to the Home Loan section
    And I enter Home Loan Amount as "5000000"
    And I enter Interest Rate as "7.5"
    And I enter Loan Tenure as "15"
    Then the displayed EMI should match my calculated EMI for Scenario B
    And the EMI pie chart should be visible
    And the pie chart values should be greater than zero

   Scenario: Validate Personal Loan EMI and repayment chart
    Given I open the EMI Calculator
    When I navigate to the Personal Loan section
    And I set Personal Loan Amount to "1000000"
    And I set Personal Loan Interest Rate to "12"
    And I set Personal Loan Tenure to "5"
        And I change the EMI schedule start month
And the personal loan bar chart should be visible
And the personal loan bar chart tooltip should contain a value