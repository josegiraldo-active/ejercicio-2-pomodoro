/**
 * Pomodoro Timer - Enterprise Logic
 * Patrón: Module / Object Literal para encapsulamiento.
 */

const App = (() => {
    // --- Configuración ---
    const CONFIG = {
        modes: {
            pomodoro: { time: 25 * 60, theme: 'theme-pomodoro' },
            shortBreak: { time: 5 * 60, theme: 'theme-shortBreak' },
            longBreak: { time: 15 * 60, theme: 'theme-longBreak' }
        },
        defaultMode: 'pomodoro'
    };

    // --- Estado Interno ---
    const state = {
        mode: CONFIG.defaultMode,
        timeLeft: CONFIG.modes.pomodoro.time,
        isRunning: false,
        timerId: null
    };

    // --- Referencias DOM (Cache) ---
    const dom = {
        body: document.body,
        timeDisplay: document.getElementById('time-display'),
        btnMain: document.getElementById('btn-main'),
        btnSkip: document.getElementById('btn-skip'),
        modeButtons: document.querySelectorAll('.mode-btn'),
        audio: document.getElementById('alarm-sound')
    };

    // --- Funciones de Utilidad ---
    
    // Formateo mm:ss con padding
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    // Generador de sonido (Fallback si el audio file falla)
    const playNotification = () => {
        // Intento 1: Audio HTML5
        const promise = dom.audio.play();
        
        if (promise !== undefined) {
            promise.catch(error => {
                console.warn("Autoplay bloqueado o audio fallido. Usando AudioContext como fallback.", error);
                beep(); // Fallback
            });
        }
    };

    // Beep sintético (AudioContext) para asegurar sonido sin archivos externos
    const beep = () => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.type = 'sine';
            osc.frequency.value = 880; // A5
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            
            osc.start();
            osc.stop(ctx.currentTime + 0.2); // 200ms beep
        } catch (e) {
            console.error("AudioContext no soportado", e);
        }
    };

    // --- Core Logic ---

    const render = () => {
        // 1. Actualizar Display
        const timeString = formatTime(state.timeLeft);
        dom.timeDisplay.textContent = timeString;
        document.title = `${timeString} - ${state.isRunning ? 'Running' : 'Paused'}`;

        // 2. Actualizar Botón Principal
        dom.btnMain.textContent = state.isRunning ? 'PAUSE' : 'START';
        if (state.isRunning) {
            dom.btnMain.classList.add('pressed');
        } else {
            dom.btnMain.classList.remove('pressed');
        }

        // 3. Actualizar Tema y Botones de Modo
        const currentTheme = CONFIG.modes[state.mode].theme;
        // Solo cambiamos la clase si es diferente para evitar reflows innecesarios
        if (!dom.body.classList.contains(currentTheme)) {
            dom.body.className = currentTheme;
        }

        dom.modeButtons.forEach(btn => {
            const btnMode = btn.dataset.mode;
            const isActive = btnMode === state.mode;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive);
        });
    };

    const stopTimer = () => {
        if (state.timerId) {
            clearInterval(state.timerId);
            state.timerId = null;
        }
        state.isRunning = false;
        render();
    };

    const startTimer = () => {
        if (state.isRunning) return;

        state.isRunning = true;
        render();

        state.timerId = setInterval(() => {
            state.timeLeft--;
            render();

            if (state.timeLeft <= 0) {
                stopTimer();
                playNotification();
                // Opcional: Auto-reset al tiempo por defecto del modo
                state.timeLeft = CONFIG.modes[state.mode].time;
                render(); 
                // No usamos alert() por UX. El sonido es suficiente feedback.
            }
        }, 1000);
    };

    const toggleTimer = () => {
        if (state.isRunning) {
            stopTimer();
        } else {
            startTimer();
        }
    };

    const switchMode = (newMode) => {
        if (!CONFIG.modes[newMode]) return;
        
        stopTimer(); // Importante: Limpia intervalos previos
        state.mode = newMode;
        state.timeLeft = CONFIG.modes[newMode].time;
        render();
    };

    const skipTimer = () => {
        stopTimer();
        state.timeLeft = CONFIG.modes[state.mode].time; // Reset al inicio
        render();
    };

    // --- Inicialización y Eventos ---
    
    const init = () => {
        // 1. Eventos Botones Modo (Delegación no necesaria, son pocos)
        dom.modeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.target.dataset.mode;
                switchMode(mode);
            });
        });

        // 2. Eventos Controles
        dom.btnMain.addEventListener('click', toggleTimer);
        dom.btnSkip.addEventListener('click', skipTimer);

        // 3. Render Inicial
        render();
    };

    return { init };
})();

// Arrancar la aplicación
document.addEventListener('DOMContentLoaded', App.init);
