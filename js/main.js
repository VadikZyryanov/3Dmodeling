window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    //таймер
    const countTimer = deadline => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

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

    countTimer('25 april 2021');

    //меню
    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', () => {
            handlerMenu();
        });
        closeBtn.addEventListener('click', () => {
            handlerMenu();
        });

        menuItems.forEach((items) => items.addEventListener('click', handlerMenu));
    };

    toggleMenu();

    //popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close'),
            popupContent = document.querySelector('.popup-content');

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                if (document.documentElement.clientWidth > 768) {
                    let count = -30;
                    popupContent.style.left = `${count}%`;
                    popup.style.display = 'block';
                    const getPopupContent = () => {
                        if (count <= 38) {
                            popupContent.style.left = `${count}%`;
                        } else {
                            clearInterval(popupContentAnimation);
                        }
                        count++;
                    };
                    const popupContentAnimation = setInterval(getPopupContent, 8);
                } else {
                    popup.style.display = 'block';
                }
            });
        });

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    };

    togglePopup();

    //плавная прокрутка
    const smoothScrolling = (idElem) => {
        const element = document.querySelector(idElem);
        const addSmoothScrolling = () => {
            let count = element.offsetTop - Math.floor(document.documentElement.scrollTop);
            if (count > 0) {
                document.documentElement.scrollTop += 10;
            } else {
                clearInterval(idAddSmoothScrolling);
            }
        };
        const idAddSmoothScrolling = setInterval(addSmoothScrolling, 5);
    };
    //элементы полученный для прокрутки
    {
        const btnServiceBlock = document.getElementsByTagName('a')[0],
            menu = document.querySelector('menu'),
            menuItems = menu.querySelectorAll('ul>li');

        btnServiceBlock.addEventListener('click', event => {
            event.preventDefault();
            const id = btnServiceBlock.getAttribute('href');
            smoothScrolling(id);
        });

        menuItems.forEach((items) => {
            items.addEventListener('click', event => {
                event.preventDefault();
                const idItems = items.querySelector('a');
                const id = idItems.getAttribute('href');
                console.log(id);
                smoothScrolling(id);
            });
        });
    }
});
