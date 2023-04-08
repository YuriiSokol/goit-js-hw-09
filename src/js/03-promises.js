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
