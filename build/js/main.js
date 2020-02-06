"use strict";

var btnCalculate = document.getElementById('start');
var plusOne = document.getElementsByTagName('button')[0];
var plusTwo = document.getElementsByTagName('button')[1];
var checkBox = document.querySelector('#deposit-check');
var incomeItemOne = document.querySelectorAll('.additional_income-item')[0];
var incomeItemTwo = document.querySelectorAll('.additional_income-item')[1];
var budgetMonth = document.querySelectorAll('.result-total')[0],
    budgetDay = document.querySelectorAll('.result-total')[1],
    expensesMonth = document.querySelectorAll('.result-total')[2],
    additionalIncome = document.querySelectorAll('.result-total')[3],
    additionalExpenses = document.querySelectorAll('.result-total')[4],
    incomePeriod = document.querySelectorAll('.result-total')[5],
    targetMonth = document.querySelectorAll('.result-total')[6];
var monthIncome = document.querySelector('.salary-amount'),
    addIncomeTitle = document.querySelector('.income-title'),
    addIncomeAmount = document.querySelector('.income-amount'),
    addExpensesTitle = document.querySelector('.expenses-title'),
    addExpensesAmount = document.querySelector('.expenses-amount'),
    possibleExpenses = document.querySelector('.additional_expenses-item'),
    target = document.querySelector('.target-amount'),
    range = document.querySelector('.period-select');
console.log(range);