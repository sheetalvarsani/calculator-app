import "./styles/styles.css";

const buttons = document.querySelectorAll<HTMLButtonElement>(
    ".calculator__button"
);
const display = document.querySelector<HTMLInputElement>("#display");
const operators = ["/", "*", "-", "+"];

if (!display) {
    throw new Error("Display element not found");
}

const addNumberToArray = (
    currentNumber: string,
    numbers: number[],
    isNegative: boolean
) => {
    if (currentNumber) {
        numbers.push(
            isNegative ? -parseFloat(currentNumber) : parseFloat(currentNumber)
        );
    }
};

const registerClick = (event: Event) => {
    const target = event.currentTarget as HTMLButtonElement;
    const value = target.innerText;

    if (value === "AC") {
        display.value = "";
        return;
    }

    if (value === "DEL") {
        display.value = display.value.slice(0, -1);
        return;
    }

    if (value === "=") {
        try {
            const result = evaluateExpression(display.value);
            display.value = result.toString();
        } catch (error) {
            display.value = "Error";
        }
        return;
    }

    if (value === "." && display.value.includes(".")) return;
    if (
        operators.includes(value) &&
        operators.includes(display.value.slice(-1))
    )
        return;

    display.value += value;
};

buttons.forEach((button) => button.addEventListener("click", registerClick));

const evaluateExpression = (expression: string): number => {
    const numbers: number[] = [];
    const ops: string[] = [];
    let currentNumber = "";
    let isNegative = false;

    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];

        if ((char >= "0" && char <= "9") || char === ".") {
            currentNumber += char;
        } else if (operators.includes(char)) {
            addNumberToArray(currentNumber, numbers, isNegative);
            currentNumber = "";
            isNegative = false;

            if (
                char === "-" &&
                (i === 0 || operators.includes(expression[i - 1]))
            ) {
                isNegative = true;
            } else {
                ops.push(char);
            }
        }
    }

    addNumberToArray(currentNumber, numbers, isNegative);

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
