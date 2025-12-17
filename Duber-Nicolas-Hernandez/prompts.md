# Documentación de Prompts - Pomodoro

## Herramienta de IA Utilizada
**Gemini 3 Pro** (Perplexity AI)
**Evidencia** (https://www.perplexity.ai/search/eres-un-arquitecto-senior-de-s-rS9j.N73SCmq0m3oHeABhg#1)
---

## Estrategia de Prompting
Se utilizó una estrategia iterativa de tres fases para asegurar calidad, robustez y corrección lógica:
1.  **Zero-Shot Role Prompting:** Para definir la arquitectura sin sesgos previos.
2.  **Chain-of-Thought (CoT):** Para generar el código paso a paso, reduciendo errores lógicos.
3.  **Persona Pattern (Consultor QA):** Para auditar el código generado y asegurar calidad "enterprise".

---

## Historial de Prompts

### 1. Fase de Planificación (Zero-Shot)
**Técnica:** Zero-Shot + Role Playing (Arquitecto de Software)
**Objetivo:** Obtener un plan de arquitectura claro y diagramas de flujo antes de escribir código.

**Prompt Enviado:**
Eres un arquitecto senior de software web especializado en Single Page Applications minimalistas con HTML, CSS y JavaScript vanilla.

Contexto del ejercicio:
- Estoy resolviendo el reto "🍅 AI4Devs - Pomodoro Timer Challenge".
- Repositorio base (seed): contiene index.html, style.css, script.js y prompts.md vacíos.
- Referencia visual y funcional: https://pomofocus.io/
- Debo trabajar dentro de una carpeta que tendra los archivos de index.html, style.css, script.js y propmts.md
- No puedo escribir el código a mano: todo debe ser generado por IA siguiendo mis instrucciones.
- Tecnologías: solo HTML, CSS, JavaScript vanilla (sin frameworks).

Requisitos funcionales que debe cumplir la solución:
1. Temporizador principal que muestre minutos y segundos, formato mm:ss (ej: 25:00).
2. Modos de tiempo:
- Pomodoro: 25 minutos.
- Short Break: 5 minutos.
- Long Break: 15 minutos.
3. Controles:
- Botón Start.
- Botón Pause.
- Botón Skip current timer (salta al siguiente ciclo o resetea el actual según diseño).
4. Feedback visual:
- Diseño limpio, inspirado en https://pomofocus.io/.
- El color de fondo principal debe cambiar según el modo:
- pomodoro: #ba4949
- short break: #38858a
- long break: #397097
5. Bonus (opcional): reproducir un sonido simple al finalizar el tiempo.
6. Debe ser una SPA simple (sin navegación de páginas), todo controlado desde index.html + script.js.

Archivos disponibles (seed):
- index.html: estructura vacía.
- style.css: estilos vacíos.
- script.js: sin lógica.

Tu tarea en esta fase (NO generes todavía el código completo, solo planificación detallada):
1. Diseña la arquitectura de la aplicación:
- Explica el modelo mental del temporizador (estado global, modos, transiciones entre modos).
- Define las entidades de estado necesarias (por ejemplo: currentMode, remainingSeconds, isRunning, intervalId, etc.).
- Explica cómo se debe separar responsabilidades entre HTML (estructura), CSS (estilos, theming) y JS (lógica del temporizador y eventos).
2. Propón la estructura de index.html:
- Distribución de las secciones principales (header, selector de modo, display de tiempo, botones, etc.).
- IDs y clases que se usarán desde JavaScript.
- Sin escribir el HTML completo todavía, solo un esquema con nombres de elementos y sus IDs/clases.
3. Propón la estructura de style.css:
- Cómo modelarás los temas de color según el modo (clases o variables CSS).
- Qué bloques de estilos principales habrá (layout, tipografía, botones, estados activos, etc.).
4. Propón la estructura de script.js:
- Lista de funciones necesarias con firma y responsabilidad (por ejemplo: switchMode(mode), startTimer(), pauseTimer(), resetTimer(), updateUI(), formatTime(), etc.).
- Manejo del ciclo de vida del temporizador usando setInterval/clearInterval.
- Estrategia para evitar bugs clásicos (timers duplicados, desincronización de UI, cambio de modo en medio del conteo).
5. Diagrama de flujo:
- Crea un diagrama de flujo en texto (ASCII) que represente el ciclo:
- Selección de modo → Start → conteo regresivo → fin del tiempo → sonido (opcional) → estado listo para nuevo ciclo o cambio de modo.
6. Edge cases:
- Lista de al menos 5 casos borde a considerar (por ejemplo: múltiples clicks en Start, cambiar de modo estando en marcha, recargar página, etc.).

Formato de respuesta:
Respóndeme en Markdown, organizado con secciones y subtítulos claros:
- Arquitectura general
- Estado y modos
- Esquema de index.html
- Esquema de style.css
- Esquema de script.js
- Diagrama de flujo
- Edge cases

No escribas aún el código final, solo el plan técnico para luego pasárselo a otro prompt de implementación.

---

### 2. Fase de Ejecución (Chain of Thought)
**Técnica:** Chain-of-Thought (Cadena de Pensamiento)
**Objetivo:** Generar el código final forzando a la IA a razonar cada paso de validación antes de escribir la solución.

**Prompt Enviado:**
Eres un desarrollador experto en JavaScript vanilla, especializado en construir timers robustos y predecibles en aplicaciones web de una sola página (SPA).

Contexto:
- Estoy construyendo un "Pomodoro Timer" basado en el reto AI4Devs.
- Trabajo sobre estos archivos: index.html, style.css y script.js vacíos.
- Referencia visual y UX: https://pomofocus.io/
- Modos y tiempos:
- Pomodoro: 25 minutos.
- Short Break: 5 minutos.
- Long Break: 15 minutos.
- Colores por modo:
- pomodoro: #ba4949
- short break: #38858a
- long break: #397097
- Controles obligatorios: Start, Pause, Skip current timer.
- Bonus: reproducir un sonido al finalizar el tiempo (puede ser un audio local simple o un beep generado por JS).

Instrucciones de razonamiento (Chain of Thought):
Primero, piensa paso a paso y de forma estructurada ANTES de mostrar el código final. No mezcles el razonamiento con el código:
1. Explica cómo vas a estructurar index.html:
- Qué contenedores principales tendrá (por ejemplo: header, selección de modo, display de tiempo, controles, etc.).
- Qué IDs y clases usarás para que script.js pueda:
- Leer y actualizar el tiempo.
- Detectar el modo activo.
- Responder a clicks en Start, Pause y Skip.
2. Explica cómo organizarás style.css:
- Cómo aplicarás el color de fondo según el modo (por ejemplo, clase .mode-pomodoro, .mode-short-break, .mode-long-break asociada al body o a un contenedor raíz).
- Cómo asegurarás un diseño limpio, centrado, similar al de Pomofocus (sin necesidad de pixel-perfect).
3. Explica la lógica del temporizador en script.js:
- Cómo manejarás el estado global (currentMode, remainingSeconds, isRunning, intervalId).
- Parámetros de cada modo (duración en segundos y color).
- Cómo prevendrás múltiples intervalos simultáneos (clearInterval antes de iniciar uno nuevo).
- Qué ocurre exactamente cuando:
- Se pulsa Start.
- Se pulsa Pause.
- Se pulsa Skip (qué resetea, qué modo queda activo).
- El contador llega a 0.

Después de explicar el razonamiento, entrega SOLO el código final listo para copiar/pegar, separado por archivo:

1) index.html
Requisitos:
- Estructura HTML5 básica.
- Contenedor principal del timer.
- Botones para seleccionar modo (Pomodoro, Short Break, Long Break).
- Display grande del tiempo (ej: "25:00").
- Botones Start, Pause y Skip con IDs claros.
- Si añades audio para el sonido final, define la etiqueta <audio> con su src y un ID.

