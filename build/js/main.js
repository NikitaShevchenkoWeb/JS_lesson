"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var money = prompt('Ваш месячный доход?'),
    income = "Фриланс",
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 300000,
    period = 12,
    budgetMonth;
var expenses1 = prompt('Введите обязательную статью расходов?'),
    amount1 = prompt('Во сколько это обойдется?'),
    expenses2 = prompt('Введите обязательную статью расходов?'),
    amount2 = prompt('Во сколько это обойдется?');
console.log(_typeof(money));
console.log(_typeof(income));
console.log(_typeof(deposit));
console.log(addExpenses.length);
console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей");
console.log(addExpenses.toLowerCase());
budgetMonth = +money + +amount1 + +amount2;
console.log("Буджет на месяц " + budgetMonth);
console.log("Цель будет достигнута за: " + Math.ceil(mission / budgetMonth) + " месяцев");
var budgetDay = budgetMonth / 30;
console.log("Бюджет на день: " + Math.floor(budgetDay));

if (budgetDay >= 1200) {
  console.log("У вас высокий уровень дохода");
} else if (budgetDay > 600 && budgetDay < 1200) {
  console.log("У вас средний уровень дохода");
} else if (budgetDay <= 600) {
  console.log("К сожалению у вас уровень дохода ниже среднего");
} else console.log("Что то пошло не так");