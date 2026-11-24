import { PREP_TIME } from './js/menu.js';

const formEl = document.querySelector('.form');
const orderLog = document.querySelector('.order-log');

formEl.addEventListener('change', event => {
  console.log(event.target.value);
  const drink = formEl.elements.drink.value;
  console.log(drink);
  const shouldResolve = formEl.elements.state.value;
  console.log(shouldResolve);
  let delay = PREP_TIME[drink];
  console.log(delay);

  console.log(orderLog);
  function makeOrder(drink, delay, shouldResolve) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve === 'fulfilled') {
          console.log(shouldResolve);
          resolve(drink);
        } else {
          console.log(shouldResolve);
          reject(drink);
        }
      }, delay);
    });
  }

  makeOrder(drink, delay, shouldResolve)
    .then(resultDrink => {
      console.log(resultDrink);
      orderLog.textContent = resultDrink;
    })
    .catch(cancelDrink => {
      console.log(cancelDrink);
      orderLog.textContent = `Cancel ${cancelDrink}`;
    });
});
