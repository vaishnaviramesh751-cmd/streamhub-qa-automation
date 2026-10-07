const {
  Given,
  When,
  Then,
  After,
  setDefaultTimeout
} = require('@cucumber/cucumber');

const { chromium } = require('playwright');
const { EmiPage } = require('../pages/emi.page');
const { baseUrl } = require('../config/environment');
setDefaultTimeout(30000);

let browser;
let page;
let emiPage;

Given('I open the EMI Calculator', async function () {
  browser = await chromium.launch({
    headless: false
  });

  page = await browser.newPage();

  emiPage = new EmiPage(page);

await page.goto(baseUrl, {    waitUntil: 'commit',
    timeout: 30000
  });

  await page.waitForTimeout(8000);
});

When('I navigate to the Home Loan section', async function () {
  await emiPage.homeLoanTab.waitFor({
    state: 'visible',
    timeout: 15000
  });

  await emiPage.homeLoanTab.click();
});

When('I navigate to the Personal Loan section', async function () {
  await emiPage.personalLoanTab.waitFor({
    state: 'visible',
    timeout: 15000
  });

  await emiPage.personalLoanTab.click();
});

When('I enter Home Loan Amount as "2500000"', async function () {
  await emiPage.homeLoanAmount.fill('2500000');

  await emiPage.homeLoanAmount.evaluate((el) => {
    window.jQuery(el).trigger('change');
  });

  await page.waitForTimeout(500);
});

When('I enter Home Loan Amount as "5000000"', async function () {
  await emiPage.homeLoanAmount.fill('5000000');

  await emiPage.homeLoanAmount.evaluate((el) => {
    window.jQuery(el).trigger('change');
  });

  await page.waitForTimeout(500);
});

When('I set Personal Loan Amount to "1000000"', async function () {
  await emiPage.personalLoanAmount.fill('1000000');

  await emiPage.personalLoanAmount.evaluate((el) => {
    window.jQuery(el).trigger('change');
  });

  await page.waitForTimeout(500);
});

When('I enter Interest Rate as "10"', async function () {
  await emiPage.interestRate.fill('10');

  await emiPage.interestRate.evaluate((el) => {
    window.jQuery(el).trigger('change');
  });

  await page.waitForTimeout(500);
});

When('I enter Interest Rate as "7.5"', async function () {
  await emiPage.interestRate.fill('7.5');

  await emiPage.interestRate.evaluate((el) => {
    window.jQuery(el).trigger('change');
  });

  await page.waitForTimeout(500);
});

When('I set Personal Loan Interest Rate to "12"', async function () {
  await emiPage.personalLoanInterestRate.fill('12');

  await emiPage.personalLoanInterestRate.evaluate((el) => {
    window.jQuery(el).trigger('change');
  });

  await page.waitForTimeout(500);
});

When('I enter Loan Tenure as "10"', async function () {
  const sliderHandle = page
    .locator('#loantermslider .ui-slider-handle')
    .first();

  await sliderHandle.focus();

  await sliderHandle.press('Home');

  await page.waitForTimeout(500);

  for (let i = 0; i < 18; i++) {
    await sliderHandle.press('ArrowRight');
    await page.waitForTimeout(100);
  }

  await page.waitForTimeout(1000);

  console.log(
    'AFTER SLIDER:',
    await emiPage.loanTenure.inputValue(),
    await emiPage.homeLoanAmount.inputValue(),
    await emiPage.interestRate.inputValue()
  );

  await emiPage.homeLoanAmount.fill('2500000');

  await emiPage.homeLoanAmount.evaluate((el) => {
    window.jQuery(el).trigger('change');
  });

  await page.waitForTimeout(500);

  await emiPage.interestRate.fill('10');

  await emiPage.interestRate.evaluate((el) => {
    window.jQuery(el).trigger('change');
  });

  await page.waitForTimeout(1000);

  console.log(
    'SCENARIO A FINAL VALUES:',
    await emiPage.loanTenure.inputValue(),
    await emiPage.homeLoanAmount.inputValue(),
    await emiPage.interestRate.inputValue()
  );
});

When('I enter Loan Tenure as "15"', async function () {
  const sliderHandle = page
    .locator('#loantermslider .ui-slider-handle')
    .first();

  await sliderHandle.focus();

  await sliderHandle.press('Home');

  await page.waitForTimeout(500);

  for (let i = 0; i < 28; i++) {
    await sliderHandle.press('ArrowRight');
    await page.waitForTimeout(100);
  }

  await page.waitForTimeout(1000);

  await emiPage.homeLoanAmount.fill('5000000');

  await emiPage.homeLoanAmount.evaluate((el) => {
    window.jQuery(el).trigger('change');
  });

  await page.waitForTimeout(500);

  await emiPage.interestRate.fill('7.5');

  await emiPage.interestRate.evaluate((el) => {
    window.jQuery(el).trigger('change');
  });

  await page.waitForTimeout(1000);

  console.log(
    'SCENARIO B FINAL VALUES:',
    await emiPage.loanTenure.inputValue(),
    await emiPage.homeLoanAmount.inputValue(),
    await emiPage.interestRate.inputValue()
  );
});

