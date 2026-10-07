\# Streamhub QA Automation Assessment



\## Project Overview



Playwright + Cucumber automation framework for testing the EMI Calculator application.



\## Application Under Test



https://emicalculator.net/



\## Test Coverage



\- Home Loan EMI - Scenario A

\- Home Loan EMI - Scenario B

\- Personal Loan EMI

\- EMI pie chart validation

\- Personal loan repayment bar chart validation

\- Dynamic loan values and tenure handling

\- EMI calculation validation



\## Test Execution



Run all tests with:



```bash

npx cucumber-js --require "step-definitions/\*\*/\*.js"

















































































































































































\## AI Self-Healing Locator Exercise



The framework demonstrates how AI-assisted self-healing can help recover from locator changes.



The approach is:



1\. Detect when an existing locator fails.

2\. Analyze the page DOM for alternative matching elements.

3\. Identify a more resilient locator using attributes such as role, label, text, or data-testid.

4\. Suggest or replace the broken locator.

5\. Keep the original locator and the repaired locator traceable for review.



For the assessment exercise, intentionally incorrect/brittle locators are maintained separately so the main test suite remains stable.

## Project Structure

```text
streamhub-qa-automation/
│
├── config/
│   └── environment.js
│
├── features/
│   └── emi.feature
│
├── pages/
│   └── emi.page.js
│
├── step-definitions/
│   └── emi.steps.js
│
├── self-healing/
│   └── broken-locators.js
│
├── README.md
└── package.json


## Latest Execution Result

The complete test suite was executed successfully.

- 3 scenarios passed
- 27 steps passed
- Personal Loan bar chart validated
- Personal Loan tooltip value validated