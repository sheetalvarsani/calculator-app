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

    // 'AC' button (clear display)
    if (value === 'AC') {
        display.value = '';
        return;
    }

    // 'DEL' button (delete last character)
    if (value === 'DEL') {
        display.value = display.value.slice(0, -1);
        return;
    }

    // '=' button
    if (value === '=') {
        try {
            const result = evaluateExpression(display.value);
            display.value = result.toString();
        } catch (error) {
            display.value = 'Error';
        }
        return;
    }
};