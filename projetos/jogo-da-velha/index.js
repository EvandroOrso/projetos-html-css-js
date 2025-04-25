// Elements
const xScoreParagraph = document.getElementById("xScoreParagraph");
const oScoreParagraph = document.getElementById("oScoreParagraph");
const cells = document.querySelectorAll("[data-cell]");
const resultParagraph = document.getElementById("resultParagraph");
const turnParagraph = document.getElementById("turnParagraph");
const restartBtn = document.getElementById("restartBtn");

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6]             // Diagonais
];

// Data
let currentPlayer = "X";
let options = Array(9).fill(null);
let xScore = 0;
let oScore = 0;
let gameRunning = true;
let interval;

// Start Game
startGame();

// Add Event Listener
restartBtn.addEventListener("click", () => {
    restartGame();
});

// Functions
function startGame() {
    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            if(!gameRunning || options[index]) return;
            if(!gameRunning) gameRunning = true;

            if(gameRunning) clearInterval(interval);

            options[index] = currentPlayer;
            cell.textContent = currentPlayer;

            const winningCombo = checkVictory();
            if(winningCombo) {
                handleVictory(winningCombo);
            } else if(!options.includes(null)) {
                resultParagraph.textContent = "It's a tie!";
                resultParagraph.style.color = "gainsboro";
                gameRunning = false;
                interval = setTimeout(restartGame, 5000);
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                changeTurnParagraph();
            }
        })
    })
};

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.color = "";
    });
    resultParagraph.textContent = "";
    gameRunning = true;
    options = Array(9).fill(null);
    currentPlayer = "X";
    changeTurnParagraph();
}

function changeTurnParagraph() {
    turnParagraph.textContent = `It's ${currentPlayer}'s Turn`;
};

function checkVictory() {
    return winConditions.find(condition => {
        const [a, b, c] = condition;
        return (
          options[a] &&
          options[a] === options[b] &&
          options[a] === options[c]
        );
    });
};

function handleVictory(winningCombo) {
    resultParagraph.style.color = "lightgreen";

    if(currentPlayer === "X") {
        xScore++;
        xScoreParagraph.textContent = `X - ${xScore}`;
        resultParagraph.textContent = "Player X wins!"
    } else {
        oScore++;
        oScoreParagraph.textContent = `O - ${oScore}`;
        resultParagraph.textContent = "Player O wins!"
    }

    winningCombo.forEach(index => {
        cells[index].style.color = "red";
    });

    gameRunning = false;

    interval = setTimeout(restartGame, 5000);
};