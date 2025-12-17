const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const skipBtn = document.getElementById('skip-btn');
const modeButtons = document.querySelectorAll('.mode-btn');
const alarmSound = document.getElementById('alarm-sound');
const body = document.body;

let timeLeft = 25 * 60; 
let timerId = null;
let currentModeIndex = 0; // 0: 25min, 1: 15min, 2: 5min

// Mapeo de modos para la funcionalidad "Skip"
const modes = [
    { id: 'btn-25', time: 25, theme: 'pomodoro-theme' },
    { id: 'btn-15', time: 15, theme: 'long-break-theme' },
    { id: 'btn-5', time: 5, theme: 'short-break-theme' }
];

function updateDisplay() {
    // Asegurar que timeLeft nunca sea menor a 0
    const totalSeconds = Math.max(0, timeLeft);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (timerId) return; // Evitar múltiples intervalos

    startBtn.classList.add('hidden');
    pauseBtn.classList.remove('hidden');
    skipBtn.classList.remove('hidden');

    timerId = setInterval(() => {
        timeLeft--;
        
        if (timeLeft <= 0) {
            timeLeft = 0; // Forzar a 0 antes de limpiar
            updateDisplay();
            finishTimer();
        } else {
            updateDisplay();
        }
    }, 1000);
}

function finishTimer() {
    clearInterval(timerId);
    timerId = null;
    
    // Sonido prolongado (reproducir 3 veces o loop corto)
    alarmSound.loop = true;
    alarmSound.play();
    
    setTimeout(() => {
        alarmSound.loop = false;
        alarmSound.pause();
        alarmSound.currentTime = 0;
    }, 4000); // 4 segundos de sonido

    alert("¡Ciclo completado!");
    resetToInitialState();
}

function resetToInitialState() {
    clearInterval(timerId);
    timerId = null;
    timeLeft = modes[currentModeIndex].time * 60;
    updateDisplay();
    
    startBtn.classList.remove('hidden');
    pauseBtn.classList.add('hidden');
    skipBtn.classList.add('hidden');
}

function skipTimer() {
    // Lógica cíclica: 25 -> 15 -> 5 -> 25
    currentModeIndex = (currentModeIndex + 1) % modes.length;
    const nextMode = modes[currentModeIndex];
    
    // Simular click en el botón correspondiente para cambiar tema y tiempo
    document.getElementById(nextMode.id).click();
}

// Eventos de botones de modo
modeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        currentModeIndex = index;
        modeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        timeLeft = parseInt(button.dataset.time) * 60;
        body.className = button.dataset.theme;
        
        resetToInitialState();
    });
});

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    startBtn.classList.remove('hidden');
    pauseBtn.classList.add('hidden');
});

skipBtn.addEventListener('click', skipTimer);

// Inicialización
updateDisplay();