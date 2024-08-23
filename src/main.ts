import './styles/styles.css';

const buttons = document.querySelectorAll<HTMLButtonElement>(".calculator__button");
const display = document.querySelector<HTMLInputElement>("#display");
const clearButton = document.querySelector<HTMLButtonElement>("#clear");
const deleteButton = document.querySelector<HTMLButtonElement>("#delete");
const equalsButton = document.querySelector<HTMLButtonElement>("#equals");
const operators = ["/", "*", "-", "+"];


// Click events for calculator buttons:

const registerClick = (event: Event) => {
    const target = event.currentTarget as HTMLButtonElement;
    const value = target.innerText;

    // 'AC' button (clear display):
    if (value === 'AC') {
        display.value = '';
        return;
    }

    // 'DEL' button (delete last character):
    if (value === 'DEL') {
        display.value = display.value.slice(0, -1);
        return;
    }

    // '=' button:
    if (value === '=') {
        try {
            const result = evaluateExpression(display.value);
            display.value = result.toString();
        } catch (error) {
            display.value = 'Error';
        }
        return;
    }
    
        // Shows value to display:
        display.value += value;
};


// Event listeners for all buttons:
buttons.forEach((button) => button.addEventListener("click", registerClick));

const evaluateExpression = (expression: string): number => {
    const numbers: number[] = [];
    const ops: string[] = [];
    let currentNumber = '';

    // Iterate through each character:
    for (const char of expression) {
        if (char >= '0' && char <= '9' || char === '.') {
            // Append digit or decimal point to the current number
            currentNumber += char;
        } else if (char === '+' || char === '-' || char === '*' || char === '/') {
            ops.push(char);
        }
    }

    // Evaluate mathenatical expression depending on operator:
    let result = numbers[0];
    for (let i = 0; i < ops.length; i++) {
        const operator = ops[i];
        const num = numbers[i + 1];
        switch (operator) {
            case "+":
                result += num;
                break;
            case "-":
                result -= num;
                break;
            case "*":
                result *= num;
                break;
            case "/":
                result /= num;
                break;
            default:
                throw new Error('Not a valid operation');
        }
    }

    return result;
};
