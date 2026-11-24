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
  shouldResolve = formData.get('state');
  delay = PREP_TIME[drinkName];
  let row = addOrderRow(drinkName);
  console.log(row);
  makeOrder(delay, shouldResolve)
    .then(coffeDoneTime => {
      console.log(`✅ ${drinkName} готове · ${coffeDoneTime}ms · `);
      row.classList.replace('row-pending', 'row-ok');
      row.textContent = `✅ ${drinkName} готове · ${coffeDoneTime}ms · `;
    })
    .catch(coffeCancelTime => {
      console.log(`❌  ${drinkName} · скасоване ${coffeCancelTime}ms ·`);
      row.classList.replace('row-pending', 'row-err');
      row.textContent = `❌  ${drinkName} · скасоване ${coffeCancelTime}ms ·`;
    })
    .finally(() => {
      delay;
    });
});
function makeOrder(delay, shouldResolve) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve === 'fulfilled') {
        console.log(shouldResolve);

        resolve(delay);
      } else {
        console.log(shouldResolve);
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
