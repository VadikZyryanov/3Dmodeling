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

    countTimer('26 april 2021');

    //меню
    const toggleMenu = () => {
        const menu = document.querySelector('menu');

        const closeMenu = (event) => {
            let target = event.target;
            if (target.closest('.menu')) {
                menu.classList.add('active-menu');
            }
            if (target.classList.contains('close-btn') || target.getAttribute('href')) {
                menu.classList.remove('active-menu');
            }
            if (!target.closest('menu') && !target.closest('.menu')) {
                menu.classList.remove('active-menu');
            }
        };

        document.addEventListener('click', closeMenu);
    };

    toggleMenu();

    //popup
    const togglePopup = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
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

        popup.addEventListener('click', (event) => {
            let target = event.target;
            if (target.classList.contains('popup') || target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            }
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
    //элементы полученные для прокрутки
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
            const idItems = items.querySelector('a');
            idItems.addEventListener('click', event => {
                event.preventDefault();
                const id = idItems.getAttribute('href');
                smoothScrolling(id);
            });
        });
    }

    //табы
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            };
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');
            if (target.classList.contains('service-header-tab')) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();

    //слайдер
    const slider = () => {
        const slider = document.querySelector('.portfolio-content'),
            slide = document.querySelectorAll('.portfolio-item');
        let currentSlide = 0;
        let interval;

        const addDot = () => {
            const dots = document.querySelector('.portfolio-dots');
            for (let i = 0; i <= slide.length - 1; i++) {
                let doter = document.createElement('li');
                doter.classList.add('dot');
                if (i === 0) doter.classList.add('dot-active');
                dots.append(doter);
            }
        };
        addDot();

        const dot = document.querySelectorAll('.dot');

        const prevSlide = (elm, index, strClass) => {
            elm[index].classList.remove(strClass);
        };

        const nextSlide = (elm, index, strClass) => {
            elm[index].classList.add(strClass);
        }

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if(currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();
            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) return;

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') || 
            event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') || 
            event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide();
    };

    slider();
});
