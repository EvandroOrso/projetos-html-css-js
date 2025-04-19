// Variables
const minMaxContainer = document.getElementById("maxMinContainer");
const minMaxForm = document.getElementById("maxMinForm");
const minValueInput = document.getElementById("minValueInput");
const maxValueInput = document.getElementById("maxValueInput");
const errorMessage = document.getElementById("errorMessage");

const guessContainer = document.getElementById("guessContainer");
const guessTitle = document.getElementById("guessTitle");
const guessForm = document.getElementById("guessForm");
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const answer = document.getElementById("answer");

const resetBtn = document.getElementById("resetBtn");
const playAgainBtn = document.getElementById("playAgainBtn");

let min;
let max;
let randomNumber;

// Max min form
minMaxForm.addEventListener("submit", event => {

    event.preventDefault();

    const minValue = Number(minValueInput.value)
    const maxValue = Number(maxValueInput.value);

    if(minValue > maxValue) {
        errorMessage.innerText = "O valor mínimo não pode ser maior que o valor máximo";
    } else if(minValue === maxValue) {
        errorMessage.innerText = "O valor mínimo e máximo não podem ser iguais.";
    } else if(minValue < 1 || maxValue > 1000000) {
        errorMessage.innerText = "O valor não pode ser menor que um e nem maior que um milhão.";
    } else {
        // Define os valores minimos e máximos
        min = Number(minValueInput.value);
        max = Number(maxValueInput.value);
        
        guessTitle.innerText = `Adivinhe o número entre ${min} e ${max}:`;

        // Gera um número aleatório
        randomNumber = Math.floor((Math.random() * (max - min + 1)) + min);
        // console.log(randomNumber);

        // Faz o container anterior desaparecer para um novo aparecer
        minMaxContainer.style.display = "none";
        guessContainer.style.display = "flex";

        // Limpa o texto da resposta e input. Também oculta o botão de jogar novamente.
        answer.innerText = "";
        guessInput.value = "";
        playAgainBtn.style.display = "none";

        // Garante que o botão de resetar esteja visível
        resetBtn.style.display = "block";
    }
})

// Guess form
guessForm.addEventListener("submit", event => {

    event.preventDefault();

    const guess = Number(guessInput.value);

    guessInput.value = "";

    checkNumber(guess);
})

function checkNumber(guess) {

    if(guess < min || guess > max) {
        answer.textContent = `Por favor, insira um número entre ${min} e ${max}.`;
    } else {
        if (guess === randomNumber) {
            answer.textContent = `Parabéns! O número correto era: ${guess}.`;
            resetBtn.style.display = "none";
            playAgainBtn.style.display = "block";
        } else if (guess > randomNumber) {
            max = guess - 1;
            answer.textContent = `Tente novamente! O número é menor que ${guess}. Entre ${min} e ${max}.`;
        } else {
            min = guess + 1;
            answer.textContent = `Tente novamente! O número é maior que ${guess}. Entre ${min} e ${max}.`;
        }
    }   
}

// Reset button
resetBtn.addEventListener("click", () => {

    resetGame();
})

// Play again button
playAgainBtn.addEventListener("click", () => {

    resetGame();
});

function resetGame() {
    guessContainer.style.display = "none";
    minMaxContainer.style.display = "flex";
    minValueInput.value = "";
    maxValueInput.value = "";
    errorMessage.innerText = "";
}