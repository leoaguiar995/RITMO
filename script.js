
let pomodoro = document.getElementById('pomodoro')
let shortpause = document.getElementById('shortpause')
let longpause = document.getElementById('longpause')
let mensagem = document.getElementById('message')
let modoAtual = 'pomodoro'

const temporizador = document.getElementById('timer')
let comecarcontar = document.getElementById('comecarcontar')
let message = document.getElementById('message')

let tempo = 60 * 25
let intervalo = null
let rodando = false

function mudarModo(modo){
    modoAtual = modo;

    switch (modo) {
        case 'pomodoro':
            tempo = 25*60
            message.textContent = 'Hora de focar!'
            break;
        case 'pausaCurta':
            tempo = 5*60
            message.textContent = 'Hora de descansar'
            break;
        case 'pausaLonga':
            tempo = 15*60
            message.textContent = 'Hora de um bom descanso'
            break;
    }

    document.body.classList.remove('pomodoro', 'pausa-curta', 'pausa-longa')
    if(modo === 'pomodoro') document.body.classList.add('pomodoro')
    if(modo === 'pausaCurta') document.body.classList.add('pausa-curta')
    if(modo === 'pausaLonga') document.body.classList.add('pausa-longa')
        
    clearInterval(intervalo)
    rodando = false;
    comecarcontar.textContent = 'começar'
    attempo()
}

pomodoro.addEventListener('click', () => mudarModo('pomodoro'))
shortpause.addEventListener('click',() => mudarModo('pausaCurta'))
longpause.addEventListener('click', () => mudarModo('pausaLonga'))

//--------------------- Adicionar Tasks
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const inputTask = document.getElementById('inputTask')
const tasksContainer = document.getElementById('tasks')

function addTask(taskText){
    tasks.push({ text: taskText, completed: false})
    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTasks()
}



function renderTasks(){

    const oldTasks = document.querySelectorAll('.task-item')
    oldTasks.forEach(task => task.remove())

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div')
        taskElement.className = 'task-item';
        taskElement.innerText = task.text;

        if (task.completed){
            taskElement.classList.add('completed')
        }

        //task completa 
        taskElement.addEventListener('click', () => {
            tasks[index].completed = !tasks[index].completed;
            localStorage.setItem('tasks', JSON.stringify(tasks))
            renderTasks()
        })

        //deletar
        const deleteBtn = document.createElement('button')
        deleteBtn.innerText = 'x'
        deleteBtn.className = 'delete-btn'
        deleteBtn.addEventListener('click',  (e) => {
            e.stopPropagation();
            tasks.splice(index, 1)
            localStorage.setItem('tasks', JSON.stringify(tasks))
            renderTasks()
        })
        // ---
        taskElement.appendChild(deleteBtn)
        document.getElementById('tasksList').appendChild(taskElement);
    })
}

inputTask.addEventListener('keypress', function(event) {
    if (event.key === 'Enter'){
        const taskText = inputTask.value.trim()
        if(taskText !== ''){
            addTask(taskText)
            inputTask.value = ''
        }
    }
})

renderTasks();


// ----------------- atualizar tempo -------------------------
function attempo(){
    const minutos = String(Math.floor(tempo / 60)).padStart(2,'0')
    const segundos = String(tempo % 60).padStart(2,'0')
    document.getElementById('timer').textContent = `${minutos}:${segundos}`
}

function startorpause(){
    if(!rodando) {
        intervalo = setInterval(() => {
        if(tempo > 0){
            tempo--
            attempo();
        } else {
            clearInterval(intervalo);
            rodando = false;
            document.getElementById('timer').textContent = 'tempo esgotado!'
            mensagem.textContent = 'Descanso breve!'
        }
    },  1000)
    rodando = true
    comecarcontar.textContent = 'Pausar'

    } else {
        clearInterval(intervalo);
        rodando = false
        comecarcontar.textContent = 'Retomar'
        //mensagem.textContent = 'Descanso breve!'
    }
}

const optionButtons = document.querySelectorAll('.option-btn')

optionButtons.forEach(button => {
    button.addEventListener('click', () => {
        optionButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected')
    });
});


comecarcontar.addEventListener("click", startorpause)
 //-----------------------------------------

