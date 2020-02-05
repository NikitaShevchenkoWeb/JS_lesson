"use strict";

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


let money,
    start = function() {
        do {
            money = prompt('Ваш месячный доход?');
        } while (!isNumber(money))
    };
start();


let appData = {
    income: {},
    addIncome: [],
    addExpenses: [],
    deposit: false,
    mission: 300000,
    period: 12,
    expenses: {},
    addExpense: [],

    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            this.addExpenses = addExpenses.toLowerCase();
            this.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            let expense = prompt('Введите обязательную статью расходов?'),
                amount;

            do {
                amount = prompt('Во сколько это обойдется?');
            } while (!isNumber(amount));


            this.expenses[expense]  = +amount;
        }
    },

    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    //сумма расходов
    getExpensesMonth: function () {
        let sum = 0;

        for (let key in this.expenses) {
            sum += this.expenses[key];
        }

        return sum;
    },

    //доход-расход
    getBudget: function () {
        this.budgetMonth = +money - this.getExpensesMonth();
        this.budgetDay = this.budgetMonth / 30;
    },

    //период достижения цели
    getTargetMonth: function () {
        return +this.mission / +this.budgetMonth;
    },

    getStatusIncome: function () {
        if (this.budgetDay >= 1200) {return ("У вас высокий уровень дохода");}
        else if (this.budgetDay > 600 && this.budgetDay < 1200 ) {return ("У вас средний уровень дохода");}
        else if (this.budgetDay <= 600) {return ("К сожалению у вас уровень дохода ниже среднего");}
        else console.log("Что то пошло не так");
    }
};

appData.asking();
appData.getBudget();


console.log("Расходы за месяц: " + appData.getExpensesMonth());


let resGetTargetMonth = Math.ceil(appData.getTargetMonth());
if (resGetTargetMonth > 0) {
    console.log("Цель будет достигнута за: " + resGetTargetMonth + " месяцев");
} else {
    console.log("Цель не будет достигнута");
}


console.log(appData.getStatusIncome());


console.log("Наша программа включает в себя данные:");
for(let key in appData) {
    console.log(key + ": " + appData[key]);
}