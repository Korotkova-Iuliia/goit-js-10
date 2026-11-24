import { PREP_TIME } from './js/menu.js';

const formEl = document.querySelector('.form');
const orderLog = document.querySelector('.order-log');
let drinkName = '';
let shouldResolve;
let delay;

formEl.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);

  drinkName = formData.get('drink');
  shouldResolve = formData.get('state') === 'fulfilled';
  delay = PREP_TIME[drinkName];

  let row = addOrderRow(drinkName);

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
      let date = new Date().toLocaleTimeString('uk-UA');
      //   row.insertAdjacentHTML('beforeend', date);
      row.append(` · ${date}`);
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

  return newItem;
}
