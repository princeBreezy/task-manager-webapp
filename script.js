const apiUrl = 'https://j0s5pf7acf.execute-api.us-east-1.amazonaws.com/myproduction';

async function fetchTasks() {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.name;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(task.id);
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editTask(task.id, task.name);
        li.appendChild(editButton);
        li.appendChild(deleteButton);
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

async function deleteTask(id) {
    await fetch(`${apiUrl}?id=${id}`, {
        method: 'DELETE'
    });
    fetchTasks();
}

async function editTask(id, currentName) {
    const newName = prompt('Edit task name:', currentName);
    if (newName) {
        const task = { id: id, name: newName };
        await fetch(apiUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        });
        fetchTasks();
    }
}

document.addEventListener('DOMContentLoaded', fetchTasks);
