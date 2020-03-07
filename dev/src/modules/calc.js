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


        const floor = (item) => {
            return Math.floor(item);
        };

        let anim = 0;

        const countSum = () => {
            //total animate
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
                total = floor(price * typeValue * squareValue * countValue * dayValue);
            }


            let animateID = 0;
            const stop = () => {
                let val = floor(total - animateID);

                if (val > 10000) {
                    animateID = animateID + 10000;
                } else if (val > 1000) {
                    animateID = animateID + 1000;
                } else if (val > 100) {
                    animateID = animateID + 100;
                } else if (val > 10) {
                    animateID = animateID + 10;
                } else if (val >= 0) {
                    animateID = animateID + 1;
                }

                totalValue.textContent = animateID;

                if (animateID !== floor(total)) { anim = requestAnimationFrame(stop); }
            };


            let square = +calcSquare.value;
            if ((square != 0 || calcSquare.value != '') && total != 0){ stop(); }
        };


        calcBlock.addEventListener('change', (e) => {
            const target = e.target;

            if (target.matches('select') || target.matches('input')) {
                cancelAnimationFrame(anim);
                countSum();
            }
        });
    };

    calc(100);
};

export default calcPrice;