document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const tasks = document.getElementById('tasks');

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.addEventListener('click', function() {
            tasks.removeChild(li);
        });

        li.appendChild(deleteBtn);
        tasks.appendChild(li);
    }
});
//Almacenamiento en localStorage
document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const tasks = document.getElementById('tasks');

    // Cargar tareas desde LocalStorage
    loadTasks();

    addTaskBtn.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            saveTask(taskText);
            taskInput.value = '';
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.addEventListener('click', function() {
            tasks.removeChild(li);
            removeTask(taskText);
        });

        li.appendChild(deleteBtn);
        tasks.appendChild(li);
    }

    function saveTask(taskText) {
        let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(taskList));
    }

    function loadTasks() {
        let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.forEach(function(task) {
            addTask(task);
        });
    }

    function removeTask(taskText) {
        let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList = taskList.filter(function(task) {
            return task !== taskText;
        });
        localStorage.setItem('tasks', JSON.stringify(taskList));
    }
});
//Notificaciones
document.addEventListener('DOMContentLoaded', function() {
    // ... (código anterior)

    function notifyUser(taskText) {
        if (Notification.permission === 'granted') {
            new Notification('Recordatorio de Tarea', {
                body: `No olvides: ${taskText}`
            });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification('Recordatorio de Tarea', {
                        body: `No olvides: ${taskText}`
                    });
                }
            });
        }
    }

    function setRecurrentTask(taskText, interval) {
        setInterval(() => {
            notifyUser(taskText);
        }, interval);
    }

    // Ejemplo de uso:
    // setRecurrentTask('Ejemplo de tarea recurrente', 60000); // Notifica cada minuto
});
