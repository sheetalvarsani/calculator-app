import "./styles/styles.css";

// DOM element queries:

const buttons = document.querySelectorAll<HTMLButtonElement>(".calculator__button");
const display = document.querySelector<HTMLInputElement>("#display");
const operators = ["/", "*", "-", "+"];


// Check display element exists otherwise error thrown:

if (!display) {
    throw new Error("Display element not found");
}


// Helper function to handle adding numbers to array and whether a nymber is negative or positive:

const addNumberToArray = (currentNumber: string, numbers: number[], isNegative: boolean) => {
    if (currentNumber) {
        numbers.push(isNegative ? -parseFloat(currentNumber) : parseFloat(currentNumber)); // converts number to float and adds '-' if needed
    }
};


// Click events for calculator buttons:

const registerClick = (event: Event) => {
    const target = event.currentTarget as HTMLButtonElement; // get clicked button element
    const value = target.innerText; // get text of clicked button

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

    // Shows value of clicked buttom to display:
    display.value += value;
};


// Event listener for all buttons:

buttons.forEach((button) => button.addEventListener("click", registerClick));


// Function to evaluate mathematical expressions:

const evaluateExpression = (expression: string): number => {
    const numbers: number[] = []; // array for numbers
    const ops: string[] = []; // array for mathematical operators
    let currentNumber = ""; // store number
    let isNegative = false; // check if number is negative

    // Iterate through each character in expression:
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];

        if ((char >= "0" && char <= "9") || char === ".") {
            currentNumber += char; // If character is digit or decimal point, add to current number
        } else if (operators.includes(char)) { // If there is an operator (+, -, *, /)
            addNumberToArray(currentNumber, numbers, isNegative); // Add to numbers array (handle negative if needed)
            currentNumber = ""; // reset number
            isNegative = false; // reset negative check

            // For negative numbers:
            if (char === "-" && (i === 0 || operators.includes(expression[i - 1]))) {
                isNegative = true;
            } else {
                ops.push(char);
            }
        }
    }

    // Add the last number to the numbers array
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

    return result; // final calculation result
};