2) style.css
Requisitos:
- Diseño limpio y centrado en pantalla.
- Tipografía legible.
- Estilos diferenciados por modo de color:
- Fondo principal cambia según clase del body o contenedor raíz.
- Estilos de botones con estados activos para indicar el modo seleccionado.

3) script.js
Requisitos:
- Implementar la lógica completa del temporizador:
- Estados de modo y duraciones.
- Formateo de tiempo mm:ss.
- Funciones startTimer, pauseTimer, resetTimer, switchMode.
- Manejo correcto de setInterval/clearInterval.
- Al finalizar el tiempo:
- Detener el intervalo.
- Reiniciar el estado para ese modo o quedar listo para que el usuario inicie nuevamente.
- Si el audio está definido, reproducir el sonido final.
- No uses frameworks ni librerías externas.

Formato de respuesta:
- Primero, una sección breve llamada "Razonamiento paso a paso" (solo explicación, sin código).
- Luego, secciones claramente separadas:
- ```
<!-- index.html -->
...
```
- ```
/* style.css */
...
```
- ```
// script.js
    ...
    ```

No omitas ninguna parte del código, debe quedar listo para copiarlo directamente a los archivos del repositorio.

---

### 3. Fase de Refinamiento (Testing & QA)
**Técnica:** Consultant/Persona Pattern (QA Senior)
**Objetivo:** Revisión crítica del código para optimización y seguridad.

