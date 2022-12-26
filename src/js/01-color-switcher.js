const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let intervalId = null;

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop)
function onStart() {
    startBtn.setAttribute('disabled', true);
    intervalId = setInterval(changeBgColor, 1000);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBgColor() {
    document.body.style.backgroundColor = getRandomHexColor();
}

function onStop() {
    startBtn.removeAttribute('disabled');
    clearInterval(intervalId)    
}

