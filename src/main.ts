import './styles/styles.css';

const display = document.querySelector<HTMLInputElement>("#display");
const buttons = document.querySelectorAll<HTMLButtonElement>(".calculator__button");
const clearButton = document.querySelector<HTMLButtonElement>("#clear");
const deleteButton = document.querySelector<HTMLButtonElement>("#delete");
const equalsButton = document.querySelector<HTMLButtonElement>("#equals");
const operators = ["/", "*", "-", "+"];

if (!display) {
    throw new Error("Display element not found");
}

// Handle click events for all calculator buttons
const registerClick = (event: Event) => {
    const target = event.currentTarget as HTMLButtonElement;
    const value = target.innerText;

    // Handle 'AC' button (clear display)
    if (value === 'AC') {
        display.value = '';
        return;
    }

    // Handle 'DEL' button (delete last character)
    if (value === 'DEL') {
        display.value = display.value.slice(0, -1);
        return;
    }

    // Handle '=' button (evaluate expression)
    if (value === '=') {
        try {
            const result = evaluateExpression(display.value);
            display.value = result.toString();
        } catch (error) {
            display.value = 'Error';
        }
        return;
    }

    // Prevent adding multiple decimal points or consecutive operators
    if (value === '.' && display.value.includes('.')) return;
    if (operators.includes(value) && operators.includes(display.value.slice(-1))) return;

    // Append clicked button's value to display
    display.value += value;
};

// Add event listeners to all buttons
buttons.forEach((button) => button.addEventListener("click", registerClick));

const evaluateExpression = (expression: string): number => {
    const numbers: number[] = [];
    const ops: string[] = [];
    let currentNumber = '';

    // Iterate through each character of the expression
    for (const char of expression) {
        if (char >= '0' && char <= '9' || char === '.') {
            // Append digit or decimal point to the current number
            currentNumber += char;
        } else if (char === '+' || char === '-' || char === '*' || char === '/') {
            // When an operator is encountered, push the current number and the operator to the respective arrays
            if (currentNumber) {
                numbers.push(parseFloat(currentNumber)); // Use parseFloat to handle decimal numbers
                currentNumber = '';
            }
            ops.push(char);
        }
    }

    // Push the last number if there's any
    if (currentNumber) {
        numbers.push(parseFloat(currentNumber));
    }

    // Simple evaluation of the expression based on the order of operations
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
