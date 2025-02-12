document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.getElementById('clearCompletedBtn').addEventListener('click', clearCompletedTasks);
document.getElementById('filterAll').addEventListener('click', () => filterTasks('all'));
document.getElementById('filterActive').addEventListener('click', () => filterTasks('active'));
document.getElementById('filterCompleted').addEventListener('click', () => filterTasks('completed'));
document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.querySelector('input[name="priority"]:checked');
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        text: taskText,
        completed: false,
        priority: priority
    };

    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskInput.value = '';
    loadTasks();
}

function loadTasks(filter = 'all') {
    const tasks = getTasksFromLocalStorage();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';

        const priorityIndicator = document.createElement('span');
        priorityIndicator.className = `priority-indicator priority-${task.priority}`;
        li.appendChild(priorityIndicator);

        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = task.text;
        li.appendChild(taskTextSpan);

        li.onclick = () => {
            toggleTaskCompletion(index);
        };

        const deleteIcon = document.createElement('span');
        deleteIcon.innerHTML = '&times;';
        deleteIcon.className = 'delete-icon';
        deleteIcon.onclick = (event) => {
            event.stopPropagation();
            deleteTask(index);
        };
        li.appendChild(deleteIcon);

        taskList.appendChild(li);
    });

    updateFilterButtonStyles(filter);
}

function updateFilterButtonStyles(activeFilter) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        if (button.id === `filter${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}`) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

function toggleTaskCompletion(index) {
    const tasks = getTasksFromLocalStorage();
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(index) {
    const tasks = getTasksFromLocalStorage();
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function clearCompletedTasks() {
    const tasks = getTasksFromLocalStorage();
    const incompleteTasks = tasks.filter(task => !task.completed);
    localStorage.setItem('tasks', JSON.stringify(incompleteTasks));
    loadTasks();
}

function filterTasks(filter) {
    loadTasks(filter);
}

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}