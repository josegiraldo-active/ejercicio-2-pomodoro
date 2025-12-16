/**
 * AI Pomodoro Timer
 * Lógica corregida para cambio de modos
 */

const MODES = {
  pomodoro: { time: 25 * 60, color: "#ba4949" },
  short: { time: 5 * 60, color: "#38858a" },
  long: { time: 15 * 60, color: "#397097" },
};

let currentMode = "pomodoro";
let timeLeft = MODES[currentMode].time;
let intervalId = null;
let isRunning = false;

const timeDisplay = document.getElementById("time");
const startPauseBtn = document.getElementById("startPause");
const skipBtn = document.getElementById("skip");
const modeButtons = document.querySelectorAll(".mode");
const alarm = document.getElementById("alarm");

/* =====================
   Utilidades
===================== */

function formatTime(seconds) {
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");
  return `${min}:${sec}`;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(timeLeft);
}

function setTheme(color) {
  document.documentElement.style.setProperty("--theme-color", color);
}

/* =====================
   Control de modos
===================== */

function switchMode(mode) {
  // 1. Detener temporizador activo
  clearInterval(intervalId);
  intervalId = null;
  isRunning = false;

  // 2. Actualizar modo
  currentMode = mode;
  timeLeft = MODES[mode].time;

  // 3. Actualizar UI
  updateDisplay();
  setTheme(MODES[mode].color);
  startPauseBtn.textContent = "Start";

  // 4. Actualizar botones activos
  modeButtons.forEach((btn) => btn.classList.remove("active"));
  document.querySelector(`[data-mode="${mode}"]`).classList.add("active");
}

/* =====================
   Temporizador
===================== */

function startPause() {
  if (isRunning) {
    clearInterval(intervalId);
    intervalId = null;
    startPauseBtn.textContent = "Start";
    isRunning = false;
    return;
  }

  intervalId = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(intervalId);
      intervalId = null;
      isRunning = false;
      startPauseBtn.textContent = "Start";
      alarm.play();
    }
  }, 1000);

  startPauseBtn.textContent = "Pause";
  isRunning = true;
}

function skipTimer() {
  clearInterval(intervalId);
  intervalId = null;
  isRunning = false;

  timeLeft = MODES[currentMode].time;
  updateDisplay();
  startPauseBtn.textContent = "Start";
}

/* =====================
   Eventos
===================== */

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(button.dataset.mode);
    switchMode(button.dataset.mode);
  });
});

startPauseBtn.addEventListener("click", startPause);
skipBtn.addEventListener("click", skipTimer);

/* =====================
   Init
===================== */

setTheme(MODES[currentMode].color);
updateDisplay();
