import { API_KEY } from './key.js';

const initApp = () => {
  const currencyOne = document.getElementById(
    'currencyOne',
  ) as HTMLSelectElement;
  const currencyTwo = document.getElementById(
    'currencyTwo',
  ) as HTMLSelectElement;
  const amountOne = document.getElementById('amountOne') as HTMLInputElement;
  const amountTwo = document.getElementById('amountTwo') as HTMLInputElement;
  const rateEl = document.getElementById('rate') as HTMLParagraphElement;
  const swapBtn = document.getElementById('swap') as HTMLButtonElement;

  const fetchCurrency = async () => {
    const firstValue = currencyOne.value;

    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${firstValue}`,
    );

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const data = await response.json();
    return data;
  };

  currencyOne.addEventListener('change', () => {
    fetchCurrency().then((data) => {
      const rate = data.conversion_rates[currencyTwo.value];

      amountTwo.value = (Number(amountOne.value) * rate).toFixed(2);
      rateEl.innerText = `1 ${currencyOne.value} = ${rate.toFixed(2)} ${
        currencyTwo.value
      }`;
    });
  });

  amountOne.addEventListener('input', () => {
    fetchCurrency().then((data) => {
      const rate = data.conversion_rates[currencyTwo.value];

      amountTwo.value = (Number(amountOne.value) * rate).toFixed(2);

      rateEl.innerText = `1 ${currencyOne.value} = ${rate.toFixed(2)} ${
        currencyTwo.value
      }`;
    });
  });

  currencyTwo.addEventListener('change', () => {
    fetchCurrency().then((data) => {
      const rate = data.conversion_rates[currencyTwo.value];

      amountTwo.value = (+amountOne.value * rate.toFixed(2)).toFixed(2);
      rateEl.innerText = `1 ${currencyOne.value} = ${rate.toFixed(2)} ${
        currencyTwo.value
      }`;
    });
  });

  amountTwo.addEventListener('input', () => {
    fetchCurrency().then((data) => {
      const rate = data.conversion_rates[currencyOne.value];
      const rate2 = data.conversion_rates[currencyTwo.value];
      const calculatedRate = (rate / rate2).toFixed(2);

      amountOne.value = (+calculatedRate * +amountTwo.value).toFixed(2);
    });
  });

  swapBtn.addEventListener('click', () => {
    [currencyOne.value, currencyTwo.value] = [
      currencyTwo.value,
      currencyOne.value,
    ];

    fetchCurrency().then((data) => {
      const rate = data.conversion_rates[currencyTwo.value];

      amountTwo.value = (Number(amountOne.value) * rate).toFixed(2);
      rateEl.innerText = `1 ${currencyOne.value} = ${rate.toFixed(2)} ${
        currencyTwo.value
      }`;
    });
  });

  const displayData = () => {
    fetchCurrency().then((data) => {
      const rate = data.conversion_rates[currencyTwo.value];

      amountTwo.value = rate.toFixed(2);
      rateEl.innerText = `1 ${currencyOne.value} = ${rate.toFixed(2)} ${
        currencyTwo.value
      }`;
    });
  };

  displayData();
};

document.addEventListener('DOMContentLoaded', initApp);
