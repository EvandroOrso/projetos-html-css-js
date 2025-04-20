// Elements
const calculatorInput = document.getElementById("calculatorInput");
const historyContainer = document.querySelector(".history");
const historyContent = document.querySelector(".historyContent");
const operationTemplate = document.getElementById("operationTemplate");

// Data
let operationsHistory = JSON.parse(localStorage.getItem("operations")) || [];
let operations = ['/', '*', '-', '+'];

// Local Storage
window.addEventListener("load", () => {
    operationsHistory.forEach(operation => {
        const element = createOperationElement(operation);
        historyContent.prepend(element);
    })
});

// Functions
function appendToDisplay(value) {
    if(calculatorInput.value === "Error") calculatorInput.value = "";

    calculatorInput.value += value;
}

function calculate() {
    try {
        if(calculatorInput.value.length <= 1 ||
           !operations.some(operation => calculatorInput.value.includes(operation))) return;

        const result = math.evaluate(calculatorInput.value);

        const operation = {
            id: crypto.randomUUID(),
            value: calculatorInput.value,
            result,
            date: new Date().toLocaleString()
        };

        calculatorInput.value = result;

        operationsHistory.push(operation);
        saveToLocalStorage();

        const element = createOperationElement(operation);
        historyContent.prepend(element);
    } catch (error) {
        calculatorInput.value = "Error";
    }
}

function createOperationElement(operation) {
    const operationNode = operationTemplate.content.cloneNode(true);
    const element = operationNode.children[0];
    const value = element.querySelector("#value");
    const result = element.querySelector("#result");
    const deleteBtn = element.querySelector("#deleteBtn");

    value.textContent = operation.value;
    result.textContent = operation.result;

    deleteBtn.addEventListener("click", () => {
        deleteTask(operation.id, element);
    })

    return element;
}

function deleteTask(id, element) {
    operationsHistory = operationsHistory.filter(operation => id !== operation.id);
    saveToLocalStorage();
    historyContent.removeChild(element);
}

function saveToLocalStorage() {
    localStorage.setItem("operations", JSON.stringify(operationsHistory));
}


function clearAll() {
    try {
        calculatorInput.value = "";
    } catch (error) {
        calculatorInput.value = "Error";
    }
}

function deleteDigit() {
    calculatorInput.value = calculatorInput.value.slice(0, -1);
}

function openHistory() {
    historyContainer.classList.toggle("visible");
}

// Using calculator by keyboard
document.addEventListener("keydown", event => {
    if(calculatorInput.value === "Error") calculatorInput.value = "";

    const tecla = event.key;

    const teclasValidas = "0123456789./*-+";

    if(teclasValidas.includes(tecla)) {
        calculatorInput.value += tecla;
    }

    if(tecla === "Enter") {
        calculate();
    }

    if(tecla === "Backspace") {
        deleteDigit();
    }
});