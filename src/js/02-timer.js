import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button');

let remaningTime = undefined;
let selectedDate = undefined;
startBtn.disabled = true;

// adding leading zeros to time
function addLeadingZero(value) {
  if (value < 0) return '00';
  if (value.toString().length < 2) {
    return value.toString().padStart(2, 0);
  }
  return value;
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    startBtn.disabled = false;
    console.log(selectedDates[0]);
    if (selectedDates[0].getTime() <= Date.now()) {
      startBtn.disabled = true;
      //  alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }

    // const d2 = selectedDates[0].getTime();
    // const d1 = Date.now();
    // remaningTime = d2 - d1;
    selectedDate = selectedDates[0];
    return selectedDates[0];
  },
};

let selectedDates = flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
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

const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let intervalId = null;
const stopInterval = () => {
  clearInterval(intervalId);
};
const startInterval = () => {
  if (intervalId) clearInterval(intervalId);

  intervalId = setInterval(() => {
    daysSpan.innerHTML = addLeadingZero(convertMs(remaningTime).days);
    hoursSpan.innerHTML = addLeadingZero(convertMs(remaningTime).hours);
    minutesSpan.innerHTML = addLeadingZero(convertMs(remaningTime).minutes);
    secondsSpan.innerHTML = addLeadingZero(convertMs(remaningTime).seconds);
    remaningTime -= 1000;

    if (remaningTime < 0) stopInterval();
  }, 1000);
};

startBtn.addEventListener('click', () => {
  // disabling date input and btn
  startBtn.disabled = true;
  remaningTime = selectedDate.getTime() - Date.now();
  startInterval();
});
