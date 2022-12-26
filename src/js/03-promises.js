import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[name=delay]');
const inputStep = document.querySelector('input[name=step]');
const inputAmount = document.querySelector('input[name=amount]');

form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  const delayValue = Number(inputDelay.value);
  const stepValue = Number(inputStep.value);
  const amountValue = Number(inputAmount.value);

  createNotification(amountValue, delayValue, stepValue);
}

function createNotification(amount, delay, step) {
  let newDelay = delay;
  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, newDelay).then((result) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${result.position} in ${result.delay}ms`);
    }).catch((result) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${result.position} in ${result.delay}ms`);
    });
    newDelay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

