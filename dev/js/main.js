"use strict";

let btnCalculate = document.getElementById('start');

let incomePlus = document.getElementsByTagName('button')[0];
let expensesPlus = document.getElementsByTagName('button')[1];

let checkBox = document.querySelector('#deposit-check');

// let incomeItemOne = document.querySelectorAll('.additional_income-item')[0];
// let incomeItemTwo = document.querySelectorAll('.additional_income-item')[1];
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');


let budgetMonth = document.querySelectorAll('.result-total')[0],
    budgetDay = document.querySelectorAll('.result-total')[1],
    expensesMonth = document.querySelectorAll('.result-total')[2],
    additionalIncome = document.querySelectorAll('.result-total')[3],
    additionalExpenses = document.querySelectorAll('.result-total')[4],
    incomePeriod = document.querySelectorAll('.result-total')[5],
    targetMonth = document.querySelectorAll('.result-total')[6];


let monthIncome = document.querySelector('.salary-amount'),
    incomeItem = document.querySelectorAll('.income-items'),
    // addIncomeTitle = document.querySelector('.income-title'),
    // addIncomeAmount = document.querySelector('.income-amount'),
    // addExpensesTitle = document.querySelector('.expenses-title'),

    // addExpensesAmount = document.querySelector('.expenses-amount'),
    expensesItems = document.querySelectorAll('.expenses-items'),

    possibleExpenses = document.querySelector('.additional_expenses-item'),
    target = document.querySelector('.target-amount'),
    range = document.querySelector('.period-select');




let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};



let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    addNewExpenses: [],
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    expenses: {},
    addExpense: [],

    start: function() {
        appData.budget = +monthIncome.value;

        appData.getExpenses();

        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getIncome();
        appData.getBudget();
        // appData.getInfoDeposit();


        appData.showResult();
    },

    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);

        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {expensesPlus.style.display = 'none'}
    },

    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);

        incomeItem = document.querySelectorAll('.income-items');
        if (incomeItem.length === 3) {incomePlus.style.display = 'none'}
    },

    getExpenses: function() {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        })
    },

    getIncome: function() {
        incomeItem.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = +cashIncome;
            }
        });

        // let reg = /^[a-zA-zа-яА-ЯёЁ]+$/;
        // let itemIncome,
        //     cashIncome,
        //     check,
        //     textError = '';
        // do{
        //     if (confirm('Есть ли у вас дополнительный источник заработка?' + ' : ' + textError)) {
        //         itemIncome = prompt('Какой у вас дополнительный заработок?');
        //         cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?');
        //         if (reg.test(itemIncome) && isNumber(cashIncome)) {
        //             this.income[itemIncome] = cashIncome;
        //             check = true;
        //             textError = '';
        //         } else {check = false; textError = 'Неверный ввод!';}
        //     } else check = true
        // } while (!check);


        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },

    getAddExpenses: function() {
        let addExpenses = possibleExpenses.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        })
    },

    getAddIncome: function() {
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        })
    },

    showResult: function() {
        budgetMonth.value = appData.budgetMonth;
        budgetDay.value = Math.ceil(appData.budgetDay);
        expensesMonth.value = appData.expensesMonth;
        additionalExpenses.value = appData.addExpenses.join(', ');
        additionalIncome.value = appData.addIncome.join(', ');
        targetMonth.value = Math.ceil(appData.getTargetMonth());

        incomePeriod.value = appData.calcSavedMoney();
        range.addEventListener('input', function () {
            incomePeriod.value = appData.calcSavedMoney();
        });
    },

    asking: function() {
        // let reg = /^[a-zA-zа-яА-ЯёЁ]+$/;
        // let itemIncome,
        //     cashIncome,
        //     check,
        //     textError = '';
        // do{
        //     if (confirm('Есть ли у вас дополнительный источник заработка?' + ' : ' + textError)) {
        //         itemIncome = prompt('Какой у вас дополнительный заработок?');
        //         cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?');
        //         if (reg.test(itemIncome) && isNumber(cashIncome)) {
        //             this.income[itemIncome] = cashIncome;
        //             check = true;
        //             textError = '';
        //         } else {check = false; textError = 'Неверный ввод!';}
        //     } else check = true
        // } while (!check);


        // let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        // this.addNewExpenses = addExpenses.toLowerCase().split(',');
        // for (let item of this.addNewExpenses) {
        //     item = item.trim();
        //     item = item.charAt(0).toUpperCase() + item.slice(1);
        //     this.addExpenses.push(item);
        // }
        //
        // this.deposit = confirm('Есть ли у вас депозит в банке?');

        // for (let i = 0; i < 2; i++) {
        //     let expense = prompt('Введите обязательную статью расходов?' + ' : ' + textError),
        //         amount;
        //
        //     if (reg.test(expense)) {
        //         do {
        //             amount = prompt('Во сколько это обойдется?');
        //         } while (!isNumber(amount));
        //
        //         this.expenses[expense]  = +amount;
        //     } else {--i; textError = 'Неверный ввод!';}
        // }
    },

    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    //сумма расходов
    getExpensesMonth: function () {
        let sum = 0;

        for (let key in appData.expenses) {
            sum += appData.expenses[key];
        }

        this.expensesMonth = sum;
    },

    //доход-расход
    getBudget: function () {
        this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
    },

    //период достижения цели
    getTargetMonth: function () {
        return +target.value / +this.budgetMonth;
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
        return this.budgetMonth * range.value;
    }
};


btnCalculate.addEventListener('click', appData.start);

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

range.addEventListener('input', function () {
    let periodAmount = document.querySelector('.period-amount');
    periodAmount.textContent = range.value;
});


document.addEventListener('DOMContentLoaded', function () {
    btnCalculate.disabled = true;
});

monthIncome.addEventListener('input', function () {
    if (monthIncome.value !== '') {
        btnCalculate.disabled = false;
    } else {btnCalculate.disabled = true;}
});



// let resGetTargetMonth = Math.ceil(appData.getTargetMonth());
// if (resGetTargetMonth > 0) {
//     console.log("Цель будет достигнута за: " + resGetTargetMonth + " месяцев");
// } else {
//     console.log("Цель не будет достигнута");
// }
//
// console.log(appData.getStatusIncome());