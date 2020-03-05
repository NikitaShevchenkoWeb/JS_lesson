'use strict';

import countTimers from './modules/countTimer';
import menu from './modules/toggleMenu';
import popup from './modules/togglePopup';
import tabs from './modules/tabs';
import sliders from './modules/slider';
import calcPrice from './modules/calc';
import sendForms from './modules/sendForm';


//Timer
countTimers();

//Menu
menu();

//popup
popup();

//tabs
tabs();

//slider
sliders();

//calc
calcPrice();

//send form
sendForms();