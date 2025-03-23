document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") return;

    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");
    li.innerHTML = `<span class="task-text">${taskText}</span> <button onclick="toggleComplete(this.parentElement)">Selesai</button> <button onclick="removeTask(this)">Hapus</button>`;
    
    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
}

function toggleComplete(task) {
    task.querySelector(".task-text").classList.toggle("completed");
    saveTasks();
}

function removeTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector(".task-text").innerText,
            completed: li.querySelector(".task-text").classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `<span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span> <button onclick="toggleComplete(this.parentElement)">Selesai</button> <button onclick="removeTask(this)">Hapus</button>`;
        taskList.appendChild(li);
    });
}