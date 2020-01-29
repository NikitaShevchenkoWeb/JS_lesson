"use strict";

let isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    income = "Фриланс",
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 300000,
    period = 12;


let start = function() {
    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money))
};
start();


let showTypeOf = function(data) {
    console.log(data, typeof data);
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


console.log(addExpenses.length);

console.log("Период равен " + period + " месяцев");
console.log("Цель заработать " + mission + " рублей");

console.log(addExpenses.toLowerCase());


let expenses,
    amount,
    addExpense = [];

//сумма расходов
const getExpensesMonth = function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        expenses = prompt('Введите обязательную статью расходов?');

        do {
            amount = prompt('Во сколько это обойдется?');
        } while (!isNumber(amount))

        addExpense.push(expenses);
        sum += +amount;
    }

    return sum;
};

let expensesMonth = getExpensesMonth();
console.log("Доп.расходы: " + addExpense);
console.log("Расходы за месяц: " + expensesMonth);


//доход-расход
const getAccumulatedMonth = function (income, spending) {
    return +income - +spending;
};
let accumulatedMonth = getAccumulatedMonth(money, expensesMonth);
console.log("Накопления за месяц: " + accumulatedMonth);


//период достижения цели
const getTargetMonth = function (mission, accumulatedMonth) {
    return +mission / +accumulatedMonth;
};

let budgetDay = accumulatedMonth / 30;

let resGetTargetMonth = Math.ceil(getTargetMonth(mission, accumulatedMonth));
if (resGetTargetMonth > 0) {
    console.log("Цель будет достигнута за: " + resGetTargetMonth + " месяцев");
} else {
    console.log("Цель не будет достигнута");
}

console.log("Бюджет на день: " + Math.floor(budgetDay));


let getStatusIncome = function () {
    if (budgetDay >= 1200) {return ("У вас высокий уровень дохода");}
    else if (budgetDay > 600 && budgetDay < 1200 ) {return ("У вас средний уровень дохода");}
    else if (budgetDay <= 600) {return ("К сожалению у вас уровень дохода ниже среднего");}
    else console.log("Что то пошло не так");
};
console.log(getStatusIncome());