// Elements
const stopwatchsContainer = document.querySelector(".stopwatchsContainer");
const stopwatchTemplate = document.querySelector(".stopwatchTemplate");
const numberBtns = document.querySelectorAll(".numberBtns");

// Data
let intervals = [];

function createStopwatches(count) {
    intervals.forEach(clearInterval);
    intervals = [];

    stopwatchsContainer.innerHTML = "";

    for(let i = 0; i < count; i++) {
        const stopwatchNode = stopwatchTemplate.content.cloneNode(true);
        const element = stopwatchNode.children[0];
        stopwatchsContainer.appendChild(element);

        const stopwatchContent = element.querySelector(".stopwatch");
        const startBtn = element.querySelector(".startBtn");
        const stopBtn = element.querySelector(".stopBtn");
        const resetBtn = element.querySelector(".resetBtn");

        // Stopwatch data
        let interval = null;
        let centiseconds = 0;
        let seconds = 0;
        let minutes = 0;
        let hours = 0;

        function formatTime() {
            if(centiseconds >= 100) {
                centiseconds = 0;
                seconds++;
            }

            if(seconds >= 60) {
                seconds = 0;
                minutes++;
            }

            if(minutes >= 60) {
                minutes = 0;
                hours++;
            }

            return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(centiseconds).padStart(2, "0")}`;
        };

        function updateDisplay() {
            stopwatchContent.textContent = formatTime();
        };

        startBtn.addEventListener("click", () => {
            if(interval === null) {
                interval = setInterval(() => {
                    centiseconds++;
                    updateDisplay();
                }, 10);
                intervals.push(interval);
            }
        });

        stopBtn.addEventListener("click", () => {
            clearInterval(interval);
            interval = null;
        });

        resetBtn.addEventListener("click", () => {
            clearInterval(interval);
            interval = null;
            centiseconds = 0;
            seconds = 0;
            minutes = 0;
            hours = 0;
            updateDisplay();
        });
    }
};

window.addEventListener("load", () => {
    createStopwatches(1);
});

numberBtns.forEach(numberBtn => {
    numberBtn.addEventListener("click", () => {
        const count = parseInt(numberBtn.textContent);
        createStopwatches(count);
    });
});