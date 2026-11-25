import { PREP_TIME } from './menu';

const formEl = document.querySelector('.form');
const orderLog = document.querySelector('.order-log');
const MAX_ORDERS = 5;

formEl.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const drinkName = formData.get('drink');
  const shouldResolve = formData.get('state') === 'fulfilled';
  const delay = PREP_TIME[drinkName] ?? 1000;
  const row = addOrderRow(drinkName);

  makeOrder(delay, shouldResolve)
    .then(coffeDoneTime => {
      row.classList.replace('row-pending', 'row-ok');
      row.textContent = `✅ ${drinkName} готове · ${coffeDoneTime}ms · `;
    })
    .catch(coffeCancelTime => {
      row.classList.replace('row-pending', 'row-err');
      row.textContent = `❌  ${drinkName} · скасоване ${coffeCancelTime}ms · `;
    })
    .finally(() => {
      const date = new Date().toLocaleTimeString('uk-UA');
      row.append(` · ${date}`);
      console.log(orderLog.querySelectorAll('li').length);
    });
});
function makeOrder(delay, shouldResolve) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
function addOrderRow(drinkName) {
  const newItem = document.createElement('li');

  newItem.textContent = `⏳ ${drinkName} · у роботі…`;
  newItem.classList.add('row-pending');
  orderLog.append(newItem);

  while (orderLog.children.length > MAX_ORDERS) {
    orderLog.firstElementChild.remove();
  }

  return newItem;
}
