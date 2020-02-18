window.addEventListener('DOMContentLoaded', function () {
    'use strict';
    let count = 0;
    
    //Timer
    function countTimer(deadline) {
        let deadLine = deadline;

        const timerHours = document.querySelector('#timer-hours'),
              timerMinutes = document.querySelector('#timer-minutes'),
              timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            let dateStop = new Date(deadLine).getTime(),
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
                let newNumberDay = Number.parseInt(newChar(deadline).slice(0, 2)) + 1;
                if (newNumberDay < 10) {newNumberDay += " "}
                let month = deadline.substring(2);
                deadLine = newNumberDay + month;

                count = 0;
                countTimer(deadLine);
            }
        }

        function newChar(elem) {
            return elem < 10 ? "0" + elem : elem;
        }

        setInterval(updateClock, count);
    }

    countTimer('18 February 2020');
});