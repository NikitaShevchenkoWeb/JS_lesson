'use strict';

const calcPrice = () => {
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

            if (calcSquare.value === '') {return}


            //total animate
            let totalValueS = document.getElementById('total'),
                totalValContent = +totalValueS.textContent,
                animateIDs = 0;

            let block = true;
            const animateCalcTotal = (operation) => {

                if (block) {
                    calcType.setAttribute('disabled', 'disabled');

                    calcSquare.setAttribute('readonly', 'readonly');
                    calcDay.setAttribute('readonly', 'readonly');
                    calcCount.setAttribute('readonly', 'readonly');
                }


                if (operation) {
                    totalValContent +=200;
                    if (totalValContent <= total) {stop()}
                    else if (total === (total % totalValContent)) {
                        let remains = total % totalValContent;
                        stop(remains);
                    }
                }
                else {
                    totalValContent -=200;
                    if (totalValContent >= total) {stop()}
                    else if (total === (total % totalValContent)) {
                        let remains = total % totalValContent;
                        stop(remains);
                    }
                }
            };


            const stop = (remains = 0) => {
                if (remains === 0) {
                    totalValue.textContent = totalValContent;
                } else {
                    totalValContent = remains;
                    totalValue.textContent = Math.floor(remains);
                }

                if (Math.floor(totalValContent) === Math.floor(total)) {
                    clearInterval(animateIDs);

                    calcType.removeAttribute('disabled');
                    calcSquare.removeAttribute('readonly');
                    calcDay.removeAttribute('readonly');
                    calcCount.removeAttribute('readonly');

                }
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
};

export default calcPrice;