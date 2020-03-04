'use strict';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calc from './modules/calc';
import sendForms from './modules/sendForm';


//Timer
countTimer('15 March 2020');

//Menu
toggleMenu();

//popup
togglePopup();

//tabs
tabs();

//slider
slider();

//calc
calc(100);

//send form
sendForms();