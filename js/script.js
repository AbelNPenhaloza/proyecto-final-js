//------------Header y Footer desde el js

document.querySelector('header').innerHTML = `
<div data-aos="flip-left"
data-aos-easing="ease-out-cubic"
data-aos-duration="2000">
<a href="index.html"> <img class="d-block mx-auto mb-4" src="./img/cilsa.jpg" alt="logo" height="155"></a>
</div>    
 <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
`;

// Insertar el contenido del pie de página
document.querySelector('footer').innerHTML = `
    <div class="mapa-sitio">
<h6>Desarollado por Valeria, Abel y Paola Fraticola</h6>
    </div>
    

`;


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
    }
});
//---------------------------------Logica del Juego TA TE TI ---------------------

const STATUS_DISPLAY = document.querySelector('.game-notification'),
    GAME_STATE = ["", "", "", "", "", "", "", "", ""],
    WINNINGS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],

    WIN_MESSAGE = () => `${currentPlayer} ha ganado el juego!`,
    DRAW_MESSAGE = () => `El juego ha terminado en empate!`,
    CURRENT_PLAYER_TURN = () => `Turno de ${currentPlayer}`

// Variables
let gameActive = true;
const PLAYER_SYMBOLS = {
    [player1]: 'O',
    [player2]: 'X'
};
let currentPlayer = player1;

// Funciones
function main() {
    handleStatusDisplay(CURRENT_PLAYER_TURN())
    listeners()
}

function listeners() {
    document.querySelector('.game-container').addEventListener('click', handleCellClick)
    document.querySelector('#restartGameState').addEventListener('click', handleRestartGame)
}

function handleStatusDisplay(message) {
    STATUS_DISPLAY.innerHTML = message
}

function handleRestartGame() {
    gameActive = true
    currentPlayer = player1;
    restartGameState()
    handleStatusDisplay(CURRENT_PLAYER_TURN())
    document.querySelectorAll('.game-cell').forEach(cell => cell.innerHTML = "")
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target
    if (clickedCell.classList.contains('game-cell')) {
        const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell)
        if (GAME_STATE[clickedCellIndex] !== '' || !gameActive) {
            return false
        }

        handleCellPlayed(clickedCell, clickedCellIndex)
        handleResultValidation()
    }
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    GAME_STATE[clickedCellIndex] = currentPlayer
    clickedCell.innerHTML = PLAYER_SYMBOLS[currentPlayer];
}

function handleResultValidation() {
    let roundWon = false
    for (let i = 0; i < WINNINGS.length; i++) {
        const winCondition = WINNINGS[i]
        let position1 = GAME_STATE[winCondition[0]],
            position2 = GAME_STATE[winCondition[1]],
            position3 = GAME_STATE[winCondition[2]]

        if (position1 === '' || position2 === '' || position3 === '') {
            continue
        }
        if (position1 === position2 && position2 === position3) {
            roundWon = true
            break
        }
    }

    if (roundWon) {
        handleStatusDisplay(WIN_MESSAGE())
        gameActive = false
        return
    }

    let roundDraw = !GAME_STATE.includes("")
    if (roundDraw) {
        handleStatusDisplay(DRAW_MESSAGE())
        gameActive = false
        return
    }

    handlePlayerChange()
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === player1 ? player2 : player1
    handleStatusDisplay(CURRENT_PLAYER_TURN())
}

function restartGameState() {
    let i = GAME_STATE.length
    while (i--) {
        GAME_STATE[i] = ''
    }
}

main()
