# Prompt actividad Pomodoro - ChatGPT
## Prompt 1 (funcional) - Rol, contexto, instruccion, formato, zero-shot, plan and solve
Eres un desarrollador de software senior experto en HTML, CSS y JavaScript moderno. Tu tarea va a ser crear una SPA que funcione como temportizador pomodoro tomando como referencia referencia visual y funcional Pomofocus.io Requisitos funcionales: 

1. Temporizador visible en formato MM:SS 
2. Modos: 
    2.1 Pomodoro: 25 minutos 
    2.2 Short Break: 5 minutos 
    2.3 Long Break: 15 minutos 
3. Botones: 
    3.1 Start 
    3.2 Pause 
    3.3 Skip current timer 
4. El color de fondo debe cambiar según el modo: 
    4.1 Pomodoro: #ba4949 
    4.2 Short Break: #38858a 
    4.3 Long Break: #397097 
5. Interfaz limpia y minimalista 
6. Opcional pero deseable: sonido al finalizar el tiempo 

Restricciones:
1. Usar solo HTML, CSS y JavaScript puro 
2. No usar frameworks ni librerías externas 
3. El código debe dividirse en: 
    3.1 index.html 
    3.2 style.css 
    3.3 script.js 
    
Proceso requerido:     
1. Explica brevemente la arquitectura y lógica de la aplicación 
2. Genera el código completo y funcional 
3. Asegúrate de que el temporizador funcione correctamente 

Formato de salida: 
1. Sección de explicación 
2. Código separado por archivos

## Prompt 2 (Refinamiento) - Contexto, instruccion, formato, Modo consultor, Self-correction

El diseño y la funcionalidad base del Pomodoro ya funcionan, pero necesito realizar mejoras visuales y correcciones específicas. Aplica SOLO los cambios descritos abajo. No elimines funcionalidades existentes que ya funcionan. 

Cambios visuales (CSS): 
1. El temporizador y los botones deben estar contenidos dentro de una "card" central, similar a Pomofocus.io. 
2. Esta card debe tener: 
    2.1 background: rgba(255, 255, 255, 0.1); 
    2.2 border-radius suave 
    2.3 padding adecuado 
    2.4 estar centrada vertical y horizontalmente 
3. El temporizador debe ser más grande y visualmente dominante. 
4. Mejora la jerarquía visual de los botones (start, pause, skip). 
5. Usa una tipografía limpia y legible (sin librerías externas). Cambios funcionales (JavaScript): 
6. Cuando el contador llegue a 00:00: 
    6.1 El tiempo NO debe volverse negativo 
    6.2 Debe reproducirse el audio de alarma 
    6.3 El temporizador debe reiniciarse automáticamente a modo Pomodoro (25:00) 
7. El audio actualmente no se reproduce. Explica porque y corrige su implementación usando el elemento existente:
```
    <audio id="alarmSound">
    <source src="data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YQAAAAA=" type="audio/wav">
    </audio>
```
8. El title debe exponer en tiempo real el valor del timer + "Time to focus" si esta en pomodoro o "Time for a break" si esta en short break/long break

## Prompt 3 (Correccion) - Contexto, instruccion, formato, Zero-shot, Self-correction

Se ha perdido parte del trabajo. Te comparto los snipets de HTML, CSS Y JS para que apliques los cambios correspondientes dentro de los archivos y como formato de salida me entregues el codigo completo con los arreglos y mejoras. 

index.html
```
    <!DOCTYPE html>
    <html lang="es">
    <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pomodoro Timer</title>
    <link rel="stylesheet" href="style.css" />
    </head>
    <body>
    <main class="app">
        <div class="modes">
        <button data-mode="pomodoro" class="active">Pomodoro</button>
        <button data-mode="shortBreak">Short Break</button>
        <button data-mode="longBreak">Long Break</button>
        </div>

        <div class="timer" id="timer">25:00</div>

        <div class="controls">
        <button id="startBtn">Start</button>
        <button id="pauseBtn">Pause</button>
        <button id="skipBtn">Skip</button>
        </div>
    </main>

    <audio id="alarmSound">
        <source src="data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAIlYAAESsAAACABAAZGF0YQAAAAA=" type="audio/wav">
    </audio>

    <script src="script.js"></script>
    </body>
    </html>
```

script.js
```
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

    function updateTimer() {
    timerEl.textContent = formatTime(timeLeft);
    }

    function startTimer() {
    if (isRunning) return;

    isRunning = true;
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
        clearInterval(timerInterval);
        isRunning = false;
        alarmSound.play();
        }
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
```
style.css
```
    :root {
    --pomodoro: #ba4949;
    --short-break: #38858a;
    --long-break: #397097;
    }

    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
    }

    body {
    height: 100vh;
    background-color: var(--pomodoro);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    transition: background-color 0.3s ease;
    }

    .app {
    text-align: center;
    }

    .modes {
    margin-bottom: 30px;
    }

    .modes button {
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    padding: 8px 16px;
    margin: 0 4px;
    cursor: pointer;
    border-radius: 4px;
    }

    .modes button.active {
    background: rgba(255, 255, 255, 0.4);
    font-weight: bold;
    }

    .timer {
    font-size: 96px;
    font-weight: bold;
    margin-bottom: 30px;
    }

    .controls button {
    background: white;
    color: #333;
    border: none;
    padding: 10px 24px;
    margin: 0 6px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    }

    .controls button:hover {
    opacity: 0.9;
    }
```

## Analisis
En funcionalidad califico bien el trabajo de ChatGPT, pues mayormente fue capaz de entregar un codigo funcional al 80% en su primer intento, solo hubo detalles por mejorar lo cual se hizo con los prompt siguientes. Se necesitaron tres ya que con el segundo parece haber olvidado el codigo inicial o mas bien solo entrego las modificaciones y no el codigo completo, lo cual al momento de hacer la comparativa con el codigo anterior quedaron partes por incompletas. Sin embargo en el tercer prompt se le entregan los snippets del codigo actual y logra solucionar los requerimientos a excepcion de la parte del audio. Sin embargo logra identificar que el problema del audio se debe a que los navegadores bloquean el audio automatico si no hubo interaccion del ususario.