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

function power(a, b) {
    return a**b;
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
    digitButton.addEventListener('click', event => {
        fillDigit(event.target.textContent);
    })
});

function fillDigit(digitString) {
    console.log(currentNumber);
    if (currentNumber === '0') {
        currentNumber = digitString;
    } else if (currentNumber.length >= 11) {
        return;
    } else {
        currentNumber += digitString;
    }
    display(currentNumber);
}

// Handle opertors when clicked
const operators = document.querySelectorAll(".operator");
operators.forEach(operator => {
    operator.addEventListener('click', (event) => {
        executeOperation(event.target.id);
    });
})

function executeOperation(operator) {    
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
    storedCalculation.operator = assignOperator(operator);
}

function checkOperation() {
    if (storedCalculation.operator == divide && currentNumber == '0') {
        return 'divide by zero';
    }
    if (storedCalculation.firstNum && storedCalculation.operator && currentNumber) {
        return 'valid';
    } 
}

// Square root operation - calculate the square root of the current number inputted
const sqrtButton = document.querySelector("#sqrt");
sqrtButton.addEventListener('click', () => {
    let result = Math.sqrt(Number(currentNumber));
    currentNumber = result;
    display(result);
})

// Round the number up to 6 decimal
function round(value) {
    if (Number(value) && Number(value) >= 1e11) {
        return parseFloat(value).toExponential(7);
    }
    return Number(Math.round(value + 'e10') + 'e-10') //Can change the decimal number for other function
}

// Return operator function based on the string input
function assignOperator(str) {
    switch (str) {
        case 'division':
        case '/':
            return divide;
        case 'multiplication':
        case '*':
            return multiply;
        case 'subtraction':
        case '-':
            return subtract;
        case 'addition':
        case '+':
            return add;
        case 'power':
        case '^':
            return power;
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

// KEYBOARD SUPPORT
// List of supported keys
const SUPPORTED_KEYS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Backspace', 'Escape', '.', 'Enter', '+', '-', '/', '*', '^'];
const OPERATOR_KEYS = ['Enter', '+', '-', '/', '*', '^'];
// Add event for keyboard for selective keys
document.addEventListener('keyup', (event) => {
    const keyName = event.key;
    console.log(keyName);
    if(SUPPORTED_KEYS.includes(keyName)) {
        if (OPERATOR_KEYS.includes(keyName)) {
            console.log(keyName);
            executeOperation(keyName);
        } else {
            switch (keyName) {
                case "Backspace":
                    removeDigit();
                    break;
                case "Escape":
                    clearData();
                    break;
                case ".":
                    putDecimal();
                    break;
                default:
                    fillDigit(keyName);
                    break;
            }
        }
        
    }
})