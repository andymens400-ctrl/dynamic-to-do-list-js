// Wait until the DOM content has fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // In-memory tasks array (loaded from localStorage)
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Save the current tasks array to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create a DOM <li> for a given task text and append it to the list
    function createTaskElement(taskText) {
        // Create list item
        const li = document.createElement('li');

        // Create a span to hold the task text (keeps text separate from buttons)
        const span = document.createElement('span');
        span.textContent = taskText;
        li.appendChild(span);

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn'); // use classList.add as requested

        // Remove task both from DOM and from tasks array, then update localStorage
        removeBtn.addEventListener('click', () => {
            // Find the index of this li among taskList children
            const index = Array.from(taskList.children).indexOf(li);
            if (index > -1) {
                // Remove from tasks array and persist
                tasks.splice(index, 1);
                saveTasks();
            }
            // Remove from DOM
            taskList.removeChild(li);
        });

        // Append the remove button and the item to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);
    }

    // Load tasks from localStorage and render them in the DOM
    function loadTasks() {
        // Clear existing list in the DOM
        taskList.innerHTML = '';

        // For each stored task text, create a task element
        tasks.forEach(taskText => {
            createTaskElement(taskText);
        });
    }

    // Add a new task (reads from input), save to array + localStorage, and render it
    function addTask() {
        const taskText = taskInput.value.trim();

        // If empty, alert user
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Update in-memory array and persist
        tasks.push(taskText);
        saveTasks();

        // Create and append DOM element for this task
        createTaskElement(taskText);

        // Clear the input field
        taskInput.value = '';
    }

    // Attach event listeners
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Initial load of tasks on DOMContentLoaded
    loadTasks();
});
