'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import smoothScrollingElem from './modules/smoothScrollingElem';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changePhoto from './modules/changePhoto';
import regularExpressions from './modules/regularExpressions';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

//таймер
countTimer();
//меню
toggleMenu();
//popup
togglePopup();
//элементы полученные для прокрутки
smoothScrollingElem();
//табы
tabs();
//слайдер
slider();
//изменение фото
changePhoto();
//регулярные выражения
regularExpressions();
//калькулятор
calc();
//send-ajax-form
sendForm();