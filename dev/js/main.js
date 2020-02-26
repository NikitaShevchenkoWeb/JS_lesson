"use strict";

const btnCalculate = document.getElementById('start'),
      incomePlus = document.getElementsByTagName('button')[0],
      expensesPlus = document.getElementsByTagName('button')[1],
      checkBox = document.querySelector('#deposit-check'),
      additionalIncomeItem = document.querySelectorAll('.additional_income-item');

const budgetMonth = document.querySelectorAll('.result-total')[0],
      budgetDay = document.querySelectorAll('.result-total')[1],
      expensesMonth = document.querySelectorAll('.result-total')[2],
      additionalIncome = document.querySelectorAll('.result-total')[3],
      additionalExpenses = document.querySelectorAll('.result-total')[4],
      incomePeriod = document.querySelectorAll('.result-total')[5],
      targetMonth = document.querySelectorAll('.result-total')[6];

const monthIncome = document.querySelector('.salary-amount'),
      addIncomeTitle = document.querySelector('.income-title'),
      addIncomeAmount = document.querySelector('.income-amount'),
      addExpensesTitle = document.querySelector('.expenses-title'),
      addExpensesAmount = document.querySelector('.expenses-amount'),
      possibleExpenses = document.querySelector('.additional_expenses-item'),
      target = document.querySelector('.target-amount'),
      range = document.querySelector('.period-select');

let incomeItem = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');


let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


class AppData {
    constructor() {
        this.income = {};
        this.incomeMonth = 0;
        this.addIncome = [];
        this.addNewExpenses = [];
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.expenses = {};
        this.addExpense = [];
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
    }

    start() {
        function start() {
            this.budget = +monthIncome.value;

            this.getExpInc();
            this.getExpensesMonth();
            this.getAddExpInc();
            this.getBudget();
            this.showResult();
        }
        start.call(appData);
    }


    addExpIncBlock(e) {
        let target = e.target;
        const strBtn = target.classList[1].split('_')[0];

        const count = item => {
            const startStr = item[0].className.split('-')[0];

            let cloneItem = item[0].cloneNode(true);
            item[0].parentNode.insertBefore(cloneItem, target);

            let itemsAll = document.querySelectorAll(`.${startStr}-items input[type=text]`),
                num = itemsAll.length - 2;
            for (let i = num; i < itemsAll.length; i++) {
                itemsAll[i].value = '';
            }

            let newItems = document.querySelectorAll(`.${startStr}-items`);
            if (newItems.length === 3) {target.style.display = 'none'}
        };


        const createElem = (str) => {
            return document.querySelectorAll(`.${str}-items`);
        };

        count(createElem(strBtn));
    }


    getExpInc() {
        const _this = this;

        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;

            if (itemTitle !== '' && itemAmount !== '') {
                _this[startStr][itemTitle] = +itemAmount;
            }
        };

        incomeItem = document.querySelectorAll('.income-items');
        incomeItem.forEach(count);

        expensesItems = document.querySelectorAll('.expenses-items');
        expensesItems.forEach(count);

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }


    getAddExpInc() {
        const _this = this;

        const count = (item, name) => {
            item = item.trim();
            if (item !== '') {_this[name].push(item);}
        };

        let addExpenses = possibleExpenses.value.split(',');
        addExpenses.forEach((item) => {count(item, 'addExpenses')});

        additionalIncomeItem.forEach((item) => {count(item.value, 'addIncome');});
    }



    showResult() {
        const _this = this;

        budgetMonth.value = this.budgetMonth;
        budgetDay.value = Math.ceil(this.budgetDay);
        expensesMonth.value = this.expensesMonth;
        additionalExpenses.value = this.addExpenses.join(', ');
        additionalIncome.value = this.addIncome.join(', ');
        targetMonth.value = Math.ceil(this.getTargetMonth());

        incomePeriod.value = this.calcSavedMoney();
        range.addEventListener('input', function () {
            incomePeriod.value = _this.calcSavedMoney();
        });
    }


    reset() {
        appData.income = {};
        appData.incomeMonth = 0;
        appData.addIncome = [];
        appData.addNewExpenses = [];
        appData.addExpenses = [];
        appData.deposit = false;
        appData.percentDeposit = 0;
        appData.moneyDeposit = 0;
        appData.expenses = {};
        appData.addExpense = [];
        appData.budget = 0;
        appData.budgetDay = 0;
        appData.budgetMonth = 0;
        appData.expensesMonth = 0;


        let disabledInputData = document.querySelectorAll('.data input[type=text]'),
            periodAmount = document.querySelector('.period-amount');
        disabledInputData.forEach(function (item) {
            item.disabled = false;
            item.value = '';
        });

        range.value = '1';
        periodAmount.textContent = '1';

        incomeItem = document.querySelectorAll('.income-items');
        incomeItem.forEach(function (item, i) {
            if (i >= 1) {item.remove();}
        });
        incomePlus.style.display = 'block';

        expensesItems = document.querySelectorAll('.expenses-items');
        expensesItems.forEach(function (item, i) {
            if (i >= 1) {item.remove();}
        });
        expensesPlus.style.display = 'block';


        let disabledInputResult = document.querySelectorAll('.result input[type=text]');
        disabledInputResult.forEach(function (item) {
            item.value = '';
        });
    }


//сумма расходов
    getExpensesMonth() {
        let sum = 0;

        for (let key in this.expenses) {
            sum += this.expenses[key];
        }

        this.expensesMonth = sum;
    }


//доход-расход
    getBudget() {
        this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
    }


//период достижения цели
    getTargetMonth() {
        return +target.value / +this.budgetMonth;
    }


    calcSavedMoney() {
        return this.budgetMonth * range.value;
    }


    eventsListeners() {
        btnCalculate.addEventListener('click', this.start);

        expensesPlus.addEventListener('click', this.addExpIncBlock);
        incomePlus.addEventListener('click', this.addExpIncBlock);

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



        const btnReset = document.querySelector('#cancel');
        btnCalculate.addEventListener('click', function () {
            let disabledInput = document.querySelectorAll('.data input[type=text]');
            disabledInput.forEach(function (item) {
                item.disabled = true;
            });
            // range.disabled = true;

            btnCalculate.style.display = 'none';
            btnReset.style.display = 'block'
        });

        btnReset.addEventListener('click', function () {
            AppData.prototype.reset();

            btnCalculate.style.display = 'block';
            btnReset.style.display = 'none';

            if (monthIncome.value !== '') {
                btnCalculate.disabled = false;
            } else {btnCalculate.disabled = true;}
        });


        document.addEventListener('keyup', function () {
            function checkInputStr(input) {
                let value = input.value;
                let reg = /["'_`~!@#$^&%*()+=\-\[\]\\/{}|:;<>?a-zA-Z0-9]/g;
                if (reg.test(value)) {
                    value = value.replace(reg, '');
                    input.value = value;
                }
            }

            function checkInputNum(input) {
                let value = input.value;
                let reg = /[\D]/g;
                if (reg.test(value)) {
                    value = value.replace(reg, '');
                    input.value = value;
                }
            }

            let inputTest = document.querySelectorAll('.data input[type=text]');
            inputTest.forEach(function (item) {
                if ((item.getAttribute("placeholder") === "Сумма") && item.focus) {
                    checkInputNum(item);
                } else checkInputStr(item);
            });
        });
    }
}

const appData = new AppData();
appData.eventsListeners();