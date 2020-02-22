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
    const menu = document.querySelector('menu');

    function toggleMenu() {
        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        document.addEventListener('click', (e) => {
           let target = e.target;
           // console.log(target);

           if (target.closest('.menu') || target.matches('menu ul>li a') || target.matches('menu a')) {
               handlerMenu();
           }

           if (!target.closest('.menu')) {
               menu.classList.remove('active-menu');
           }
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

        popup.addEventListener('click', (e) => {
            let target = e.target;
                target = target.closest('.popup-content');

                if (!target) {
                    popup.style.display = 'none';
                }
        })
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


    //tabs
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
          }
        };

        tabHeader.addEventListener('click', (e) => {
            let target = e.target;
                target = target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }

        })
    };

    tabs();


    //slider
    const dotAdd = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
              dots = document.querySelector('.portfolio-dots');
        slide.forEach(() => {
            let dotElem = document.createElement('li');
            dots.appendChild(dotElem);
            dotElem.classList.add('dot');
        });

        let newDots = document.querySelectorAll('.dot');
        newDots[0].classList.add('dot-active');
    };

    dotAdd();

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
              btn = document.querySelectorAll('.portfolio-btn'),
              dot = document.querySelectorAll('.dot'),
              slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
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

        slider.addEventListener('click', (e) => {
           e.preventDefault();
           let target = e.target;

           if (!target.matches('.portfolio-btn, .dot')) {return;}

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
                })
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

        slider.addEventListener('mouseover', (e) => {
            let target = e.target;
            if (target.matches('.portfolio-btn') || target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (e) => {
            let target = e.target;
            if (target.matches('.portfolio-btn') || target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(3000);
    };

    slider();
});