**Prompt Enviado:**
Eres un consultor QA senior de front-end a nivel enterprise, especializado en:
- Revisar timers y componentes de UI interactivos.
- Encontrar bugs sutiles en lógica de setInterval/clearInterval.
- Mejorar experiencia de usuario, accesibilidad y mantenibilidad de código JavaScript vanilla.

Contexto:
- Estoy resolviendo el reto AI4Devs: Pomodoro Timer.
- Ya tengo una primera versión de index.html, style.css y script.js que cumplen parcialmente:
- Modos: Pomodoro (25m), Short Break (5m), Long Break (15m).
- Botones Start, Pause, Skip.
- Cambio de color según modo.
- (Opcional) Sonido al terminar.
- Necesito que actúes como peer reviewer crítico para dejar el código listo para un entorno "enterprise".

Te voy a pegar a continuación el contenido actual de mis tres archivos:

--- INICIO index.html ---
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pomodoro Timer</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
</head>
<body class="mode-pomodoro">

    <div id="app">
        <header>
            <h1>Pomodoro Timer</h1>
        </header>

        <div class="timer-box">
            <!-- Selector de Modos -->
            <div class="mode-controls">
                <button id="btn-pomodoro" class="mode-btn active" onclick="switchMode('pomodoro')">Pomodoro</button>
                <button id="btn-short" class="mode-btn" onclick="switchMode('shortBreak')">Short Break</button>
                <button id="btn-long" class="mode-btn" onclick="switchMode('longBreak')">Long Break</button>
            </div>

            <!-- Display de Tiempo -->
            <div id="time-display" class="time-display">25:00</div>

            <!-- Botones de Acción -->
            <div class="action-controls">
                <button id="btn-toggle" class="main-btn">START</button>
                <button id="btn-skip" class="skip-btn" title="Saltar/Resetear">
                    <!-- Icono simple de skip -->
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <!-- Sonido embebido (Beep digital simple) -->
    <audio id="alarm-sound" src="data:audio/wav;base64,UklGRl9vT1BXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU"></audio>
    <!-- Nota: El src anterior es un placeholder muy corto. 
         Script.js inyectará un sonido real o puedes enlazar un .mp3 local aquí -->

    <script src="script.js"></script>
</body>
</html>
--- FIN index.html ---

--- INICIO style.css ---
/* Reset y variables base */
:root {
    --primary-color: #ba4949; /* Color por defecto (Pomodoro) */
    --text-color: #ffffff;
    --box-bg: rgba(255, 255, 255, 0.1);
    --btn-active-bg: rgba(0, 0, 0, 0.15);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Roboto', sans-serif;
    color: var(--text-color);
    background-color: var(--primary-color);
    transition: background-color 0.5s ease, color 0.5s ease;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Clases de modo para el body (Theming) */
body.mode-pomodoro {
    --primary-color: #ba4949;
}

body.mode-short-break {
    --primary-color: #38858a;
}

body.mode-long-break {
    --primary-color: #397097;
}

/* Contenedor Principal */
#app {
    width: 100%;
    max-width: 480px;
    padding: 20px;
    text-align: center;
}

header h1 {
    font-size: 1.5rem;
    margin-bottom: 20px;
    opacity: 0.9;
}

/* Caja del Timer */
.timer-box {
    background-color: var(--box-bg);
    padding: 30px 20px;
    border-radius: 6px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
}

