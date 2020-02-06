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
  addNewExpenses: [],
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 300000,
  period: 12,
  expenses: {},
  addExpense: [],
  asking: function asking() {
    var reg = /^[a-zA-zа-яА-ЯёЁ]+$/;
    var itemIncome,
        cashIncome,
        check,
        textError = '';

    do {
      if (confirm('Есть ли у вас дополнительный источник заработка?' + ' : ' + textError)) {
        itemIncome = prompt('Какой у вас дополнительный заработок?');
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?');

        if (reg.test(itemIncome) && isNumber(cashIncome)) {
          this.income[itemIncome] = cashIncome;
          check = true;
          textError = '';
        } else {
          check = false;
          textError = 'Неверный ввод!';
        }
      } else check = true;
    } while (!check);

    var addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    this.addNewExpenses = addExpenses.toLowerCase().split(',');
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this.addNewExpenses[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var item = _step.value;
        item = item.trim();
        item = item.charAt(0).toUpperCase() + item.slice(1);
        this.addExpenses.push(item);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    this.deposit = confirm('Есть ли у вас депозит в банке?');

    for (var i = 0; i < 2; i++) {
      var expense = prompt('Введите обязательную статью расходов?' + ' : ' + textError),
          amount = void 0;

      if (reg.test(expense)) {
        do {
          amount = prompt('Во сколько это обойдется?');
        } while (!isNumber(amount));

        this.expenses[expense] = +amount;
      } else {
        --i;
        textError = 'Неверный ввод!';
      }
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
  },
  getInfoDeposit: function getInfoDeposit() {
    if (this.deposit) {
      var percentDeposit, moneyDeposit;

      do {
        percentDeposit = prompt('Какой годовой процент?', '5');
        moneyDeposit = prompt('Какоя сумма заложена?', '10000');
      } while (!(isNumber(percentDeposit) && isNumber(moneyDeposit)));

      this.percentDeposit = percentDeposit;
      this.moneyDeposit = moneyDeposit;
    }
  },
  calcSavedMoney: function calcSavedMoney() {
    return this.budgetMonth * this.period;
  }
};
appData.asking();
appData.getBudget();
appData.getInfoDeposit();
console.log("Расходы за месяц: " + appData.getExpensesMonth());
console.log("Список расходов: " + appData.addExpenses.join(', '));
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