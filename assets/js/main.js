// Função para troca de temas ========================================================
function onChangeThemes(themes){
    let theme1 = document.getElementById('theme1')
    let theme2 = document.getElementById('theme2')
    let theme3 = document.getElementById('theme3')
    var element = document.body

    if(themes === 'theme1') {
        theme2.classList.remove('active')
        theme3.classList.remove('active')

        setTimeout(function () {
            theme1.classList.add('active')
            element.classList.add('blue-theme')
            element.classList.remove('white-theme')
            element.classList.remove('purple-theme')
        }, 600)
    } else if(themes === 'theme2') {
        theme1.classList.remove('active')
        theme3.classList.remove('active')

        setTimeout(function () {
            theme2.classList.add('active')
            element.classList.add('white-theme')
            element.classList.remove('purple-theme')
            element.classList.remove('blue-theme')
        }, 600)
    } else {
        theme2.classList.remove('active')
        theme1.classList.remove('active')

        setTimeout(function () {
            theme3.classList.add('active')
            element.classList.add('purple-theme')
            element.classList.remove('white-theme')
            element.classList.remove('blue-theme')
        }, 600)
    }
}

// Metodo para a calculadora funcionar =============================================
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.reset()
    }

    reset() {
        this.previousOperand = ''
        this.currentOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ""
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '÷':
                computation = prev / current
                break
            case 'x':
                computation = prev * current
                break
            default: 
                return
        }

        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigit = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('pt-BR', { maximumFractionDigit: 0 })
        }
        if (decimalDigit != null) {
            return `${integerDisplay}.${decimalDigit}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationsButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const resetButton = document.querySelector('[data-reset]')
const deleteButton = document.querySelector('[data-delete]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationsButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

resetButton.addEventListener('click', button => {
    calculator.reset()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})