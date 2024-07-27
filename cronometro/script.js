let timer;
let minutes = 0;
let seconds = 0;
const display = document.getElementById('display');
const startButton = document.getElementById('startButton');
const beep = document.getElementById('beep');

startButton.addEventListener('click', startTimer);

function startTimer() {
    startButton.disabled = true;
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }

    display.textContent = formatTime(minutes) + ':' + formatTime(seconds);

    if (minutes === 2 && seconds === 30) {
        beep.play();
        clearInterval(timer);
        startButton.disabled = false;
    }
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}
