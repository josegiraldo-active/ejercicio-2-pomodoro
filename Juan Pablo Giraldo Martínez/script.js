/**
 * AI Pomodoro Timer - Logic v4 (No Interruptions)
 */

let timeLeft = 25 * 60;
let timerId = null;
let currentMode = 'pomodoro';
let pomodoroCount = 0;

const modes = {
    pomodoro: { time: 25 * 60, class: 'mode-pomodoro' },
    short: { time: 5 * 60, class: 'mode-short' },
    long: { time: 15 * 60, class: 'mode-long' }
};

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const skipBtn = document.getElementById('skip-btn');
const modeButtons = document.querySelectorAll('.mode-btn');
const alarmSound = document.getElementById('alarm-sound');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timerDisplay.textContent = formattedTime;
    document.title = `${formattedTime} - Pomodoro`;
}

function playAlarm() {
    alarmSound.currentTime = 0;
    alarmSound.volume = 1;
    alarmSound.play().catch(e => console.warn("Audio interaction required"));
    setTimeout(() => alarmSound.pause(), 2000);
}

function switchMode(mode, autoStart = false) {
    stopTimer();
    currentMode = mode;
    timeLeft = modes[mode].time;
    
    document.body.className = modes[mode].class;
    modeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    
    updateDisplay();
    if (autoStart) startTimer();
}

function startTimer() {
    if (timerId !== null) {
        pauseTimer();
        return;
    }

    startBtn.textContent = 'PAUSE';
    startBtn.style.boxShadow = 'none';
    startBtn.style.transform = 'translateY(6px)';
    skipBtn.classList.remove('hidden');
    
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft <= 0) {
            handleCycleComplete();
        }
    }, 1000);
}

function handleCycleComplete() {
    playAlarm();
    clearInterval(timerId);
    timerId = null;

    // Flujo automático Pomodoro -> Break -> Pomodoro
    if (currentMode === 'pomodoro') {
        pomodoroCount++;
        if (pomodoroCount % 4 === 0) {
            switchMode('long', true);
        } else {
            switchMode('short', true);
        }
    } else {
        switchMode('pomodoro', true);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
    startBtn.textContent = 'START';
    startBtn.style.boxShadow = 'rgb(235, 235, 235) 0px 6px 0px';
    startBtn.style.transform = 'translateY(0px)';
}

function stopTimer() {
    pauseTimer();
    skipBtn.classList.add('hidden');
}

// Botón Skip: Salta directamente al siguiente ciclo sin preguntar
skipBtn.addEventListener('click', () => {
    handleCycleComplete();
});

// Botones de Modo: Cambian instantáneamente al modo seleccionado
modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        switchMode(btn.dataset.mode);
    });
});

startBtn.addEventListener('click', startTimer);

// Inicializar
updateDisplay();