document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');
    const completedTasksTable = document.getElementById('completedTasksTable').getElementsByTagName('tbody')[0];

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        completedTasksTable.innerHTML = '';
        let taskNumber = 1;

        tasks.forEach((task, index) => {
            if (task.completed) {
                const row = completedTasksTable.insertRow();
                row.innerHTML = `
                    <td class="text-left py-3 px-4">${taskNumber++}</td>
                    <td class="text-left py-3 px-4">${task.text}</td>
                    <td class="text-left py-3 px-4">${new Date(task.createdAt).toLocaleString()}</td>
                    <td class="text-left py-3 px-4">${new Date(task.completedAt).toLocaleString()}</td>
                `;
            } else {
                const li = document.createElement('li');
                li.className = 'flex justify-between items-center p-3 bg-gray-200 rounded-lg';
                li.innerHTML = `
                    <span>${task.text}</span>
                    <div>
                        <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2" onclick="markAsCompleted(${index})">Complete</button>
                        <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onclick="deleteTask(${index})">Delete</button>
                    </div>
                `;
                taskList.appendChild(li);
            }
        });
    };

    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ 
                text: taskText, 
                completed: false, 
                createdAt: new Date(),
                completedAt: null
            });
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }
    });

    window.markAsCompleted = (index) => {
        tasks[index].completed = true;
        tasks[index].completedAt = new Date();
        saveTasks();
        renderTasks();
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    renderTasks();
});