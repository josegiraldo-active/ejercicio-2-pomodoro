Prompts: (Bot utilizado chat GPT)
1. Primer prompt introductorio
'''
    You are a prompt engineer with many years of experience working with ClaudeCode 
    I am going to send you a message that references a prompt that will be used in a ClaudeCode chat.
    We are going to go back and forth refining the prompt.
    The initial message will be the statement defining an exercise to be developed with the use of AI
'''
2. Establecer plan
'''
    Te voy a pasar 6 imágenes que representan cada uno de los modos Pomodoro/Short Break/Long Break en los estados de started y not started. 
    Analiza la estructura mostrada en las imágenes y define cómo debe ser la estructura y cuáles cambios deben suceder por cada estado. 
    Este debe ser un análisis de estructura. 
    Detalles como el color no se deben tener en cuenta en este análisis.
    Los colores de fondo a utilizar ya fueron mencionados anteriormente.
'''
3. Resultado
'''
    Eres un **arquitecto de software y frontend developer senior**. Estoy en un repo con estos archivos vacíos: `index.html`, `style.css`, `script.js`. Necesito que generes el código completo para una **Single Page Application (vanilla)** que sea un **Temporizador Pomodoro**, tomando como referencia visual/funcional **Pomofocus.io**.

    Ahora te voy a pasar **6 imágenes** que representan cada uno de los modos `Pomodoro / Short Break / Long Break` en los estados **started** y **not started**.

    ## Paso 1 — Análisis de estructura (OBLIGATORIO antes de generar código)

    Cuando recibas las 6 imágenes, **analiza la estructura UI** mostrada y define:

    1. **Estructura de la página (layout / jerarquía de componentes)**

    * Lista de secciones principales (ej. header, tabs, panel timer, controles, etc.).
    * Elementos dentro de cada sección (ej. botones, textos, contadores, labels).
    * Qué elementos son “globales” (siempre visibles) vs “contextuales” (dependen del estado).

    2. **Cambios por estado (state transitions) — sin considerar colores**
    Para cada modo (`Pomodoro`, `Short Break`, `Long Break`) describe explícitamente:

    * Estado **not started**: qué se ve (textos, botones visibles/ocultos, labels, etc.).
    * Estado **started**: qué cambia respecto a not started (ej. Start→Pause, aparece Skip, cambia algún texto, etc.).
    * Qué debe pasar al presionar **Start**, **Pause**, **Skip current timer** y al llegar a **00:00** (solo en términos de estructura/estado UI, no estilos ni colores).

    3. **Reglas UI derivadas**

    * Resume las reglas como una lista clara del tipo: “Si state = running entonces …”
    * Evita hablar de colores o valores hex. **No incluyas detalles de color** en este análisis.

    > Nota: Los **colores de fondo** ya están definidos en requisitos previos y **no deben** considerarse en este análisis estructural.

    ## Paso 2 — Implementación (después del análisis)

    Una vez entregado el análisis anterior, genera el código final cumpliendo:

    ### Requisitos funcionales obligatorios

    1. **Temporizador principal:** mostrar `mm:ss` (ej. `25:00`).
    2. **Modos con duración fija:**

    * `Pomodoro` = 25:00
    * `Short Break` = 05:00
    * `Long Break` = 15:00
    3. **Controles:**

    * Botón **Start** (inicia la cuenta regresiva)
    * Botón **Pause** (pausa sin resetear)
    * Botón **Skip current timer** (termina el modo actual y avanza al siguiente)
    4. **Feedback visual (similar a Pomofocus):** el **fondo** debe cambiar según modo usando:

    * pomodoro: `#ba4949`
    * short break: `#38858a`
    * long break: `#397097`
    5. **Audio (Obligatorio):** reproducir un sonido al finalizar el tiempo (cuando llega a `00:00`).

    * Implementarlo con **Web Audio API** (beep simple) para no depender de archivos externos.
    * Debe sonar **una sola vez** por finalización (evitar que se repita por bugs/intervalos).
    * Si el navegador bloquea audio hasta interacción del usuario, “arma”/inicializa el audio en el **primer click** de Start (o cualquier interacción) y luego reprodúcelo al terminar.

    ### Comportamiento esperado

    * El usuario puede cambiar de modo desde tabs/botones. Al cambiar modo: **detén el timer** y carga la duración por defecto del modo.
    * “Skip current timer” debe **finalizar el timer actual y pasar al siguiente modo** siguiendo un ciclo tipo Pomodoro:

    * Después de cada **Pomodoro** → ir a **Short Break**, excepto cada 4 pomodoros → **Long Break**
    * Después de cualquier break → ir a **Pomodoro**
    * Evita múltiples intervalos: debe existir un solo `setInterval` activo como máximo.
    * Cuando llega a `00:00`: detener, reproducir el sonido y avanzar automáticamente al siguiente modo (igual que si presionara “skip”).

    ### UI mínima pero similar a la referencia

    * Tabs o botones para `Pomodoro / Short Break / Long Break` con estado activo visible.
    * Timer grande centrado.
    * Botón principal grande (Start/Pause) y botón secundario “Skip current timer”.
    * Diseño responsive básico (centrado, tipografía agradable, tarjetas suaves).
    * Accesibilidad básica: botones con texto claro, foco visible, contraste razonable.

    ### Restricciones

    * **Sin frameworks** (no React/Vue), solo HTML/CSS/JS.
    * Sin dependencias externas obligatorias (puedes usar Google Fonts opcional, pero no es necesario).

    ## Formato de salida (OBLIGATORIO)

    Devuélveme exactamente en este orden:

    1. **ANÁLISIS DE ESTRUCTURA** (en bullets y reglas claras; sin colores)
    2. `index.html` en un bloque de código
    3. `style.css` en un bloque de código
    4. `script.js` en un bloque de código

    Nada más.
    '''