var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { API_KEY } from './key.js';
const initApp = () => {
    const currencyOne = document.getElementById('currencyOne');
    const currencyTwo = document.getElementById('currencyTwo');
    const amountOne = document.getElementById('amountOne');
    const amountTwo = document.getElementById('amountTwo');
    const rateEl = document.getElementById('rate');
    const swapBtn = document.getElementById('swap');
    const fetchCurrency = () => __awaiter(void 0, void 0, void 0, function* () {
        const firstValue = currencyOne.value;
        const response = yield fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${firstValue}`);
        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const data = yield response.json();
        return data;
    });
    currencyOne.addEventListener('change', () => {
        fetchCurrency().then((data) => {
            const rate = data.conversion_rates[currencyTwo.value];
            amountTwo.value = (Number(amountOne.value) * rate).toFixed(2);
            rateEl.innerText = `1 ${currencyOne.value} = ${rate.toFixed(2)} ${currencyTwo.value}`;
        });
    });
    amountOne.addEventListener('input', () => {
        fetchCurrency().then((data) => {
            const rate = data.conversion_rates[currencyTwo.value];
            amountTwo.value = (Number(amountOne.value) * rate).toFixed(2);
            rateEl.innerText = `1 ${currencyOne.value} = ${rate.toFixed(2)} ${currencyTwo.value}`;
        });
    });
    currencyTwo.addEventListener('change', () => {
        fetchCurrency().then((data) => {
            const rate = data.conversion_rates[currencyTwo.value];
            amountTwo.value = (+amountOne.value * rate.toFixed(2)).toFixed(2);
            rateEl.innerText = `1 ${currencyOne.value} = ${rate.toFixed(2)} ${currencyTwo.value}`;
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
            rateEl.innerText = `1 ${currencyOne.value} = ${rate.toFixed(2)} ${currencyTwo.value}`;
        });
    });
    const displayData = () => {
        fetchCurrency().then((data) => {
            const rate = data.conversion_rates[currencyTwo.value];
            amountTwo.value = rate.toFixed(2);
            rateEl.innerText = `1 ${currencyOne.value} = ${rate.toFixed(2)} ${currencyTwo.value}`;
        });
    };
    displayData();
};
document.addEventListener('DOMContentLoaded', initApp);
