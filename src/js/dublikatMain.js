import { PREP_TIME } from './js/menu.js';

const formEl = document.querySelector('.form');
const orderLog = document.querySelector('.order-log');

function makeOrder(waitTime, shouldResolve) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(waitTime);
      } else {
        reject(waitTime);
      }
    }, waitTime);
  });
}

function addOrderRow(drinkName) {
  const newItem = document.createElement('li');
  newItem.classList.add('row-pending');
  newItem.textContent = `⏳ ${drinkName} · у роботі…`;
  orderLog.append(newItem);

  return newItem;
}

function updateOrderRow(row, status, drinkName, finishedDelay) {
  const finishedAt = new Date().toLocaleTimeString('uk-UA');
  const isSuccess = status === 'ok';

  row.classList.remove('row-pending');
  row.classList.add(isSuccess ? 'row-ok' : 'row-err');

  const icon = isSuccess ? '✅' : '❌';
  const label = isSuccess ? 'готове' : 'скасовано';

  row.textContent = `${icon} ${drinkName} · ${label} · ${finishedDelay} ms · ${finishedAt}`;
}

formEl.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const drinkName = formData.get('drink');
  const shouldResolve = formData.get('state') === 'fulfilled';
  const delay = PREP_TIME[drinkName] ?? 1000;

  const row = addOrderRow(drinkName);

  makeOrder(delay, shouldResolve)
    .then(finishedDelay => {
      updateOrderRow(row, 'ok', drinkName, finishedDelay);
    })
    .catch(finishedDelay => {
      updateOrderRow(row, 'err', drinkName, finishedDelay);
    });
});
