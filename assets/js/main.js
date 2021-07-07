function onChangeThemes(themes){
    let theme1 = document.getElementById('theme1')
    let theme2 = document.getElementById('theme2')
    let theme3 = document.getElementById('theme3')

    if(themes === 'theme1') {
        theme2.className += 'switch theme2'
        theme3.className += 'switch theme3'

        setTimeout(function () {
            theme1.className += 'switch theme1 active'
        }, 500)
    } else if(themes === 'theme2') {
        theme1.className += 'switch theme1'
        theme3.className += 'switch theme3'

        setTimeout(function () {
            theme2.className += 'switch theme2 active'
        }, 500)
    } else {
        theme2.className += 'switch theme2'
        theme1.className += 'switch theme1'

        setTimeout(function () {
            theme3.className += 'switch theme3 active'
        }, 500)
    }
}

const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator-keys')

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
    
    }

    const key = e.target
    const action = key.dataset.action

    if(!action) {
        console.log('numero')
    }

    if(action === 'add' || action === 'minus' || action === 'divide' || action === 'multiply') {
        console.log('operator key')
    }

    if (action === 'decimal') {
        console.log('decimal key!')
    }
    
    if (action === 'clear') {
        console.log('clear key!')
    }

    if (action === 'delete') {
        console.log('delete key')
    }
    
    if (action === 'calculate') {
        console.log('equal key!')
    }
})

const display = document.querySelector('.number-output')

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
      const key = e.target
      const action = key.dataset.action
      const keyContent = key.textContent
      const displayedNum = display.textContent

        if (!action){
            if(displayedNum === 0){
              display.textContent = keyContent 
            } else {
                display.textContent = displayedNum + keyContent
            }
        }

        if (action === 'decimal') {
            display.textContent = displayedNum + '.'
        }

        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            key.classList.add('is-pressed')
            // Add custom attribute
            calculator.dataset.previousKeyType = 'operator'

            calculator.dataset.firstValue = displayedNum
            calculator.dataset.operator = action
        }

        // Remove .is-pressed class from all keys
        Array.from(key.parentNode.children)
        .forEach(key => key.classList.remove('is-pressed'))

        const previousKeyType = calculator.dataset.previousKeyType

        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            }
        }
            
        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum
            
            display.textContent = calculate(firstValue, operator, secondValue)
        }

        const calculate = (n1, operator, n2) => {
            // Perform calculation and return calculated value
            let result = ''
  
            if (operator === 'add') {
                result = parseFloat(n1) + parseFloat(n2)
            } else if (operator === 'subtract') {
                result = parseFloat(n1) - parseFloat(n2)
            } else if (operator === 'multiply') {
                result = parseFloat(n1) * parseFloat(n2)
            } else if (operator === 'divide') {
                result = parseFloat(n1) / parseFloat(n2)
            }
            
            return result
        }
    }
})