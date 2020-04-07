// total - calculation starts from 0
let runningTotal = 0;

// presents what is on the screen at any given time
let buffer = '0';

// previous state clicked
let previousOperator = null;

// targets screen at the dom
const screen = document.querySelector('.screen');

// targets the value of every button
const buttonClick = (value) => {
    if (isNaN(value)) {
        // this is not a number
        handleSymbol(value);
    } else {
        // this is a number
        handleNumber(value);
    }
    screen.innerText = buffer;
}

const handleSymbol = (symbol) => {
    if (symbol === 'C') {
    }
    switch(symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === null) {
                // needs two numbers to do the math
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
        break;
    }
}

const handleMath = (symbol) => {
    if (buffer === '0') {
        // do nothing
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;

    buffer = '0';
}

const flushOperation = (intBuffer) => {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '÷') {
        runningTotal /= intBuffer;
    }
}

const handleNumber = (numberString) => {
    if (buffer === '0') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

// runs all function
const init = () => {
    document.querySelector('.calc-buttons').addEventListener('click', (event) => {
        buttonClick(event.target.innerText);
    })
}

init();