When('I set Personal Loan Tenure to "5"', async function () {
  const sliderHandle = emiPage.personalLoanTenureSlider;

  await sliderHandle.focus();

  for (let i = 0; i < 18; i++) {
    await sliderHandle.press('ArrowRight');
  }

  await page.waitForTimeout(1000);

  console.log(
    'PERSONAL LOAN TENURE:',
    await emiPage.loanTenure.inputValue()
  );

  console.log(
    'PERSONAL LOAN AMOUNT:',
    await emiPage.personalLoanAmount.inputValue()
  );

  console.log(
    'PERSONAL LOAN INTEREST:',
    await emiPage.personalLoanInterestRate.inputValue()
  );
});

When('I change the EMI schedule start month', async function () {
  await emiPage.scheduleStartDate.click();

  const calendar = page.locator('.datepicker-months');

  await calendar.waitFor({
    state: 'visible',
    timeout: 5000
  });

  await calendar
    .locator('span.month')
    .filter({ hasText: 'Jan' })
    .click();

  await page.waitForTimeout(1000);

  const selectedDate = await emiPage.scheduleStartDate.inputValue();

  console.log(
    'SCHEDULE START DATE:',
    selectedDate
  );

  if (!selectedDate.includes('Jan')) {
    throw new Error(
      `Schedule start month was not changed to January. Actual value: ${selectedDate}`
    );
  }
});

function calculateEMI(principal, annualRate, years) {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;

  return (
    principal *
    monthlyRate *
    Math.pow(1 + monthlyRate, months) /
    (Math.pow(1 + monthlyRate, months) - 1)
  );
}

Then('the displayed EMI should match my calculated EMI', async function () {
  const expectedEMI = Math.round(
    calculateEMI(2500000, 10, 10)
  );

  const emiSection = emiPage.loanEmiHeading.locator('..');

  const emiText = await emiSection.innerText();

  const match = emiText.match(/₹\s*([\d,]+)/);

  if (!match) {
    throw new Error('EMI amount was not found on the page');
  }

  const displayedEMI = Number(
    match[1].replace(/,/g, '')
  );

  console.log('Expected EMI:', expectedEMI);
  console.log('Displayed EMI:', displayedEMI);

  if (displayedEMI !== expectedEMI) {
    throw new Error(
      `EMI mismatch. Expected: ${expectedEMI}, Displayed: ${displayedEMI}`
    );
  }
});

Then(
  'the displayed EMI should match my calculated EMI for Scenario B',
  async function () {
    const expectedEMI = Math.round(
      calculateEMI(5000000, 7.5, 15)
    );

    const emiSection = emiPage.loanEmiHeading.locator('..');

    const emiText = await emiSection.innerText();

    const match = emiText.match(/₹\s*([\d,]+)/);

    if (!match) {
      throw new Error('EMI amount was not found on the page');
    }

    const displayedEMI = Number(
      match[1].replace(/,/g, '')
    );

    console.log(
      'Expected EMI Scenario B:',
      expectedEMI
    );

    console.log(
      'Displayed EMI Scenario B:',
      displayedEMI
    );

    if (displayedEMI !== expectedEMI) {
      throw new Error(
        `EMI mismatch. Expected: ${expectedEMI}, Displayed: ${displayedEMI}`
      );
    }
  }
);

Then('the EMI pie chart should be visible', async function () {
  const chart = page
    .locator('.highcharts-container')
    .first();

  await chart.waitFor({
    state: 'visible',
    timeout: 10000
  });

  console.log('EMI pie chart is visible');
});

Then('the pie chart values should be greater than zero', async function () {
  const text = await page.locator('body').innerText();

  const values = text.match(/\d+(\.\d+)?%/g);

  if (!values || values.length < 2) {
    throw new Error('Pie chart values were not found');
  }

  const firstValue = parseFloat(values[0]);
  const secondValue = parseFloat(values[1]);

  console.log(
    'Pie chart values:',
    firstValue,
    secondValue
  );

  if (firstValue <= 0 || secondValue <= 0) {
    throw new Error(
      'Pie chart values should be greater than zero'
    );
  }
});

Then('the personal loan bar chart should be visible', async function () {
  await emiPage.principalBars.first().waitFor({
    state: 'visible',
    timeout: 10000
  });
   const barCount = await emiPage.principalBars.count();

  console.log(
    'PERSONAL LOAN PRINCIPAL BAR COUNT:',
    barCount
  );

  if (barCount === 0) {
    throw new Error(
      'Personal Loan bar chart bars were not found'
    );
  }
});

Then('the personal loan bar chart tooltip should contain a value', async function () {
  const firstBar = emiPage.principalBars.first();

  await firstBar.waitFor({
    state: 'visible',
    timeout: 10000
  });

  await firstBar.hover();

  const tooltip = page.locator('.highcharts-tooltip');

  await tooltip.waitFor({
    state: 'visible',
    timeout: 5000
  });

 const tooltipText = await tooltip.textContent();

  console.log('PERSONAL LOAN TOOLTIP:', tooltipText);

  if (!/\d/.test(tooltipText)) {
    throw new Error(
      `Tooltip does not contain a numerical value: ${tooltipText}`
    );
  }
});

After(async function () {
  if (browser) {
    await browser.close();
  }

  browser = null;
  page = null;
  emiPage = null;
});