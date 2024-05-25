document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const tasks = document.getElementById('tasks');

    addTaskBtn.addEventListener('click', function () {
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
        deleteBtn.addEventListener('click', function () {
            tasks.removeChild(li);
        });

        li.appendChild(deleteBtn);
        tasks.appendChild(li);
    }
});
//Almacenamiento en localStorage
document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const tasks = document.getElementById('tasks');

    // Cargar tareas desde LocalStorage
    loadTasks();

    addTaskBtn.addEventListener('click', function () {
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
        deleteBtn.addEventListener('click', function () {
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
        taskList.forEach(function (task) {
            addTask(task);
        });
    }

    function removeTask(taskText) {
        let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList = taskList.filter(function (task) {
            return task !== taskText;
        });
        localStorage.setItem('tasks', JSON.stringify(taskList));
    }
});
//Notificaciones
document.addEventListener('DOMContentLoaded', function () {
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
    WIN_MESSAGE = () => `El jugador ${currentPlayer} ha ganado!`,
    DRAW_MESSAGE = () => `El juego ha terminado en empate!`,
    CURRENT_PLAYER_TURN = () => `Turno del jugador ${currentPlayer}`

// Variables
let gameActive = true,
    currentPlayer = 'O'

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
    currentPlayer = "X"
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
    clickedCell.innerHTML = currentPlayer
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
    currentPlayer = currentPlayer === "X" ? "O" : "X"
    handleStatusDisplay(CURRENT_PLAYER_TURN())
}

function restartGameState() {
    let i = GAME_STATE.length
    while (i--) {
        GAME_STATE[i] = ''
    }
}

main()
