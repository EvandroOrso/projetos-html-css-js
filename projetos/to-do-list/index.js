// Elements
const progress = document.getElementById("progress");
const statsCounter = document.getElementById("statsCounter");
const inputTask = document.getElementById("inputTask");
const addTaskBtn = document.getElementById("addTaskBtn");
const toDoContainer = document.getElementById("toDoContainer");
const taskTemplate = document.getElementById("taskTemplate");

// Data
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let taskCounter = 0;
let taskDoneCounter = 0;

// Using local storage
window.addEventListener("load", () => {
    tasks.forEach(task => {
        const element = createTaskElement(task);
        toDoContainer.appendChild(element);
        taskCounter++;
    })
    updateCounter();
    updateProgressBar();
})

// Adding event to the button
addTaskBtn.addEventListener("click", () => {
    const text = inputTask.value.trim();
    if(text === "") return;

    const task = {
        id: Date.now(),
        text,
        done: false
    }

    tasks.push(task);

    const element = createTaskElement(task);
    toDoContainer.appendChild(element);

    taskCounter++;
    saveTasks();
    updateCounter();
    updateProgressBar();

    inputTask.value = "";
});

// Functions
function createTaskElement(task) {
    const taskNode = taskTemplate.content.cloneNode(true);
    const element = taskNode.children[0];
    const taskParagraph = element.querySelector(".taskParagraph");
    const checkBtn = element.querySelector(".checkBtn");
    const renameTaskBtn = element.querySelector(".renameTaskBtn");
    const deleteTaskBtn = element.querySelector(".deleteTaskBtn");

    taskParagraph.textContent = task.text;

    if(task.done) {
        checkBtn.classList.add("checkedBtn");
        taskParagraph.classList.add("active");
        taskDoneCounter++;
    }

    checkBtn.addEventListener("click", () => {
        task.done = !task.done;
        checkBtn.classList.toggle("checkedBtn");
        taskParagraph.classList.toggle("active");

        task.done ? taskDoneCounter++ : taskDoneCounter--;
    
        saveTasks();
        updateCounter();
        updateProgressBar();
    });

    renameTaskBtn.addEventListener("click", () => {
        inputTask.value = taskParagraph.textContent;
        deleteTask(task.id, element);
    });

    deleteTaskBtn.addEventListener("click", () => {
        deleteTask(task.id, element);
    });

    return element;
}

function deleteTask(id, element) {
    const task = tasks.find(task => id === task.id);
    if(task.done) taskDoneCounter--;

    tasks = tasks.filter(task => id !== task.id);
    saveTasks();

    toDoContainer.removeChild(element);
    taskCounter--;

    updateCounter();
    updateProgressBar();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounter() {
    statsCounter.textContent = `${taskDoneCounter} / ${taskCounter}`;
}

function updateProgressBar() {
    if(taskCounter === 0) {
        progress.style.width = "0%";
        return;
    }

    const percent = ((taskDoneCounter / taskCounter) * 100).toFixed(2);
    progress.style.width = `${percent}%`;
}