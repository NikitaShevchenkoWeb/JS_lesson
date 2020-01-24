"use strict";

let money = 50000,
    income = "Фриланс",
    addExpenses = "Кофе, Обед, Интернет, Такси",
    deposit = false,
    mission = 300000,
    period = 12;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей");


console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));

let budgetDay = money / 30;
console.log(budgetDay);