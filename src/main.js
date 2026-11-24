import { PREP_TIME } from './js/menu.js';

const formEl = document.querySelector('.form');
const orderLog = document.querySelector('.order-log');
let drinkName = '';
let shouldResolve = '';
let delay;

formEl.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  drinkName = formData.get('drink');
  shouldResolve = formData.get('state');
  delay = PREP_TIME[drinkName];
  //   console.log(event.target.value);
  //   const drink = formEl.elements.drink.value;
  //   const Resolve = formEl.elements.state;
  //   console.log(Resolve);
  console.log(drinkName);
  console.log(shouldResolve);
  console.log(delay);

  makeOrder(delay, shouldResolve)
    .then(resultDrink => {
      console.log(resultDrink);
      //   orderLog.textContent = resultDrink;
    })
    .catch(cancelDrink => {
      console.log(cancelDrink);
      //   orderLog.textContent = `Cancel ${cancelDrink}`;
    })
    .finally(() => console.log(delay));
});
function makeOrder(delay, shouldResolve) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve === 'fulfilled') {
        console.log(shouldResolve);
        console.log(`'заказ принят' ${delay}`);
        resolve(delay);
      } else {
        console.log(shouldResolve);
        console.log(`'заказ отклонен' ${delay}`);
        reject(delay);
      }
    }, delay);
  });
}
function addOrderRow(drinkName) {
  //     створює елемент <li>;
  // дає йому клас row-pending і текст «у роботі…», наприклад ⏳ Капучино · у роботі…;
  // додає його в список журналу (той, що ти зберіг у змінну);
  // повертає цей елемент — бо його оновиш пізніше.
}
