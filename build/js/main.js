"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var money = prompt('Ваш месячный доход?'),
    income = "Фриланс",
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 300000,
    period = 12;
var expenses,
    amount,
    addAmount = [],
    addExpense = [];

for (var i = 0; i < 2; i++) {
  expenses = prompt('Введите обязательную статью расходов?');
  amount = prompt('Во сколько это обойдется?');
  addExpense.push(expenses);
  addAmount.push(amount);
}

var showTypeOf = function showTypeOf(data) {
  console.log(data, _typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log(addExpenses.length);
console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей");
console.log(addExpenses.toLowerCase()); //сумма расходов

var getExpensesMonth = function getExpensesMonth(amount1, amount2) {
  return +amount1 + +amount2;
};

var expensesMonth = getExpensesMonth(addAmount[0], addAmount[1]);
console.log("Доп.расходы: " + addExpense);
console.log("Расходы за месяц: " + expensesMonth); //доход-расход

var getAccumulatedMonth = function getAccumulatedMonth(income, spending) {
  return +income - +spending;
};

var accumulatedMonth = getAccumulatedMonth(money, expensesMonth);
console.log("Накопления за месяц: " + accumulatedMonth); //период достижения цели

var getTargetMonth = function getTargetMonth(mission, accumulatedMonth) {
  return +mission / +accumulatedMonth;
};

var budgetDay = accumulatedMonth / 30;
console.log("Цель будет достигнута за: " + Math.ceil(getTargetMonth(mission, accumulatedMonth)) + " месяцев");
console.log("Бюджет на день: " + Math.floor(budgetDay));

var getStatusIncome = function getStatusIncome() {
  if (budgetDay >= 1200) {
    return "У вас высокий уровень дохода";
  } else if (budgetDay > 600 && budgetDay < 1200) {
    return "У вас средний уровень дохода";
  } else if (budgetDay <= 600) {
    return "К сожалению у вас уровень дохода ниже среднего";
  } else console.log("Что то пошло не так");
};

console.log(getStatusIncome());