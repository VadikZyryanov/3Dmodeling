window.addEventListener('DOMContentLoaded', () => {
    ' use strict ';

    //таймер
    const countTimer = deadline => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return { timeRemaining, hours, minutes, seconds };
        }

        function updateClock() {
            const timer = getTimeRemaining();

            function getCheckTime(time, timeNumbers) {
                if (time < 10) {
                    timeNumbers.textContent = '0' + time;
                } else {
                    timeNumbers.textContent = time;
                }
            }

            if (timer.timeRemaining <= 0) {
                clearInterval(startTimer);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            } else {
                getCheckTime(timer.hours, timerHours);
                getCheckTime(timer.minutes, timerMinutes);
                getCheckTime(timer.seconds, timerSeconds);
            }

        }
        let startTimer = setInterval(updateClock, 1000);
    };

    countTimer('23 april 2021');


});





