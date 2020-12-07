//Make Calculator class
class Calculator {
  //Define basic properties
  constructor(prevOperandValue, currentOperandValue, historyContainer) {
      this.prevOperandValue = prevOperandValue,
      this.currentOperandValue = currentOperandValue,
      this.historyContainer = historyContainer,        
      this.rightOperandCopy = '',
      this.isEqualBtnPushed = false,
      this.clear();
  }

  //Define methods. All operations
  clear() {
      this.currentOperand = '';
      this.prevOperand = '';
      this.operation = undefined;
      this.isEqualBtnPushed = false;
      this.rightOperand = '';
  }

  delete() {
      //if(this.isEqualBtnPushed) {this.clear()}
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendDigits(digit) {
      /* if(this.isEqualBtnPushed) {
          this.clear()
      } */
      if (digit === '.' && this.currentOperand.includes('.')) return
      this.currentOperand = this.currentOperand.toString() + digit;
  }

  chooseOperation(operation) {
      if (this.currentOperand === '') this.currentOperand = 0;
      if (this.prevOperand !== '') this.compute();
      this.operation = operation;
      this.prevOperand = this.currentOperand;
      this.currentOperand = '';
  }

  compute() {
      let computation;
      const leftOperand = parseFloat(this.prevOperand)
      const rightOperand = parseFloat(this.currentOperand)
      if (isNaN(leftOperand) || isNaN(rightOperand)) return

      switch (this.operation) {
          case '+':
              computation = leftOperand + rightOperand;
              break;
          case '-':
              computation = leftOperand - rightOperand;
              break;
          case '/':
              computation = leftOperand / rightOperand;
              break;
          case '*':
              computation = leftOperand * rightOperand;
              break;
          default: return
      }
      this.rightOperandCopy = this.currentOperand;
      this.currentOperand = computation;
  }

  getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('ru', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
  }

  updateDisplay() {
      this.currentOperandValue.innerText = this.getDisplayNumber(this.currentOperand);
      this.prevOperandValue.innerText = this.getDisplayNumber(this.prevOperand);
      if(this.operation != null) {
          this.prevOperandValue.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`;
      }

/*         if(this.isEqualBtnPushed){
          this.prevOperandValue.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation} ${this.rightOperandCopy} =`;
          this.operation = undefined;
          this.prevOperand = '';
          this.isEqualBtnPushed = false;
      } */
  }
}

//Assign all elements on the page
const allClearButton = document.querySelector('[data-allClear]'),
  deleteButton = document.querySelector('[data-delete]'),
  digitButtons = document.querySelectorAll('[data-digit]'),
  operationButtons = document.querySelectorAll('[data-operation]'),
  equalsButton = document.querySelector('[data-equals]'),
  prevOperandValue = document.querySelector('[data-previousOperand]'),
  currentOperandValue = document.querySelector('[data-currentOperand]'),
  historyContainer = document.querySelector('[data-historyContainer]');

//Create a calculator
const calculator = new Calculator(prevOperandValue, currentOperandValue, historyContainer);

digitButtons.forEach(button => {
  button.addEventListener('click', () => {
      calculator.appendDigits(button.value);
      calculator.updateDisplay();
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
      calculator.chooseOperation(button.value);
      calculator.updateDisplay();
  })
})

equalsButton.addEventListener('click', button => {
  calculator.isEqualBtnPushed = true;
  calculator.compute();
  calculator.updateDisplay();
  
})

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})