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

           if (target.closest('.menu') || target.matches('menu ul>li a') || target.matches('menu a')) {
               handlerMenu();
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


    //data
    const team = document.querySelectorAll('.command .command__photo');
    let imgSrc;

    const teamPhoto = (elem) => {
        imgSrc = elem.getAttribute('src');
        elem.setAttribute('src', elem.dataset.img);
        elem.dataset.img = imgSrc;
    };

    team.forEach((elem) => {
        elem.addEventListener('mouseover', () => { teamPhoto(elem); });
        elem.addEventListener('mouseout', () => { teamPhoto(elem); });
    });


    //calc
    const calcInput = document.querySelectorAll('.calc-block input');

    calcInput.forEach((elem) => {
        elem.addEventListener('input', () => {
            elem.value = elem.value.replace(/[^\d]/g, '');
        });
    });

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
                dayValue = 1;

            const typeValue = calcType.options[calcType.selectedIndex].value,
                  squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10){
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }


            //total animate
            let totalValueS = document.getElementById('total'),
                totalValContent = +totalValueS.textContent,
                animateIDs = 0;

            const animateCalcTotal = (operation) => {
                if (operation) {
                    totalValContent +=200;
                    if (totalValContent <= total) {stop()}
                }
                else {
                    totalValContent -=200;
                    if (totalValContent >= total) {stop()}
                }
            };

            const stop = () => {
                totalValue.textContent = totalValContent;
                if (totalValContent === total) {clearInterval(animateIDs)}
            };

            if (totalValContent < total) {
                animateIDs = setInterval(animateCalcTotal, 10, true);
            } else if (totalValContent > total) {
                animateIDs = setInterval(animateCalcTotal, 10, false);
            }
        };


        calcBlock.addEventListener('change', (e) => {
           const target = e.target;

           if (target.matches('select') || target.matches('input')) {
               countSum();
           }
        });
    };

    calc(100);

    //send AJAX form
    const sendForm = (form) => {
        const errorMessage = 'Что-то пошло не так...',
              loadMessage = 'Загрузка...',
              successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

        // const form = document.getElementById('form1');

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem; color: white;';

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;

            const formData = new FormData(form);
            let body = {};
            formData.forEach((item, i) => {
                body[i] = item;
            });

            postData(body,
                () => {
                    statusMessage.textContent = successMessage;
            },
                (error) => {
                    statusMessage.textContent = errorMessage;
                    console.log(error);
            });
        });

        const postData = (body, outputData, errorData) => {
            const request = new XMLHttpRequest();

            request.addEventListener('readystatechange', ()=> {
                if(request.readyState !== 4) { return; }

                if (request.status === 200) { outputData(); clearForm(); }
                else { errorData(request.status); clearForm(); }
            });

            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');


            request.send(JSON.stringify(body));
        };

        //clear form
        const clearForm = () => {
            const formID = form.id,
                  formElem = document.querySelectorAll(`#${formID} input`);

            formElem.forEach((item) => { item.value = ''; });
        };
    };


    //validate form
    const form = (e) => {
        const form = e.target.closest('form');

        const validForm = () => {
            const formID = form.id,
                  formElem = document.querySelectorAll(`#${formID} input`);

            const regNum = /[^0-9\+]/g,
                  regStr = /[^А-Яа-яЁё\s]/g;

            const valid = (input) => {
                let val = input.value;

                if (input.type === 'tel' && regNum.test(val)) {
                    val = val.replace(regNum, '');
                    input.value = val;
                } else if ((input.getAttribute("placeholder") === "Ваше имя" ||
                            input.getAttribute("placeholder") === "Ваше сообщение") && regStr.test(val)) {
                    val = val.replace(regStr, '');
                    input.value = val;
                }
            };

            formElem.forEach((item) => { valid(item); })
        };

        form.addEventListener('input', validForm);
    };

    const forms = document.querySelectorAll('form');
    forms.forEach((item) => {
        item.addEventListener('click', form);
        sendForm(item);
    });

});