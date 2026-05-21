const taskForm = document.getElementById('taskForm');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Load saved tasks
window.addEventListener('DOMContentLoaded', () => {
    displayTasks();
});

// Add Task
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskName = taskInput.value.trim();
    const dueDate = dateInput.value;

    // Validation
    if (taskName === '' || dueDate === '') {
       alert('Please fill in both task name and due date!');
        return;
    }

    const task = {
        id: Date.now(),
        name: taskName,
        date: dueDate
    };

    tasks.push(task);
    saveTasks();
    displayTasks();

    // Reset Inputs
    taskInput.value = '';
    dateInput.value = '';
});

// Display Tasks
function displayTasks() {
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskCard = document.createElement('div');

        taskCard.className = 'bg-white p-5 rounded-lg shadow-md';

        taskCard.innerHTML = `
            <h3 class="text-xl font-semibold">${task.name}</h3>
            <p class="text-gray-600 mt-2">Due Date: ${task.date}</p>
            <button
                onclick="deleteTask(${task.id})"
                class="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full"
            >
                Delete
            </button>
        `;

        taskList.appendChild(taskCard);
    });
}

// Delete Task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    displayTasks();
}

// Save to Local Storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}