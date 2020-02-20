window.addEventListener('DOMContentLoaded', function () {
    'use strict';
    let count = 0;
    
    //Timer
    function countTimer(deadline) {
        const timerHours = document.querySelector('#timer-hours'),
              timerMinutes = document.querySelector('#timer-minutes'),
              timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);

            return {timeRemaining, hours, minutes, seconds};
        }

        function updateClock() {
            count = 1000;

            let timer = getTimeRemaining();

            timerHours.textContent = newChar(timer.hours);
            timerMinutes.textContent = newChar(timer.minutes);
            timerSeconds.textContent = newChar(timer.seconds);

            if (timer.timeRemaining <= 0) {
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';

                clearInterval(idInterval);
            }
        }

        function newChar(elem) {
            return elem < 10 ? "0" + elem : elem;
        }

        let idInterval = setInterval(updateClock, count);
    }

    countTimer('30 February 2020');


    //Menu
    const btnMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu'),
          menuItems = menu.querySelectorAll('ul>li'),
          closeBtn = document.querySelector('.close-btn');

    function toggleMenu() {
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);

        closeBtn.addEventListener('click', handlerMenu);

        menuItems.forEach((elem) => {
            elem.addEventListener('click', handlerMenu);
        });
    }

    toggleMenu();


    //popup
    const popup = document.querySelector('.popup'),
        popupContent = document.querySelector('.popup-content'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupClose = document.querySelector('.popup-close');

    function togglePopup() {
        popupBtn.forEach((elem) => {
           elem.addEventListener('click', () => {
              popup.style.display = 'block';

              if (screen.width > 768) {
                  modalAnimate();
              } else {
                  popupContent.style.top = '30%';
              }
           });
        });

        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';

            if (screen.width > 768) {
                countModalAnimate = 0;
                popupContent.style.top = '-100%';
            }
        });
    }

    togglePopup();


    //modal animate
    let countModalAnimate = 0;

    popupContent.style.top = '-100%';

    function modalAnimate() {
        countModalAnimate += 15;

        popupContent.style.top = countModalAnimate + 'px';
        if (countModalAnimate < 200) {
            setTimeout(modalAnimate, 15)
        }
    }


    //scroll
    function animateScroll(elem) {
        let elemId = elem.getAttribute('href'),
            block = document.querySelector(elemId);

        block.scrollIntoView({block: "start", behavior: "smooth"});
    }

    const menuItemsLink = menu.querySelectorAll('ul>li a');
    menuItemsLink.forEach((elem) => {
        elem.addEventListener('click', function (e) {
            e.preventDefault();
            animateScroll(elem);
        });
    });

    const scrollBtn = document.querySelector('main a');
    scrollBtn.addEventListener('click', function (e) {
        e.preventDefault();
        animateScroll(scrollBtn);
    });
});