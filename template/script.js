/* --- Configuration --- */
const MODES = {
    pomodoro: { time: 25 * 60, color: 'var(--color-pomodoro)' },
    shortBreak: { time: 5 * 60, color: 'var(--color-short)' },
    longBreak: { time: 15 * 60, color: 'var(--color-long)' }
};

/* --- State Variables --- */
let currentMode = 'pomodoro';
let timeLeft = MODES[currentMode].time;
let isRunning = false;
let timerId = null;

/* --- DOM Elements --- */
const timerText = document.getElementById('timer-text');
const mainBtn = document.getElementById('main-btn');
const skipBtn = document.getElementById('skip-btn');
const modeButtons = document.querySelectorAll('.mode-btn');
const alarmSound = document.getElementById('alarm-sound');
const root = document.documentElement; // For CSS variables

/* --- Initialization --- */
function init() {
    updateTimerDisplay();
    setupEventListeners();
}

/* --- Event Listeners --- */
function setupEventListeners() {
    // Mode Switching
    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.dataset.mode;
            switchMode(mode);
        });
    });

    // Main Button (Start/Pause)
    mainBtn.addEventListener('click', toggleTimer);

    // Skip Button
    skipBtn.addEventListener('click', resetTimer);
}

/* --- Core Functions --- */

/**
 * Switches the active mode (Pomodoro/Short/Long)
 * @param {string} mode - The key matching the MODES object
 */
function switchMode(mode) {
    if (!MODES[mode]) return;

    currentMode = mode;
    timeLeft = MODES[mode].time;

    // Stop timer if switching modes
    stopTimer();

    // Update Visuals
    updateTheme();
    updateActiveButton();
    updateTimerDisplay();
}

/**
 * Toggles the timer state between running and paused
 */
function toggleTimer() {
    if (isRunning) {
        stopTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    isRunning = true;
    mainBtn.textContent = 'Pause';
    mainBtn.classList.add('active'); // Optional: for pressing styling

    // Run immediately then interval
    timerId = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
            handleTimerComplete();
        }
    }, 1000);
}

function stopTimer() {
    isRunning = false;
    mainBtn.textContent = 'Start';
    mainBtn.classList.remove('active');
    clearInterval(timerId);
}

function resetTimer() {
    stopTimer();
    timeLeft = MODES[currentMode].time;
    updateTimerDisplay();
}

/**
 * Handles logic when timer hits 00:00
 */
function handleTimerComplete() {
    stopTimer();
    timeLeft = 0; // Ensure it doesn't go negative
    updateTimerDisplay();
    
    // Play Audio
    alarmSound.currentTime = 0;
    alarmSound.play().catch(e => console.log("Audio play failed (user interaction required):", e));
    
    // Alert or automatic switch logic can go here
}

/* --- UI Helper Functions --- */

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    // Format MM:SS
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Update DOM
    timerText.textContent = formattedTime;
    
    // Update Browser Title
    document.title = `${formattedTime} - ${capitalize(currentMode)}`;
}

function updateTheme() {
    const color = MODES[currentMode].color;
    // Update CSS Variable for dynamic background change
    root.style.setProperty('--current-color', color);
}

function updateActiveButton() {
    modeButtons.forEach(btn => {
        if (btn.dataset.mode === currentMode) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Start the app
init();