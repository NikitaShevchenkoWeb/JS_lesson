"use strict";

const btnCalculate = document.getElementById('start'),
      incomePlus = document.getElementsByTagName('button')[0],
      expensesPlus = document.getElementsByTagName('button')[1],
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

const depositCheck = document.querySelector('#deposit-check'),
      depositBank = document.querySelector('.deposit-bank'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent');

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

            this.getExpenses();
            this.getExpensesMonth();
            this.getAddExpenses();
            this.getAddIncome();
            this.getIncome();
            this.changePercent();
            this.getInfoDeposit();
            this.getBudget();
            this.showResult();
        }
        start.call(appData);
    }


    addExpensesBlock() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);

        let expensesItemsAll = document.querySelectorAll('.expenses-items input[type=text]'),
            expensesNum = expensesItemsAll.length - 2;
        for (let i = expensesNum; i < expensesItemsAll.length; i++) {
            expensesItemsAll[i].value = '';
        }

        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {expensesPlus.style.display = 'none'}
    }


    addIncomeBlock() {
        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);

        let incomeItemsAll = document.querySelectorAll('.income-items input[type=text]'),
            incomeNum = incomeItemsAll.length - 2;
        for (let i = incomeNum; i < incomeItemsAll.length; i++) {
            incomeItemsAll[i].value = '';
        }

        incomeItem = document.querySelectorAll('.income-items');
        if (incomeItem.length === 3) {incomePlus.style.display = 'none'}
    }


    getExpenses() {
        const _this = this;
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                _this.expenses[itemExpenses] = +cashExpenses;
            }
        })
    }


    getIncome() {
        const _this = this;
        incomeItem.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                _this.income[itemIncome] = +cashIncome;
            }
        });

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }


    getAddExpenses() {
        const _this = this;
        let addExpenses = possibleExpenses.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                _this.addExpenses.push(item);
            }
        })
    }


    getAddIncome() {
        const _this = this;
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
        })
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

        let disabledInputData = document.querySelectorAll('.data input[type=text]'),
            periodAmount = document.querySelector('.period-amount');
        disabledInputData.forEach(function (item) {
            item.disabled = false;
            item.value = '';
        });

        range.value = '1';
        periodAmount.textContent = '1';

        incomeItem.forEach(function (item, i) {
            if (i >= 1) {item.remove();}
        });
        incomePlus.style.display = 'block';

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
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);

        this.budgetMonth = +this.budget + this.incomeMonth + monthDeposit - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
    }


//период достижения цели
    getTargetMonth() {
        return +target.value / +this.budgetMonth;
    }


    calcSavedMoney() {
        return this.budgetMonth * range.value;
    }


    //deposit
    getInfoDeposit() {
        if (this.deposit) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }


    changePercent() {
        const valueSelect = depositBank.value;
        if (valueSelect !== 'other') {
            depositPercent.value = valueSelect;
        }
    }


    eventsListeners() {
        const _this = this;
        btnCalculate.addEventListener('click', this.start);

        expensesPlus.addEventListener('click', this.addExpensesBlock);
        incomePlus.addEventListener('click', this.addIncomeBlock);

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

                if (depositPercent.value > 100) {
                    depositPercent.value = value;
                }
            }

            let inputTest = document.querySelectorAll('.data input[type=text]');
            inputTest.forEach(function (item) {
                if (((item.getAttribute("placeholder") === "Сумма" || item.getAttribute("placeholder") === "Процент (от 0 до 100)")) && item.focus) {
                    checkInputNum(item);
                } else checkInputStr(item);
            });
        });


        depositCheck.addEventListener('change', function () {
           if (depositCheck.checked) {
               depositBank.style.display = 'block';
               depositAmount.style.display = 'inline-block';
               _this.deposit = true;
           } else {
               depositBank.style.display = 'none';
               depositBank.selectedIndex = 0;
               depositAmount.style.display = 'none';
               depositAmount.value = '';
               _this.deposit = false;

               if (depositPercent.getAttribute('style') === 'display: inline-block;') {
                   depositPercent.style.display = 'none';
                   depositPercent.value = '';
               }
           }
        });


        depositBank.addEventListener('change', function () {
           const selectValue = this.value;
           if (selectValue === "other") {
               depositPercent.style.display = 'inline-block';
           } else {depositPercent.style.display = 'none';}
        });
    }
}

const appData = new AppData();
appData.eventsListeners();