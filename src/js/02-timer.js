import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
let intervalId = null;
let isActive;
let selectedDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (isActive) {
            return;
        }
        
        selectedDate = selectedDates[0];

        if (selectedDate < new Date()) {
            Notiflix.Notify.warning('Please choose a date in the future');
            return;
        }
        startBtn.removeAttribute('disabled');
    },
};


flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', onStart);

function onStart() {
    if (!isActive) {
        intervalId = setInterval(() => {
            const timeLeft = selectedDate - new Date();
            const convertedTime = convertMs(timeLeft);
        
            days.textContent = addLeadingZero(convertedTime.days);
            hours.textContent = addLeadingZero(convertedTime.hours);
            minutes.textContent = addLeadingZero(convertedTime.minutes);
            seconds.textContent = addLeadingZero(convertedTime.seconds);

            if (timeLeft < 1000) {
                clearInterval(intervalId)
            }

        }, 1000);
    }
    isActive = true;   
}

function convertMs(ms) {
 
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}




