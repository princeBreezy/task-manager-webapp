// script.js
const apiUrl = 'YOUR_API_GATEWAY_URL_HERE';

async function fetchTasks() {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.name;
        taskList.appendChild(li);
    });
}

async function createTask() {
    const taskName = document.getElementById('taskName').value;
    const task = { id: Date.now().toString(), name: taskName };
    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    });
    fetchTasks();
}

document.addEventListener('DOMContentLoaded', fetchTasks);
