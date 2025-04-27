// Elements
const passwordInput = document.getElementById("passwordInput");
const copyBtn = document.getElementById("copyBtn");
const lengthParagraph = document.getElementById("lengthParagraph");
const rangeInput = document.getElementById("rangeInput");
const includeCheckboxes = document.querySelectorAll(".includeCheckboxes");
const generateBtn = document.getElementById("generateBtn");

// Data
let length = 8;
let includeLowercase = false;
let includeUppercase = false;
let includeNumbers = false;
let includeSymbols = false;

// Add Event Listener
copyBtn.addEventListener("click", event => {
    event.preventDefault();

    if(passwordInput.value === "") return;
    
    passwordInput.focus();
    passwordInput.select();
    passwordInput.setSelectionRange(0, 30);

    navigator.clipboard.writeText(passwordInput.value);
});

rangeInput.addEventListener("input", updateValue);

generateBtn.addEventListener("click", event => {
    event.preventDefault();

    updateCheckboxStates();

    generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols);
});

// Functions
function updateCheckboxStates() {
    includeCheckboxes.forEach(checkbox => {
        switch(checkbox.name) {
            case "lowercase":
                includeLowercase = checkbox.checked;
                break;
            case "uppercase":
                includeUppercase = checkbox.checked;
                break;
            case "numbers":
                includeNumbers = checkbox.checked;
                break;
            case "symbols":
                includeSymbols = checkbox.checked;
                break;
        }
    });
};

function updateValue() {
    lengthParagraph.textContent = rangeInput.value;
    length = rangeInput.value;
}

function generatePassword(passwordLength, includeLowercase, includeUppercase, includeNumbers, includeSymbols) {
    let lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    let uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numbersChars = "0123456789";
    let symbolsChars = "!@#$%&*()-+=";
    
    let includedChars = "";
    let password = "";

    // Adding chars to password
    includedChars += includeLowercase ? lowercaseChars : "";
    includedChars += includeUppercase ? uppercaseChars : "";
    includedChars += includeNumbers ? numbersChars : "";
    includedChars += includeSymbols ? symbolsChars : "";

    if(includedChars.length < 8) return;

    for(let i = 0; i < passwordLength; i++) {
        let randomIndex = Math.floor(Math.random() * includedChars.length);
        password += includedChars[randomIndex];
    }

    passwordInput.value = password;
};