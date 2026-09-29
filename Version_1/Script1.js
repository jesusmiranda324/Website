// JavaScript source code


//Timer Script
let timeleft = 120;
let timerId = null;

const timerDisplay = document.getElementById('time');
const startButton = document.getElementById('startBtn');

function startTimer() {
    if (timeleft <= 0) {
        timeleft = 120;
        timerDisplay.innerText = timeleft;
    }
    timerId = setInterval(() => {
        timeleft--;
        timerDisplay.innerText = timeleft;
        if (timeleft <= 0) {
            clearInterval(timerId);
            timerId = null;
        }
    }, 1000)
}

startButton.addEventListener('click', startTimer);
/*Need to add Stop and Set script...also, make timer look pretty and set miliseconds as well
... and convert to 00:00.000 format*/
//Change Next to Reset...makes more sense//
//Way to create a table based on inputs//
//Code Undo//
//Create Money Tracker//
