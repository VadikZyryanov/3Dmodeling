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

    countTimer('30 april 2021');

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

    //изменение фото
    const changePhoto = () => {
        const photos = document.querySelectorAll('.command__photo');
        photos.forEach((photo) => {
            const changePhoto = () => {
                const src = photo.src;
                const twoSrc = photo.dataset.img;
                photo.src = twoSrc;
                photo.dataset.img = src;
            };
            photo.addEventListener('mouseenter', changePhoto);
            photo.addEventListener('mouseleave', changePhoto);
        });
    };

    changePhoto();

    //регулярные выражения
    const regularExpressions = () => {
        const formOneName = document.getElementById('form1-name'),
            formTwoName = document.getElementById('form2-name'),
            formThreeName = document.getElementById('form3-name'),
            formOneEmail = document.getElementById('form1-email'),
            formTwoEmail = document.getElementById('form2-email'),
            formThreeEmail = document.getElementById('form3-email'),
            formOnePhone = document.getElementById('form1-phone'),
            formTwoPhone = document.getElementById('form2-phone'),
            formThreePhone = document.getElementById('form3-phone'),
            inputMessage = document.getElementById('form2-message');

        const checkName = (input) => {
            input.value = input.value.replace(/[^А-Яа-яЁё|\s]/g, '');
            input.addEventListener('blur', () => {
                input.value = input.value.replace(/\s+/g, ' ');
                input.value = input.value.replace(/\-+/g, '-');
                input.value = input.value.replace(/^-+|-+$/g, '');
                input.value = input.value.trim();
                let number = input.value.split(' ');
                for (let i = 0; i < number.length; i++) {
                    number[i] = number[i][0].toUpperCase() + number[i].slice(1).toLowerCase();
                }
                input.value = number.join(' ');
            });
        };

        const checkEmail = (input) => {
            input.value = input.value.replace(/[^\w|\@|\-|\_|\.|\!|\~|\*|\']/g, '');
            input.addEventListener('blur', () => {
                input.value = input.value.replace(/\-+/g, '-');
                input.value = input.value.replace(/^-+|-+$/g, '');
            });
        };

        const checkPhone = (input) => {
            input.value = input.value.replace(/[^0-9|\+]/g, '');
            input.addEventListener('blur', () => {
                input.value = input.value.replace(/\-+/g, '-');
                input.value = input.value.replace(/^-+|-+$/g, '');
            });
        }

        formOneName.addEventListener('input', () => {
            checkName(formOneName);
        });

        formTwoName.addEventListener('input', () => {
            checkName(formTwoName);
        });

        formThreeName.addEventListener('input', () => {
            checkName(formThreeName);
        });

        formOneEmail.addEventListener('input', () => {
            checkEmail(formOneEmail);
        });

        formTwoEmail.addEventListener('input', () => {
            checkEmail(formTwoEmail);
        });

        formThreeEmail.addEventListener('input', () => {
            checkEmail(formThreeEmail);
        });

        formOnePhone.addEventListener('input', () => {
            checkPhone(formOnePhone);
        });

        formTwoPhone.addEventListener('input', () => {
            checkPhone(formTwoPhone);
        });

        formThreePhone.addEventListener('input', () => {
            checkPhone(formThreePhone);
        });

        inputMessage.addEventListener('input', () => {
            inputMessage.value = inputMessage.value.replace(/[^А-Яа-яЁё|\s|\d|.,!?]/g, '');
        });
        inputMessage.addEventListener('blur', () => {
            inputMessage.value = inputMessage.value.replace(/\s+/g, ' ');
            inputMessage.value = inputMessage.value.replace(/\-+/g, '-');
            inputMessage.value = inputMessage.value.replace(/^-+|-+$/g, '');
            inputMessage.value = inputMessage.value.trim();
        });
    };

    regularExpressions();

    //калькулятор
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1,
                i = 0;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;
            totalValue.textContent = 0;
                
            const addTotal = (tot) => {
                if (totalValue.textContent < tot) {
                    totalValue.textContent = i++;
                } else {
                    clearInterval(countTotal);
                }
            };

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }
            
            if (typeValue && squareValue) {
                total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
            }
            const countTotal = setInterval(() => {
                addTotal(total);
            }, 1);


            // totalValue.textContent = total;
        };
        
        calcBlock.addEventListener('change', (event) => {
            const target = event.target;

            if (target === calcType || target === calcSquare || 
                target === calcDay || target === calcCount) {
                    countSum();
                }
        });
    };

    calc(100);

    //send-ajax-form
    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так...',
            successMessage = 'Спасибо, мы скоро с вами свяжемся.';

        const formOne = document.getElementById('form1'),
            formTwo = document.getElementById('form2'),
            formThree = document.getElementById('form3');

        const statusMessage = document.createElement('section');
        statusMessage.className = 'section';

        const getForm = (form) => {
            form.addEventListener('submit', (event) => {
                const formName = form.querySelector('.form-name'),
                    formEmail = form.querySelector('.form-email'),
                    formPhone = form.querySelector('.form-phone');
                if (form.closest('.popup')) {
                    statusMessage.style.cssText = `font-size = 2rem;
                    color: white;`;
                } else {
                    statusMessage.style.cssText = `font-size = 2rem;`;
                }
                event.preventDefault();
                statusMessage.innerHTML = `
                    <div class="sk-rotating-plane"></div>
                    `;
                form.append(statusMessage);
                const formData = new FormData(form);
                let body = {};
                formData.forEach((val, key) => {
                    body[key] = val;
                });
                const timeOutPostData = () => postData(body,
                    () => {
                        statusMessage.textContent = successMessage;
                        formName.value = '';
                        formEmail.value = '';
                        formPhone.value = '';
                    },
                    (error) => {
                        statusMessage.textContent = errorMessage;
                        console.error(error);
                    }
                );
                setTimeout(timeOutPostData, 3000);
            });
        };

        const postData = (body, outputData, errorData) => {
            const request = new XMLHttpRequest();
            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) {
                    return;
                }
                if (request.status === 200) {
                    outputData();
                } else {
                    errorData(request.status);
                }
            });
            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');
            request.send(JSON.stringify(body));
        };

        getForm(formOne);
        getForm(formTwo);
        getForm(formThree);
    };

    sendForm();
});
