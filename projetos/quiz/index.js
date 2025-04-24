// Elements
const configurationContainer = document.getElementById("configurationContainer");
const selectCategoryBtns = document.querySelectorAll(".selectCategoryBtn");
const numberQuestionsBtns = document.querySelectorAll(".numberQuestionsBtn");
const startQuizBtn = document.getElementById("startQuizBtn");
const quizContainer = document.getElementById("quizContainer");
const timer = document.getElementById("timer");
const questionImgContainer = document.querySelector(".questionImgContainer");
const answerBtns = document.querySelectorAll(".answerBtn");
const nextBtn = document.getElementById("nextBtn");
const progressSection = document.querySelector(".progressSection");
const progressBar = document.querySelector(".progressBar");
const progress = document.querySelector(".progress");
const completionParagraph = document.getElementById("completionParagraph");
const resultContainer = document.getElementById("resultContainer");
const tryAgainBtn = document.getElementById("tryAgainBtn");

// Data
let currentCategory = null;
let questionNumber = 0;
let currentQuestionNumber = 1;
let correctAnswers = 0;
let currentIndex = 0;
let finalQuestions = [];
let interval = null;
let time;

// Adding Event Listener
selectCategoryBtns.forEach(selectCategoryBtn => {
    selectCategoryBtn.addEventListener("click", () => {
        selectCategoryBtns.forEach(selectCategoryBtn => selectCategoryBtn.style.backgroundColor = "");

        selectCategoryBtn.style.backgroundColor = "#bcb1ff";
        currentCategory = selectCategoryBtn.textContent.toLowerCase();
    })
});

numberQuestionsBtns.forEach(numberQuestionsBtn => {
    numberQuestionsBtn.addEventListener("click", () => {
        numberQuestionsBtns.forEach(numberQuestionsBtn => numberQuestionsBtn.style.backgroundColor = "");

        numberQuestionsBtn.style.backgroundColor = "#bcb1ff";
        questionNumber = Number(numberQuestionsBtn.textContent);
    })
});

startQuizBtn.addEventListener("click", () => {
    startQuiz();
    completionParagraph.innerHTML = `<strong>${currentQuestionNumber}</strong> of <strong>${questionNumber}</strong> Questions`;
});

nextBtn.addEventListener("click", () => {
    if(currentIndex + 1 === questionNumber) {
        quizContainer.style.display = "none";
        resultContainer.style.display = "flex";
        resultContainer.querySelector("p").innerHTML = `<p>You scored <strong>${correctAnswers}</strong> out of <strong>${questionNumber}</strong> questions correctly. Great effort!</p>`;
        return;
    }

    // Reset
    answerBtns.forEach(answerBtn => {
        answerBtn.style.backgroundColor = "";
        answerBtn.disabled = false;
    });
    progressSection.style.padding = "20px";
    progressBar.style.width = "65%";
    nextBtn.style.display = "none";

    // New Question
    currentIndex++;
    displayQuestion(finalQuestions[currentIndex]);

    // Update
    currentQuestionNumber++;
    completionParagraph.innerHTML = `<strong>${currentQuestionNumber}</strong> of <strong>${questionNumber}</strong> Questions`;
    updateProgress();
    updateTimer();
});

tryAgainBtn.addEventListener("click", () => {
    // Reset data
    currentCategory = null;
    questionNumber = 0;
    currentQuestionNumber = 1;
    currentIndex = 0;
    correctAnswers = 0;

    // Reset selected buttons
    selectCategoryBtns.forEach(selectCategoryBtn => selectCategoryBtn.style.backgroundColor = "");
    numberQuestionsBtns.forEach(numberQuestionsBtn => numberQuestionsBtn.style.backgroundColor = "");
    answerBtns.forEach(answerBtn => {
        answerBtn.disabled = false;
        answerBtn.style.backgroundColor = "";
    });

    // Reset progress
    progress.style.width = `${1 / questionNumber * 100}%`;

    // Reset Button
    progressSection.style.padding = "20px";
    progressBar.style.width = "65%";
    nextBtn.style.display = "none";
    
    resultContainer.style.display = "none";
    configurationContainer.style.display = "flex";
});

answerBtns.forEach((answerBtn, index) => {
    answerBtn.addEventListener("click", () => handleAnswerClick(index));
});

// Functions
function startQuiz() {
    if(currentCategory === null || questionNumber === 0) return;

    configurationContainer.style.display = "none";
    quizContainer.style.display = "block";

    updateTimer();

    const categoryQuestions = questions.categories[currentCategory];
    finalQuestions = shuffleArray(categoryQuestions).slice(0, questionNumber);
    
    finalQuestions.forEach(question => shuffleArray(question.answers));

    displayQuestion(finalQuestions[currentIndex]);

    progress.style.width = `${1 / questionNumber * 100}%`;
};

function shuffleArray(array) {
    for(let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
};

function displayQuestion(question) {
    /* Change Image */
    questionImgContainer.innerHTML = `<img src="Imagens/${question.image}" alt="Question Image" id="questionImg">`;

    /* Change answers */
    for(let i = 0; i <= 3; i++) {
        answerBtns[i].textContent = question.answers[i].text;
    };
};

function handleAnswerClick(index) {
    // Stop timer
    if(interval) clearInterval(interval);

    answerBtns.forEach(answerBtn => answerBtn.disabled = true);

    const currentQuestion = finalQuestions[currentIndex];
    const verification = currentQuestion.answers[index].isCorrect;

    if(verification) {
        answerBtns[index].style.backgroundColor = "lightgreen";
        correctAnswers++;
    } else {
        answerBtns[index].style.backgroundColor = "tomato";
    }

    if (!verification) {
        currentQuestion.answers.forEach((answer, i) => {
            if (answer.isCorrect) {
                answerBtns[i].style.backgroundColor = "lightgreen";
            }
        });
    }

    nextBtn.style.display = "flex";
};

function updateProgress() {
    progress.style.width = `${currentQuestionNumber / questionNumber * 100}%`;
};

function updateTimer() {
    // Reset
    timer.style.backgroundColor = "";
    time = 30;

    timer.innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${time}`;

    interval = setInterval(() => {
        time--;
        timer.innerHTML = `<i class="fa-solid fa-stopwatch"></i> ${time}`;

        if(time === 0) {
            clearInterval(interval);
            answerBtns.forEach(answerBtn => answerBtn.disabled = true);

            finalQuestions[currentIndex].answers.forEach((answer, i) => {
                if(answer.isCorrect) {
                    answerBtns[i].style.backgroundColor = "lightgreen";
                }
            });

            nextBtn.style.display = "flex";
        };

        if(time <= 10) {
            timer.style.backgroundColor = "tomato";
        }
    }, 1000);
};