/* Botones de Modo */
.mode-controls {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
}

.mode-btn {
    background: none;
    border: none;
    color: var(--text-color);
    font-size: 1rem;
    padding: 5px 12px;
    border-radius: 20px;
    cursor: pointer;
    font-weight: bold;
    opacity: 0.7;
    transition: all 0.2s ease;
}

.mode-btn.active {
    background-color: var(--btn-active-bg);
    opacity: 1;
    font-weight: bold;
}

/* Display de Tiempo */
.time-display {
    font-size: 6rem;
    font-weight: bold;
    margin: 20px 0;
    line-height: 1;
}

/* Controles Principales */
.action-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    position: relative;
    height: 60px;
}

.main-btn {
    background-color: white;
    color: var(--primary-color);
    border: none;
    padding: 15px 40px;
    font-size: 1.5rem;
    font-weight: bold;
    text-transform: uppercase;
    border-radius: 6px;
    cursor: pointer;
    box-shadow: 0 4px 0px rgba(230, 230, 230, 0.8);
    transition: color 0.5s ease, transform 0.1s, box-shadow 0.1s;
    min-width: 180px;
}

.main-btn:active {
    transform: translateY(4px);
    box-shadow: none;
}

.skip-btn {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
}

.skip-btn:hover {
    opacity: 1;
}
--- FIN style.css ---

--- INICIO script.js ---
// --- Configuración y Estado ---
const MODES = {
    pomodoro: { time: 25 * 60, colorClass: 'mode-pomodoro' },
    shortBreak: { time: 5 * 60, colorClass: 'mode-short-break' },
    longBreak: { time: 15 * 60, colorClass: 'mode-long-break' }
};

// Sonido de alarma (Beep simple en base64 para evitar dependencias externas)
const ALARM_SOUND_SRC = "data:audio/wav;base64,UklGRl9vT1BXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU"; 
// NOTA: Para un sonido real, reemplaza el src del HTML o usa un archivo mp3 real.
// Aquí usamos referencia al elemento del DOM.

const state = {
    currentMode: 'pomodoro',
    timeLeft: MODES.pomodoro.time,
    isRunning: false,
    intervalId: null
};

// --- Referencias al DOM ---
const body = document.body;
const timeDisplay = document.getElementById('time-display');
const btnToggle = document.getElementById('btn-toggle');
const btnSkip = document.getElementById('btn-skip');
const btnsMode = {
    pomodoro: document.getElementById('btn-pomodoro'),
    shortBreak: document.getElementById('btn-short'),
    longBreak: document.getElementById('btn-long')
};
const alarmSound = document.getElementById('alarm-sound');

// --- Funciones Core ---

// Formatea segundos a mm:ss
function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// Actualiza el texto del timer y el título de la página
function updateDisplay() {
    const formatted = formatTime(state.timeLeft);
    timeDisplay.textContent = formatted;
    document.title = `${formatted} - ${state.isRunning ? 'Running' : 'Paused'}`;
}

// Actualiza la apariencia visual (botones activos y colores)
function updateAppearance() {
    // Actualizar clase del body para el color de fondo
    body.className = MODES[state.currentMode].colorClass;
    
    // Actualizar estado activo de los botones de modo
    Object.values(btnsMode).forEach(btn => btn.classList.remove('active'));
    btnsMode[state.currentMode].classList.add('active');

    // Actualizar texto del botón principal
    btnToggle.textContent = state.isRunning ? 'PAUSE' : 'START';
    
    // Sombra del botón principal ajustada para efecto 3D simple
    if (state.isRunning) {
        btnToggle.style.boxShadow = 'none';
        btnToggle.style.transform = 'translateY(4px)';
    } else {
        btnToggle.style.boxShadow = '0 4px 0px rgba(230, 230, 230, 0.8)';
        btnToggle.style.transform = 'translateY(0)';
    }
}

// Cambiar de modo
function switchMode(mode) {
    if (!MODES[mode]) return;

    // Detener timer si está corriendo
    if (state.isRunning) {
        pauseTimer();
    }

    state.currentMode = mode;
    state.timeLeft = MODES[mode].time;
    
    updateDisplay();
    updateAppearance();
}

