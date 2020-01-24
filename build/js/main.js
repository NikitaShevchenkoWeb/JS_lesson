"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var money = 50000,
    income = "Фриланс",
    addExpenses = "Кофе, Интернет, Такси",
    deposit = false,
    mission = 300000,
    period = 12;
console.log(_typeof(money));
console.log(_typeof(income));
console.log(_typeof(deposit));
console.log(addExpenses.length);
console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей");
console.log(addExpenses.toLowerCase());
var budgetDay = money / 30;
console.log(budgetDay);