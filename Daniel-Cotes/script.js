/**
 * AI Pomodoro Timer
 * Fix: skipping Pomodoro must ALSO advance the internal cadence (so Pomodoro #3 -> Long Break even if skipped)
 * - pomodoroCount: counts COMPLETED pomodoros (per spec)
 * - pomodoroProgress: counts ADVANCED pomodoros (completed OR skipped) for cadence only
 * - Long break every 3 pomodoros in pomodoroProgress
 */

console.log("App iniciada. Lógica Pomodoro cargada.");

(() => {
  const MODES = /** @type {const} */ ({
    pomodoro: { label: "Pomodoro", bg: "#ba4949", durationMs: 25 * 60 * 1000 },
    shortBreak: { label: "Short Break", bg: "#38858a", durationMs: 5 * 60 * 1000 },
    longBreak: { label: "Long Break", bg: "#397097", durationMs: 15 * 60 * 1000 },
  });

  const TICK_MS = 250;

  /** @type {"pomodoro" | "shortBreak" | "longBreak"} */
  let mode = "pomodoro";
  let isRunning = false;

  let pomodoroCount = 0; // COMPLETED pomodoros only (per spec)
  let pomodoroProgress = 0; // ADVANCED pomodoros (completed OR skipped) for long-break cadence

  let endTimestamp = 0;
  let remainingMs = MODES.pomodoro.durationMs;
  /** @type {number|null} */
  let intervalId = null;

  const timeDisplay = document.getElementById("timeDisplay");
  const hintText = document.getElementById("hintText");

  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const skipBtn = document.getElementById("skipBtn");

  const tabButtons = Array.from(document.querySelectorAll(".tab"));

  function clampMs(ms) {
    return Math.max(0, ms | 0);
  }

  function formatMMSS(ms) {
    const totalSeconds = Math.ceil(ms / 1000);
    const mm = Math.floor(totalSeconds / 60);
    const ss = totalSeconds % 60;
    return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
  }

  function setBackgroundForMode(m) {
    document.body.style.backgroundColor = MODES[m].bg;
  }

  function setActiveTab(m) {
    for (const btn of tabButtons) {
      btn.classList.toggle("is-active", btn.dataset.mode === m);
    }
  }

  function updateUI() {
    timeDisplay.textContent = formatMMSS(remainingMs);
    hintText.textContent = `${MODES[mode].label} • ${formatMMSS(MODES[mode].durationMs)}`;

    if (!isRunning) {
      startBtn.classList.remove("is-hidden");
      pauseBtn.classList.add("is-hidden");
      skipBtn.classList.add("is-hidden");
    } else {
      startBtn.classList.add("is-hidden");
      pauseBtn.classList.remove("is-hidden");
      skipBtn.classList.remove("is-hidden");
    }
  }

  function stopInterval() {
    if (intervalId != null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function ensureInterval() {
    if (intervalId != null) return;
    intervalId = setInterval(tick, TICK_MS);
  }

  function beep() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.value = 880;

      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.2);

      osc.onended = () => {
        try { ctx.close(); } catch {}
      };
    } catch {
      // silent fail
    }
  }

  function getBreakForProgress(nextPomodoroProgress) {
    // Long Break every 3 Pomodoros in the cadence (completed OR skipped)
    return nextPomodoroProgress % 3 === 0 ? "longBreak" : "shortBreak";
  }

  function applyMode(nextMode) {
    mode = nextMode;
    remainingMs = MODES[mode].durationMs;
    setBackgroundForMode(mode);
    setActiveTab(mode);
    updateUI();
  }

  function advanceToNextSession({ fromPomodoroAdvanced, pomodoroWasCompleted }) {
    // stop timer always when advancing
    stopInterval();
    isRunning = false;

    if (mode === "pomodoro") {
      // Advance cadence whenever we leave a pomodoro (complete OR skip)
      if (fromPomodoroAdvanced) {
        pomodoroProgress += 1;
      }
      // Track completed pomodoros only when naturally finishing at 00:00
      if (pomodoroWasCompleted) {
        pomodoroCount += 1;
      }

      const nextBreak = getBreakForProgress(pomodoroProgress);
      applyMode(nextBreak);
      return;
    }

    // Break -> Pomodoro (skip or complete)
    applyMode("pomodoro");
  }

  function start() {
    if (isRunning) return;
    isRunning = true;
    endTimestamp = Date.now() + remainingMs;
    ensureInterval();
    updateUI();
  }

  function pause() {
    if (!isRunning) return;
    remainingMs = clampMs(endTimestamp - Date.now());
    isRunning = false;
    stopInterval();
    updateUI();
  }

  function skip() {
    // Skip always advances to next session and stops timer
    if (mode === "pomodoro") {
      // IMPORTANT FIX: skipping pomodoro must advance pomodoroProgress for cadence
      advanceToNextSession({ fromPomodoroAdvanced: true, pomodoroWasCompleted: false });
    } else {
      // skipping a break just goes to pomodoro
      advanceToNextSession({ fromPomodoroAdvanced: false, pomodoroWasCompleted: false });
    }
  }

  function tick() {
    if (!isRunning) return;

    const msLeft = endTimestamp - Date.now();
    if (msLeft <= 0) {
      remainingMs = 0;
      updateUI(); // show 00:00 briefly

      beep();

      // Natural completion: advance + count completed (if pomodoro)
      if (mode === "pomodoro") {
        advanceToNextSession({ fromPomodoroAdvanced: true, pomodoroWasCompleted: true });
      } else {
        advanceToNextSession({ fromPomodoroAdvanced: false, pomodoroWasCompleted: false });
      }
      return;
    }

    remainingMs = msLeft;
    updateUI();
  }

  function onSelectMode(nextMode) {
    // manual mode selection stops and resets time, but MUST NOT affect cycle counts
    stopInterval();
    isRunning = false;
    applyMode(nextMode);
    updateUI();
  }

  // Events
  startBtn.addEventListener("click", start);
  pauseBtn.addEventListener("click", pause);
  skipBtn.addEventListener("click", skip);

  for (const btn of tabButtons) {
    btn.addEventListener("click", () => {
      const nextMode = btn.dataset.mode;
      if (!nextMode) return;
      onSelectMode(nextMode);
    });
  }

  // Initial render
  setBackgroundForMode(mode);
  setActiveTab(mode);
  updateUI();
})();
