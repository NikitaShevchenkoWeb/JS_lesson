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
    addNewExpenses: [],
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 300000,
    period: 12,
    expenses: {},
    addExpense: [],

    asking: function() {
        let reg = /^[a-zA-zа-яА-ЯёЁ]+$/;
        let itemIncome,
            cashIncome,
            check,
            textError = '';
        do{
            if (confirm('Есть ли у вас дополнительный источник заработка?' + ' : ' + textError)) {
                itemIncome = prompt('Какой у вас дополнительный заработок?');
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?');
                if (reg.test(itemIncome) && isNumber(cashIncome)) {
                    this.income[itemIncome] = cashIncome;
                    check = true;
                    textError = '';
                } else {check = false; textError = 'Неверный ввод!';}
            } else check = true
        } while (!check);


        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        this.addNewExpenses = addExpenses.toLowerCase().split(',');
        for (let item of this.addNewExpenses) {
            item = item.trim();
            item = item.charAt(0).toUpperCase() + item.slice(1);
            this.addExpenses.push(item);
        }

        this.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            let expense = prompt('Введите обязательную статью расходов?' + ' : ' + textError),
                amount;

            if (reg.test(expense)) {
                do {
                    amount = prompt('Во сколько это обойдется?');
                } while (!isNumber(amount));

                this.expenses[expense]  = +amount;
            } else {--i; textError = 'Неверный ввод!';}
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
    },
    getInfoDeposit: function () {
        if (this.deposit) {
            let percentDeposit,
                moneyDeposit;

            do {
                percentDeposit = prompt('Какой годовой процент?', '5');
                moneyDeposit = prompt('Какоя сумма заложена?', '10000');
            } while (!(isNumber(percentDeposit) && isNumber(moneyDeposit)));

            this.percentDeposit = percentDeposit;
            this.moneyDeposit = moneyDeposit;
        }
    },
    calcSavedMoney: function () {
        return this.budgetMonth * this.period;
    }
};

appData.asking();
appData.getBudget();
appData.getInfoDeposit();


console.log("Расходы за месяц: " + appData.getExpensesMonth());

console.log("Список расходов: " + appData.addExpenses.join(', '));


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