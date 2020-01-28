"use strict";

let money = prompt('Ваш месячный доход?'),
    income = "Фриланс",
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 300000,
    period = 12;

let expenses,
    amount,
    addAmount = [],
    addExpense = [];
for (let i = 0; i < 2; i++) {
    expenses = prompt('Введите обязательную статью расходов?');
    amount = prompt('Во сколько это обойдется?');
    addExpense.push(expenses);
    addAmount.push(amount);
}


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


//сумма расходов
const getExpensesMonth = function (amount1, amount2) {
    return +amount1 + +amount2;
};
let expensesMonth = getExpensesMonth(addAmount[0], addAmount[1]);
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
console.log("Цель будет достигнута за: " + Math.ceil(getTargetMonth(mission, accumulatedMonth)) + " месяцев");
console.log("Бюджет на день: " + Math.floor(budgetDay));


let getStatusIncome = function () {
    if (budgetDay >= 1200) {return ("У вас высокий уровень дохода");}
    else if (budgetDay > 600 && budgetDay < 1200 ) {return ("У вас средний уровень дохода");}
    else if (budgetDay <= 600) {return ("К сожалению у вас уровень дохода ниже среднего");}
    else console.log("Что то пошло не так");
};
console.log(getStatusIncome());