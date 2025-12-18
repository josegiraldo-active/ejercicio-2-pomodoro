/**
 * Senior Vanilla JS Pomodoro Logic
 */

const state = {
    minutes: 25,
    seconds: 0,
    isActive: false,
    currentMode: 'pomodoro',
    timerId: null,
    config: {
        pomodoro: { time: 25, color: '#ba4949' },
        short: { time: 5, color: '#38858a' },
        long: { time: 15, color: '#397097' }
    }
};

// --- Audio Engine (Sintetizador simple) ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (type === 'click') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
    } else if (type === 'alarm') {
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.5);
        gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 1);
    }
}

// --- DOM Elements ---
const timerEl = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const skipBtn = document.getElementById('skip-btn');
const modeButtons = document.querySelectorAll('.mode-btn');

// --- Logic Functions ---

function updateUI() {
    const minStr = String(state.minutes).padStart(2, '0');
    const secStr = String(state.seconds).padStart(2, '0');
    const timeDisplay = `${minStr}:${secStr}`;
    
    // Actualizar Reloj y Título
    timerEl.textContent = timeDisplay;
    document.title = `${timeDisplay} - ${state.currentMode === 'pomodoro' ? 'Time to focus!' : 'Break time!'}`;
    
    // Colores de fondo y botón
    const themeColor = state.config[state.currentMode].color;
    document.body.style.backgroundColor = themeColor;
    startBtn.style.color = themeColor;

    // Estado del botón
    startBtn.textContent = state.isActive ? 'STOP' : 'START';
}

function switchMode(mode) {
    state.currentMode = mode;
    state.minutes = state.config[mode].time;
    state.seconds = 0;
    state.isActive = false;
    clearInterval(state.timerId);
    
    modeButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    
    updateUI();
}

function tick() {
    if (state.seconds === 0) {
        if (state.minutes === 0) {
            completeCycle();
            return;
        }
        state.minutes--;
        state.seconds = 59;
    } else {
        state.seconds--;
    }
    updateUI();
}

function toggleTimer() {
    playSound('click');
    if (state.isActive) {
        clearInterval(state.timerId);
    } else {
        state.timerId = setInterval(tick, 1000);
    }
    state.isActive = !state.isActive;
    updateUI();
}

function completeCycle() {
    clearInterval(state.timerId);
    state.isActive = false;
    playSound('alarm');
    alert(state.currentMode === 'pomodoro' ? "Time's up! Take a break." : "Break's over! Let's work.");
    
    // Salto automático al siguiente modo lógico
    if (state.currentMode === 'pomodoro') switchMode('short');
    else switchMode('pomodoro');
}

// --- Event Listeners ---

startBtn.addEventListener('click', toggleTimer);

skipBtn.addEventListener('click', () => {
    playSound('click');
    const modes = Object.keys(state.config);
    const nextIdx = (modes.indexOf(state.currentMode) + 1) % modes.length;
    switchMode(modes[nextIdx]);
});

modeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        playSound('click');
        switchMode(e.target.dataset.mode);
    });
});

// Inicialización
updateUI();
