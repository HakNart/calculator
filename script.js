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

// Create an object that holds all the values and operator
let storedCalculation = {
    firstNum: null,
    secondNum: null,
    operator: null, 
    result: 0,
}

// Function to display values on the screen
const screen = document.querySelector('#display');
function display(num) {
    screen.textContent = num;
}

// Handle when digit button is clicked and displayed on the screen
let currentNumber = '';
const digitButtons = document.querySelectorAll(".digit");
digitButtons.forEach(digitButton => {
    digitButton.addEventListener('click', fillDigit)
});

function fillDigit() {
    currentNumber += this.textContent;
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
    } else if (isValidOperation()) {
        let result = operate(storedCalculation.operator, storedCalculation.firstNum, Number(currentNumber));
        storedCalculation.firstNum = result;
        display(result);
        currentNumber = '';
    }
    storedCalculation.operator = assignOperator(this.id);
}

function isValidOperation() {
    return storedCalculation.firstNum && storedCalculation.operator && currentNumber;
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