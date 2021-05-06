const countTimer = () => {
    const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');
    // let deadline = '7 may 2021';
    const deadline = [new Date().getDate() + 1,
        new Date().toLocaleString('en', { month: 'long' }),
        new Date().getFullYear()].join(' ');
    const getTimeRemaining = () => {
        const dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
        return { timeRemaining, hours, minutes, seconds };
    };

    const updateClock = () => {
        const timer = getTimeRemaining();

        const getCheckTime = (time, timeNumbers) => {
            if (time < 10) {
                timeNumbers.textContent = '0' + time;
            } else {
                timeNumbers.textContent = time;
            }
        };

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

    };
    const startTimer = setInterval(updateClock, 1000);
};

export default countTimer;