class Calculator {
    constructor(prevOperandText, currentOperandText) {
        prevOperandText = prevOperandText,
        currentOperandText = currentOperandText,
        this.isEqualPushed = false;
        this.isOperationBtnPushed = false;
        this.expression = '';
        this.clearAll();
    }

    clearAll() {
        this.currentOperand = '';
        this.prevOperand = '';
        this.operation = undefined;
        this.isEqualPushed = false;
        this.expression = '';
    }

    deleteDigit() {
        if (this.isEqualPushed) { //Delete digits in result value
            this.prevOperand = '';
            this.operation = undefined;
            this.isEqualPushed = false;
        }
        if (this.currentOperand === '') return //Delete digits when all values are empty

        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand.length === 0) this.currentOperand = 0; //Validation for full number delete
    }

    appendDigits(digit) {
        if (this.isEqualPushed) this.clearAll();
        if (this.currentOperand === 0 && digit !== '.') this.currentOperand = '';
        if (digit === '.' && this.currentOperand.includes('.')) return
        if (this.isOperationBtnPushed) { //Toggle operation checking variables
            this.isOperationBtnPushed = false;
            this.currentOperand = '';
        }
        this.currentOperand = this.currentOperand + digit;
    }

    chooseOperation(operation) {
        if (this.isEqualPushed) {
            this.prevOperand = this.currentOperand;
            this.isEqualPushed = false;
        }

        if (this.isOperationBtnPushed) { //Change operations without any calculation
            this.prevOperand = this.currentOperand;
            this.operation = operation;
            return
        }

        if (this.prevOperand !== '') this.compute();

        this.prevOperand = this.currentOperand;
        this.operation = operation;
        this.currentOperand = '';
    }

    compute() {
        let computationResult;
        let leftOperand = parseFloat(this.prevOperand);
        let rightOperand = parseFloat(this.currentOperand);

        if (isNaN(leftOperand)) leftOperand = 0;                               //Validation for empities
        if (isNaN(rightOperand)) rightOperand = parseFloat(this.prevOperand); //value

        switch (this.operation) {
            case '+':
                computationResult = leftOperand + rightOperand;
                break;
            case '-':
                computationResult = leftOperand - rightOperand;
                break;
            case '*':
                computationResult = leftOperand * rightOperand;
                break;
            case '/':
                computationResult = leftOperand / rightOperand;
                break;
            default:
                return;
        }

        this.expression = `${leftOperand } ${this.operation} ${rightOperand}`;
        this.currentOperand = computationResult;
        this.operation = undefined;
        this.prevOperand = '';
    }

    updateDisplay() {
        currentOperandText.innerText = this.currentOperand;
        prevOperandText.innerText = this.prevOperand;
        if (this.operation != null) {
            prevOperandText.innerText = `${this.prevOperand} ${this.operation}`
        }
        if (this.isEqualPushed) {
            prevOperandText.innerText = `${this.expression} =`;
        }
    }

    showBtnPress(btnValue) {

        if (btnValue === 'Enter') {
            equalBtn.classList.add('activeEnter');
            setTimeout(() => {
                equalBtn.classList.remove('activeEnter');
            }, 200);
        } else if (btnValue === 'Escape') {
            clearAllBtn.classList.add('activeBtn');
            setTimeout(() => {
                clearAllBtn.classList.remove('activeBtn');
            }, 200);
        } else if (btnValue === 'Backspace') {
            deleteBtn.classList.add('activeBtn');
            setTimeout(() => {
                deleteBtn.classList.remove('activeBtn');
            }, 200);
        } else {
            let btn = document.getElementById(btnValue)
            btn.classList.add('activeBtn');
            setTimeout(() => {
                btn.classList.remove('activeBtn');
            }, 200);
        }            
    }
}

//Assign all calc's elements
const prevOperandText = document.querySelector('[data-previousOperand]'),
    currentOperandText = document.querySelector('[data-currentOperand]'),
    clearAllBtn = document.querySelector('[data-allClear]'),
    deleteBtn = document.querySelector('[data-delete]'),
    operationBtn = document.querySelectorAll('[data-operation]'),
    digitBtn = document.querySelectorAll('[data-digit]'),
    equalBtn = document.querySelector('[data-equal]'),
    allBtns = document.querySelectorAll('button');

//Create calculator
const calculator = new Calculator(prevOperandText, currentOperandText);

//Define buttons functions
digitBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendDigits(button.value);
        calculator.updateDisplay();
    });
});

clearAllBtn.addEventListener('click', () => {
    calculator.clearAll();
    calculator.updateDisplay();
});

deleteBtn.addEventListener('click', () => {
    calculator.deleteDigit();
    calculator.updateDisplay();
});

operationBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.isOperationBtnPushed = true;
        calculator.chooseOperation(button.value);
        calculator.updateDisplay();
    });
});

equalBtn.addEventListener('click', () => {
    calculator.isEqualPushed = true;
    calculator.compute();
    calculator.updateDisplay();
});

//Keyboard input
document.addEventListener('keydown', (e) => {  
    const digitStr = '1234567890.';
    const operationStr = '/*-+'    
    if(digitStr.includes(e.key)) {
        calculator.showBtnPress(e.key);
        calculator.appendDigits(e.key);
        calculator.updateDisplay();
    } else if(operationStr.includes(e.key)) {
        calculator.showBtnPress(e.key);
        calculator.isOperationBtnPushed = true;
        calculator.chooseOperation(e.key);
        calculator.updateDisplay();
    } else if(e.key === 'Enter') {
        calculator.showBtnPress(e.key);
        calculator.isEqualPushed = true;
        calculator.compute();
        calculator.updateDisplay();
    } else if(e.key === 'Backspace') {
        calculator.showBtnPress(e.key);
        calculator.deleteDigit();
        calculator.updateDisplay();
    } else if (e.key === 'Escape') {
        calculator.showBtnPress(e.key);
        calculator.clearAll();
        calculator.updateDisplay();
    } else {
        return
    }    
})