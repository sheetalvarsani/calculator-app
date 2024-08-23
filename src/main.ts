import "./styles/styles.css";

// DOM element queries:

const buttons = document.querySelectorAll<HTMLButtonElement>(".calculator__button");
const display = document.querySelector<HTMLInputElement>("#display");
const operators = ["/", "*", "-", "+"];


// check display element exists:

if (!display) {
    throw new Error("Display element not found");
}

// Helper function to handle adding numbers to array:
const addNumberToArray = (currentNumber: string, numbers: number[], isNegative: boolean) => {
    if (currentNumber) {
        numbers.push(isNegative ? -parseFloat(currentNumber) : parseFloat(currentNumber));
    }
};


// Click events for calculator buttons:

const registerClick = (event: Event) => {
    const target = event.currentTarget as HTMLButtonElement;
    const value = target.innerText;

    // 'AC' button (clear display):
    if (value === "AC") {
        display.value = "";
        return;
    }

    // 'DEL' button (delete last character):
    if (value === "DEL") {
        display.value = display.value.slice(0, -1);
        return;
    }

    // '=' button:
    if (value === "=") {
        try {
            const result = evaluateExpression(display.value);
            display.value = result.toString();
        } catch (error) {
            display.value = "Error";
        }
        return;
    }

    // Prevent multiple decimal points or multiple operators being used in a row:
    if (value === "." && display.value.includes(".")) return;
    if (
        operators.includes(value) &&
        operators.includes(display.value.slice(-1))
    )
        return;

    // Shows value to display:
    display.value += value;
};


// Event listener for all buttons:

buttons.forEach((button) => button.addEventListener("click", registerClick));


// Mathematical expressions:

const evaluateExpression = (expression: string): number => {
    const numbers: number[] = [];
    const ops: string[] = [];
    let currentNumber = "";
    let isNegative = false; // to be able to use negative numbers

    // Iterate through each character
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];

        if ((char >= "0" && char <= "9") || char === ".") {
            
            currentNumber += char;
        } else if (operators.includes(char)) {
            addNumberToArray(currentNumber, numbers, isNegative);
            currentNumber = "";
            isNegative = false;

            // For negative numbers:
            if (char === "-" && (i === 0 || operators.includes(expression[i - 1]))) {
                isNegative = true;
            } else {
                ops.push(char);
            }
        }
    }

    addNumberToArray(currentNumber, numbers, isNegative);

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
                throw new Error("Not a valid operation");
        }
    }

    return result;
};