// Iniciar el temporizador
function startTimer() {
    if (state.isRunning) return; // Evitar múltiples intervalos

    state.isRunning = true;
    updateAppearance();

    state.intervalId = setInterval(() => {
        state.timeLeft--;
        updateDisplay();

        if (state.timeLeft <= 0) {
            handleTimerComplete();
        }
    }, 1000);
}

// Pausar el temporizador
function pauseTimer() {
    if (!state.isRunning) return;

    clearInterval(state.intervalId);
    state.intervalId = null;
    state.isRunning = false;
    updateAppearance();
    updateDisplay(); // Para actualizar el título
}

// Alternar entre Start y Pause
function toggleTimer() {
    if (state.isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
}

// Manejar cuando el tiempo llega a 0
function handleTimerComplete() {
    pauseTimer(); // Detiene el intervalo y resetea isRunning
    state.timeLeft = 0;
    updateDisplay();
    
    // Reproducir sonido
    if (alarmSound) {
        alarmSound.play().catch(e => console.log("Audio play blocked", e));
    }

    // Opcional: Reiniciar automáticamente al tiempo base del modo actual
    // o esperar a que el usuario reinicie. Aquí reseteamos al tiempo original.
    setTimeout(() => {
        alert("¡Tiempo terminado!"); // Alerta simple de navegador
        state.timeLeft = MODES[state.currentMode].time;
        updateDisplay();
    }, 500);
}

// Saltar o Resetear el timer actual
function skipTimer() {
    pauseTimer();
    state.timeLeft = MODES[state.currentMode].time;
    updateDisplay();
}

// --- Event Listeners ---

// Botón Start/Pause
btnToggle.addEventListener('click', toggleTimer);

// Botón Skip
btnSkip.addEventListener('click', skipTimer);

// Exponer función switchMode al objeto window para que funcione con onclick en HTML
window.switchMode = switchMode;

// --- Inicialización ---
// Cargar visualmente el estado inicial
updateDisplay();
updateAppearance();
--- FIN script.js ---

Tu tarea:

1) Análisis QA estructurado
- Revisa:
- Robustez de la lógica del temporizador (manejo de estado, intervalos, cambio de modos, Skip).
- Manejo correcto de múltiples clicks en Start/Pause.
- Sincronía entre estado interno y lo que se muestra en pantalla.
- Posibles memory leaks o timers duplicados.
- Lista en bullet points:
- Bugs reales o potenciales.
- Problemas de UX (por ejemplo: falta de feedback visual de modo activo, botones que no dejan claro el estado).
- Problemas de accesibilidad básicos (uso de roles ARIA mínimo, contraste de colores, foco del teclado si lo consideras necesario).

2) Propuestas de mejora
- Sugiere mejoras concretas en:
- Organización del código JS (por ejemplo, extraer funciones utilitarias, evitar duplicación de lógica al cambiar de modo).
- Nombres de variables y funciones más claros.
- CSS: simplificación de clases, mejor manejo de estados activos.
- Posible uso de data-attributes en HTML para mapear modos y evitar lógica hardcodeada repetida.

3) Código corregido y mejorado
- Entrega una versión REFACTORIZADA y LISTA PARA PRODUCCIÓN de:
- index.html
- style.css
- script.js
- Mantén el mismo stack (HTML + CSS + JS vanilla, sin frameworks).
- Asegúrate de:
- Manejar bien el cambio de modo mientras el temporizador está corriendo (se debe resetear correctamente).
- Impedir intervalos duplicados (si el temporizador ya está corriendo, Start no debe crear uno nuevo).
- Mantener el diseño limpio y el cambio de color por modo.
- Si usas audio de finalización, que no falle aunque el navegador bloquee autoplay (manejar errores suavemente).

Formato de respuesta:
1. Sección "Hallazgos QA" con bullet points priorizados (P1 crítico, P2 importante, P3 mejora).
2. Sección "Recomendaciones" con explicación breve de las decisiones técnicas.
3. Sección con el código final refactorizado, separado así:
- ```
<!-- index.html -->
...
```
- ```
/* style.css */
...
```
- ```
// script.js
...
```

Recuerda: tu objetivo es que este Pomodoro Timer sea lo suficientemente robusto y claro para que cualquier equipo front-end lo mantenga en un entorno enterprise.