const baseUrl = 'http://localhost:8080/api/tasks';

async function loadTasks() {
    const res = await fetch(baseUrl);
    const tasks = await res.json();
    const list = document.getElementById("taskList");
    list.innerHTML = '';
    tasks.forEach(t => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" ${t.completed ? 'checked' : ''} onclick="toggle(${t.id}, ${!t.completed})">
            ${t.title}
            <button onclick="remove(${t.id})">X</button>
        `;
        list.appendChild(li);
    });
}

async function addTask() {
    const title = document.getElementById("taskInput").value;
    await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false })
    });
    loadTasks();
}

async function toggle(id, completed) {
    await fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: '', completed })
    });
    loadTasks();
}

async function remove(id) {
    await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
    loadTasks();
}

loadTasks();
