'use strict';

const elem = document.querySelector('body'),
      arrGreeting = ['Доброе утро!', 'Добрый день!', 'Добрый вечер!'],
      arrDay = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

function greeting() {
    let dateNow = new Date(),
        hours = dateNow.getHours();

    if ((hours >= 6) && (hours < 12)) {
        elem.innerHTML += arrGreeting[0];
    } else if ((hours >= 12) && (hours < 18)) {
        elem.innerHTML += arrGreeting[1];
    } else if (hours >= 18) {
        elem.innerHTML += arrGreeting[2];
    }


    elem.innerHTML += '<br>Сегодня: ' + arrDay[dateNow.getDay()];


    elem.innerHTML += '<br>Текущее время: ' + dateNow.toLocaleTimeString('en');


    let newYear = new Date('2021').getTime(),
        timeRemaining = (newYear - dateNow.getTime()) / 1000,
        lastDay = Math.floor(timeRemaining / 60 / 60 / 24);

    elem.innerHTML += '<br>До нового года осталось ' + lastDay + ' дней';
}

greeting();