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
    firstNum: 0,
    sencondNum: null,
    operator: add, 
    result: 0,
}

// Function to display values on the screen
const screen = document.querySelector('#display');
function display(num) {
    screen.textContent = num;
}