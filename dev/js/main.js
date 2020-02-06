let btnCalculate = document.getElementById('start');

let plusOne = document.getElementsByTagName('button')[0];
let plusTwo = document.getElementsByTagName('button')[1];

let checkBox = document.querySelector('#deposit-check');

let incomeItemOne = document.querySelectorAll('.additional_income-item')[0];
let incomeItemTwo = document.querySelectorAll('.additional_income-item')[1];


let budgetMonth = document.querySelectorAll('.result-total')[0],
    budgetDay = document.querySelectorAll('.result-total')[1],
    expensesMonth = document.querySelectorAll('.result-total')[2],
    additionalIncome = document.querySelectorAll('.result-total')[3],
    additionalExpenses = document.querySelectorAll('.result-total')[4],
    incomePeriod = document.querySelectorAll('.result-total')[5],
    targetMonth = document.querySelectorAll('.result-total')[6];


let monthIncome = document.querySelector('.salary-amount'),
    addIncomeTitle = document.querySelector('.income-title'),
    addIncomeAmount = document.querySelector('.income-amount'),
    addExpensesTitle = document.querySelector('.expenses-title'),
    addExpensesAmount = document.querySelector('.expenses-amount'),
    possibleExpenses = document.querySelector('.additional_expenses-item'),
    target = document.querySelector('.target-amount'),
    range = document.querySelector('.period-select');


console.log(range);