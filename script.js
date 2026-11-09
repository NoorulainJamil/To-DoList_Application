let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks = tasks.map(task =>
    typeof task === "string"
        ? { text: task, completed: false }
        : task
);

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    const sortedTasks = tasks
        .map((task, index) => ({ ...task, index }))
        .sort((a, b) => a.completed - b.completed);

    sortedTasks.forEach((task) => {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.completed;

        checkbox.onchange = function() {
            toggleTask(task.index);
        };

        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.text;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit";

        editButton.onclick = function() {
            editTask(task.index);
        };

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";

        deleteButton.onclick = function() {
            deleteTask(task.index);
        };

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById("taskInput");
    const task = input.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: task,
        completed: false
    });

    saveTasks();
    displayTasks();

    input.value = "";
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    displayTasks();
}

function editTask(index) {
    const updatedTask = prompt(
        "Edit your task:",
        tasks[index].text
    );

    if (updatedTask === null) return;

    if (updatedTask.trim() === "") {
        alert("Task cannot be empty!");
        return;
    }

    tasks[index].text = updatedTask.trim();

    saveTasks();
    displayTasks();
}

function deleteTask(index) {
    if (confirm("Are you sure you want to delete this task?")) {
        tasks.splice(index, 1);

        saveTasks();
        displayTasks();
    }
}

saveTasks();
displayTasks();
