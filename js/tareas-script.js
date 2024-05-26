//-------------Codigo JS para la Lista de Tareas---------------

// Cuando el contenido de la página esté completamente cargado...
document.addEventListener('DOMContentLoaded', function () {
    // Selecciona los elementos del DOM necesarios
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const tasks = document.getElementById('tasks');

    // Cargar tareas desde el almacenamiento local (localStorage)
    loadTasks();

    // Agrega un event listener al botón "Añadir Tarea"
    addTaskBtn.addEventListener('click', function () {
        // Obtiene el texto de la tarea del input
        const taskText = taskInput.value.trim();
        // Verifica si el texto no está vacío
        if (taskText !== '') {
            // Llama a la función para agregar la tarea
            addTask(taskText);
            // Guarda la tarea en el almacenamiento local
            saveTask(taskText);
            // Limpia el input
            taskInput.value = '';
            alert('Tarea agregada exitosamente')
        }
    });

    // Función para agregar una tarea a la lista
    function addTask(taskText) {
        // Crea un nuevo elemento de lista (li)
        const li = document.createElement('li');
        // Asigna el texto de la tarea al elemento de lista
        li.textContent = taskText;

        // Crea un botón de eliminar
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.classList.add('btn', 'btn-danger');
        // Agrega un event listener para eliminar la tarea al hacer clic en el botón
        deleteBtn.addEventListener('click', function () {
            tasks.removeChild(li); // Elimina el elemento de lista de la lista de tareas
            removeTask(taskText); // Llama a la función para eliminar la tarea del almacenamiento local
        });

        // Agrega el botón de eliminar al elemento de lista
        li.appendChild(deleteBtn);
        // Agrega la tarea completa (incluyendo el botón de eliminar) a la lista de tareas en el DOM
        tasks.appendChild(li);
    }

    // Función para guardar una tarea en el almacenamiento local
    function saveTask(taskText) {
        // Obtiene la lista de tareas del almacenamiento local o crea una nueva si no existe
        let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
        // Agrega la nueva tarea a la lista
        taskList.push(taskText);
        // Guarda la lista actualizada en el almacenamiento local
        localStorage.setItem('tasks', JSON.stringify(taskList));
    }

    // Función para cargar las tareas desde el almacenamiento local
    function loadTasks() {
        // Obtiene la lista de tareas del almacenamiento local o crea una nueva si no existe
        let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
        // Itera sobre la lista de tareas y agrega cada una al DOM
        taskList.forEach(function (task) {
            addTask(task);
        });
    }

    // Función para eliminar una tarea del almacenamiento local
    function removeTask(taskText) {
        // Obtiene la lista de tareas del almacenamiento local
        let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
        // Filtra la lista de tareas para eliminar la tarea específica
        taskList = taskList.filter(function (task) {
            return task !== taskText;
        });
        // Guarda la lista actualizada en el almacenamiento local
        localStorage.setItem('tasks', JSON.stringify(taskList));
        alert('Tarea eliminada exitosamente');
    }
});