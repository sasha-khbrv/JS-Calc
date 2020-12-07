class Calculator {
    constructor(prevOperandText, currentOperandText) {
        prevOperandText = prevOperandText,
        currentOperandText = currentOperandText,
        this.isEqualPushed = false;
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
        //Validation        
        if(this.isEqualPushed) {
            this.prevOperand = '';
            this.operation = undefined;
            this.isEqualPushed = false;
        }
        if(this.currentOperand === '') return

        //Delete function
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if(this.currentOperand.length === 0) this.currentOperand = 0;
        
    }

    appendDigits(digit) {
        if(this.isEqualPushed) this.clearAll();
        if(this.currentOperand === 0 && digit !== '.') this.currentOperand = '';
        if (digit === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand + digit;
    }

    chooseOperation(operation) {
        if(this.isEqualPushed) {
            this.prevOperand = this.currentOperand;
            this.isEqualPushed = false;
        }
        if(this.currentOperand === '') this.currentOperand = 0;
        if(this.prevOperand !== '') this.compute();
        this.operation = operation;
        this.prevOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computationResult;
        let leftOperand = parseFloat(this.prevOperand);
        let rightOperand = parseFloat(this.currentOperand);
        
        
        if (isNaN(leftOperand)) leftOperand = 0;                                      //Validation for empities
        if (isNaN(rightOperand)) rightOperand = parseFloat(this.prevOperand);         //value

        switch(this.operation) {
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
            default: return;
        }
        this.expression = `${leftOperand } ${this.operation} ${rightOperand}`;
        this.currentOperand = computationResult;
        this.operation = undefined;
        this.prevOperand = '';
    }

    updateDisplay() {
        currentOperandText.innerText = this.currentOperand;
        prevOperandText.innerText = this.prevOperand;
        if(this.operation !== undefined) {
            prevOperandText.innerText = `${this.prevOperand} ${this.operation}`
        }
        if(this.isEqualPushed) {
            prevOperandText.innerText = `${this.expression} =`;
        }
    }

    //Validation block
    inputValidation() {

    }
}

//Assign all calc's elements
const prevOperandText = document.querySelector('[data-previousOperand]'),
      currentOperandText = document.querySelector('[data-currentOperand]'),
      clearAllBtn = document.querySelector('[data-allClear]'),
      deleteBtn = document.querySelector('[data-delete]'),
      operationBtn = document.querySelectorAll('[data-operation]'),
      digitBtn = document.querySelectorAll('[data-digit]'),
      equalBtn = document.querySelector('[data-equal]');

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
        calculator.chooseOperation(button.value);
        calculator.updateDisplay();
    });
});

equalBtn.addEventListener('click', () => {
    calculator.isEqualPushed = true;
    calculator.compute();
    calculator.updateDisplay();
});