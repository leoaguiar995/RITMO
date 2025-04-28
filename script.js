
let pomodoro = document.getElementById('pomodoro')
let shortpause = document.getElementById('shortpause')
let longpause = document.getElementById('longpause')

const temporizador = document.getElementById('timer')

let comecarcontar = document.getElementById('comecarcontar')
let message = document.getElementById('message')

let tempo = 25 * 60
let intervalo = null;
let rodando = false;

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
        }
    },  1000)
    rodando = true
    comecarcontar.textContent = 'Pausar'

    } else {
        clearInterval(intervalo);
        rodando = false
        comecarcontar.textContent = 'Retomar'
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


