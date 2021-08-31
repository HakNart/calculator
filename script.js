// Functions for different operations
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    return operator(a, b);
}

// Default state when data is clear
const DEFAULT_CALCULATION = {
    firstNum: null,
    operator: null, 
}

// Create an object that holds all the values and operator
let storedCalculation = {
    firstNum: null,
    operator: null, 
}

// Function to display values on the screen
const screen = document.querySelector('#display');
function display(num) {
    screen.textContent = num;
}

// Handle when digit button is clicked and displayed on the screen
let currentNumber = '0';
const digitButtons = document.querySelectorAll(".digit");
digitButtons.forEach(digitButton => {
    digitButton.addEventListener('click', fillDigit)
});

function fillDigit() {
    if (currentNumber === '0') {
        currentNumber = this.textContent;
    } else {
        currentNumber += this.textContent;
    }
    display(currentNumber);
}

// Handle opertors when clicked
const operators = document.querySelectorAll(".operator");
operators.forEach(operator => {
    operator.addEventListener('click', executeOperation);
})

function executeOperation() {    
    if (!storedCalculation.firstNum) {
        storedCalculation.firstNum = Number(currentNumber);
        currentNumber = '';
    }
    else if (checkOperation() == 'divide by zero') {
        display("Careful buddy! Too far");
    } 
    else if (checkOperation() === 'valid') {
        let result = operate(storedCalculation.operator, storedCalculation.firstNum, Number(currentNumber));
        storedCalculation.firstNum = result;
        display(round(result));
        currentNumber = '';
    }
    storedCalculation.operator = assignOperator(this.id);
    
}

function checkOperation() {
    if (storedCalculation.operator == divide && currentNumber == '0') {
        return 'divide by zero';
    }
    if (storedCalculation.firstNum && storedCalculation.operator && currentNumber) {
        return 'valid';
    } 
}

// Round the number up to 6 decimal
function round(value) {
    return Number(Math.round(value + 'e6') + 'e-6') //Can change the decimal number for other function
}

// Return operator function based on the string input
function assignOperator(str) {
    switch (str) {
        case 'division':
            return divide;
        case 'multiplication':
            return multiply;
        case 'subtraction':
            return subtract;
        case 'addition':
            return add;
    }
}

// Clear button should wipe out all the data
const clearButton = document.querySelector("#clear");
clearButton.addEventListener('click', clearData);

function clearData() {
    // reset the calculation object to blank state
    storedCalculation = {
        ...DEFAULT_CALCULATION
    }
    // wipe out the current number value
    currentNumber = '0';
    // display the current number
    display(currentNumber);
}

// Click the (.) button generate floating point number
const decimal = document.querySelector("#decimal");
decimal.addEventListener('click', putDecimal);

function putDecimal() {
    if (!checkDecimal(currentNumber)) {
        currentNumber += ".";
    }
    display(currentNumber);
}

function checkDecimal(num) {
    return num.indexOf('.') > -1;
}

// Backspace button remote digit one by one
const backspace = document.querySelector("#backspace");
backspace.addEventListener('click', removeDigit);

function removeDigit() {
    if (currentNumber) {
        currentNumber = currentNumber.slice(0,currentNumber.length-1);
    }
    display(currentNumber);
}