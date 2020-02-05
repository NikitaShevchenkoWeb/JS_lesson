"use strict";

var isNumber = function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

var money,
    start = function start() {
  do {
    money = prompt('Ваш месячный доход?');
  } while (!isNumber(money));
};

start();
var appData = {
  income: {},
  addIncome: [],
  addExpenses: [],
  deposit: false,
  mission: 300000,
  period: 12,
  expenses: {},
  addExpense: [],
  asking: function asking() {
    var addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    this.addExpenses = addExpenses.toLowerCase();
    this.deposit = confirm('Есть ли у вас депозит в банке?');

    for (var i = 0; i < 2; i++) {
      var expense = prompt('Введите обязательную статью расходов?'),
          amount = void 0;

      do {
        amount = prompt('Во сколько это обойдется?');
      } while (!isNumber(amount));

      this.expenses[expense] = +amount;
    }
  },
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  //сумма расходов
  getExpensesMonth: function getExpensesMonth() {
    var sum = 0;

    for (var key in this.expenses) {
      sum += this.expenses[key];
    }

    return sum;
  },
  //доход-расход
  getBudget: function getBudget() {
    this.budgetMonth = +money - this.getExpensesMonth();
    this.budgetDay = this.budgetMonth / 30;
  },
  //период достижения цели
  getTargetMonth: function getTargetMonth() {
    return +this.mission / +this.budgetMonth;
  },
  getStatusIncome: function getStatusIncome() {
    if (this.budgetDay >= 1200) {
      return "У вас высокий уровень дохода";
    } else if (this.budgetDay > 600 && this.budgetDay < 1200) {
      return "У вас средний уровень дохода";
    } else if (this.budgetDay <= 600) {
      return "К сожалению у вас уровень дохода ниже среднего";
    } else console.log("Что то пошло не так");
  }
};
appData.asking();
appData.getBudget();
console.log("Расходы за месяц: " + appData.getExpensesMonth());
var resGetTargetMonth = Math.ceil(appData.getTargetMonth());

if (resGetTargetMonth > 0) {
  console.log("Цель будет достигнута за: " + resGetTargetMonth + " месяцев");
} else {
  console.log("Цель не будет достигнута");
}

console.log(appData.getStatusIncome());
console.log("Наша программа включает в себя данные:");

for (var key in appData) {
  console.log(key + ": " + appData[key]);
}