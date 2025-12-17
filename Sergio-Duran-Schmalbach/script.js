const MODES = {
  pomodoro: { time: 25 * 60, color: "#ba4949" },
  shortBreak: { time: 5 * 60, color: "#38858a" },
  longBreak: { time: 15 * 60, color: "#397097" }
};

let currentMode = "pomodoro";
let timeLeft = MODES[currentMode].time;
let timerInterval = null;
let isRunning = false;

const timerEl = document.getElementById("timer");
const modeButtons = document.querySelectorAll(".modes button");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const skipBtn = document.getElementById("skipBtn");
const alarmSound = document.getElementById("alarmSound");

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function updateTitle() {
  const label =
    currentMode === "pomodoro"
      ? "Time to focus"
      : "Time for a break";

  document.title = `${formatTime(timeLeft)} - ${label}`;
}

function updateTimer() {
  timerEl.textContent = formatTime(timeLeft);
  updateTitle();
}

function startTimer() {
  if (isRunning) return;

  isRunning = true;

  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      isRunning = false;

      // 🔔 FIX AUDIO
      alarmSound.currentTime = 0;
      alarmSound.play().catch(() => {});

      // 🔁 Reinicio automático a Pomodoro
      switchMode("pomodoro");
      return;
    }

    timeLeft--;
    updateTimer();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  timeLeft = MODES[currentMode].time;
  updateTimer();
}

function switchMode(mode) {
  currentMode = mode;
  document.body.style.backgroundColor = MODES[mode].color;

  modeButtons.forEach(btn =>
    btn.classList.toggle("active", btn.dataset.mode === mode)
  );

  resetTimer();
}

modeButtons.forEach(button => {
  button.addEventListener("click", () => {
    switchMode(button.dataset.mode);
  });
});

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
skipBtn.addEventListener("click", resetTimer);

// Inicialización
updateTimer();
