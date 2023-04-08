import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Block } from 'notiflix/build/notiflix-block-aio';
const form = document.querySelector('.form');
const firstDeleyInput = form.querySelector(':nth-child(1) > input');
const deleyStepInput = form.querySelector(':nth-child(2) > input');
const amountInput = form.querySelector(':nth-child(3) > input');
const createBtn = form.querySelector('button');
let promisesCounter = 0;
let FinishedPromises = 0;
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      FinishedPromises = countFinishedPrmomisesAndDisableBtn(FinishedPromises);
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}
const countFinishedPrmomisesAndDisableBtn = i => {
  if (i === promisesCounter - 1) {
    createBtn.disabled = false;

    return;
  }
  return (i = i + 1);
};
const onCreateBtnClick = event => {
  event.preventDefault();
  createBtn.disabled = true;
  FinishedPromises = 0;
  promisesCounter = 0;
  const promisesTimeArray = createPromisesTimeArray(
    firstDeleyInput.value,
    deleyStepInput.value,
    amountInput.value
  );

  for (let i = 0; i < promisesTimeArray.length; i++) {
    createPromise(i + 1, promisesTimeArray[i])
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
};

const createPromisesTimeArray = (firstDeley, deleyStep, amount) => {
  const array = [];
  for (let i = 0; i < amount; i++) {
    if (i === 0) {
      array[i] = parseInt(firstDeley);
    } else {
      array[i] = parseInt(deleyStep) * i + parseInt(firstDeley);
    }
  }
  promisesCounter = array.length;
  return array;
};

createBtn.addEventListener('click', onCreateBtnClick);
