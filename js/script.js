let tasks = [];
let currentFilter = 'all';

function addTask() {
  const taskInput = document.getElementById('task-input');
  const dueDateInput = document.getElementById('due-date-input');
  const hourInput = document.getElementById('hour-input');
  const minuteInput = document.getElementById('minute-input');

  const task = taskInput.value.trim();
  const dueDate = dueDateInput.value;
  const hour = hourInput.value.padStart(2, '0');
  const minute = minuteInput.value.padStart(2, '0');

  if (!task) {
    alert('Please enter a task.');
    return;
  }

  const timeString = (hour && minute) ? `${hour}:${minute}` : '';
  const dueDateTime = dueDate ? `${dueDate} ${timeString}` : '';

  const taskObj = {
    id: Date.now(),
    task: task,
    dueDate: dueDateTime,
    completed: false
  };

  tasks.push(taskObj);
  taskInput.value = '';
  dueDateInput.value = '';
  hourInput.value = '00';
  minuteInput.value = '00';

  displayTasks();
}

function displayTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  let filteredTasks = tasks;
  if (currentFilter === 'completed') {
    filteredTasks = tasks.filter(task => task.completed);
  }

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `<p class="text-gray-500 text-center">Task is Empty!</p>`;
    return;
  }

  filteredTasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.className = "flex justify-between items-center bg-white p-[8px] rounded shadow";

    const textClass = task.completed ? 'line-through text-gray-400' : '';

    taskElement.innerHTML = `
      <div>
        <p class="font-semibold ${textClass}">${task.task}</p>
        <p class="text-sm text-gray-600 ${textClass}">${task.dueDate}</p>
      </div>
      <div class="flex space-x-2">
        <button onclick="toggleTaskCompletion(${task.id})" class="bg-green-500 text-white px-2 py-1 rounded text-sm">
          ${task.completed ? 'Undo' : 'Complete'}
        </button>
        <button onclick="deleteTask(${task.id})" class="bg-red-500 text-white px-2 py-1 rounded text-sm">Delete</button>
      </div>
    `;

    taskList.appendChild(taskElement);
  });
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  displayTasks();
}

function deleteAllTasks() {
  tasks = [];
  displayTasks();
}

function toggleTaskCompletion(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.completed = !task.completed;
  }
  displayTasks();
}

function filterTasks(mode) {
  currentFilter = mode;
  displayTasks();
}
