# Ejercicio número 2 de IA for devs

## Herramientas usadas:
- [Chat bot de google (Gemini)](https://gemini.google.com/).
- Los 4 pilares.
- Zero shot prompting.
- Formato Markdown.
- Template.
- Tree of thoughts.
- Modo consultor.
- Context engineering.


# Primera fase: planeación

## Primer prompt de planeación

Ejecutado en modo rápido de Gemini.

---

# Prompt Pomodoro Timer

Eres un experto en prompts de aplicaciones **WEB SPA** con **html**, **css** y **javascript vanilla**.

Es necesario crear un **clon** de la aplicación **Pomodoro Timer** que se encuentra en la **URL https://pomofocus.io/**.

Genera un prompt con el mayor detalle posible, teniendo encuenta estilos y funcionalidad.
La aplicación generada con el prompt debe cumplir los siguientes requisitos:
- Temporizador Principal: Debe mostrar los minutos y segundos (ej: 25:00).
  - Modos de Tiempo:
    - Pomodoro: 25 minutos.
    - Short Break: 5 minutos.
    - Long Break: 15 minutos.
- Controles: Botón de Start, Pause y Skip current timer.
- Feedback Visual: El diseño debe ser limpio (basado en la **URL https://pomofocus.io/**). El color de fondo debe cambiar según el modo:
  - pomodoro (#ba4949)
  - short break (#38858a)
  - long break (#397097)
- Audio: La aplicación debe generar sonido (sonido de campana) al finalizar el tiempo.

La implementación de la aplicación debe realizarce en los siguientes archivos:

index.html: Estructura html de la aplicación.
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Pomodoro Timer</title>
    
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍅</text></svg>">

    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>

    <div id="app">
       <h1>AI Pomodoro Timer</h1>
    </div>

    <script src="script.js"></script>
</body>
</html>
```
style.css: Estilos de la aplicación.
```css
/* Seed CSS
    Utiliza la IA para generar los estilos completos.
    Puedes pedirle que se parezca a pomofocus.io
*/

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    background-color: #f0f0f0; /* Color base, cámbialo con la IA */
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

/* Espacio para tus estilos generados...
*/
```
script.js: Archivo para la lógica de la aplicación.
```javascript
/**
 * AI Pomodoro Timer
 * * INSTRUCCIONES:
 * No escribas código aquí manualmente.
 * Pide a tu IA (ChatGPT/Claude/Gemini) que genere la lógica para:
 * 1. Manejar el temporizador (setInterval).
 * 2. Cambiar entre modos (25min / 5min).
 * 3. Actualizar el DOM.
 */

console.log("App iniciada. Esperando lógica generada por IA...");

// Pega aquí el código generado por la IA
```

El prompt debe estar en formtato marckdown.
El prompt debe ser entendible para un chat de inteligiencia artificial.
Si requieres mayor información, realiza las preguntas antes de generar el prompt.
Explora 3 posibilidades, evalua los resultados y genera una respuesta final.

---

# Segunda fase: ejecución

---

## Primer prompt de ejecución

Ejecutado en un nuevo chat y en modo razonamiento de Gemini.

---

# Prompt para IA: Clon de Pomofocus.io

**Actúa como un Desarrollador Frontend Senior experto en Vanilla JavaScript.**

Necesito crear un clon funcional de **Pomofocus.io** utilizando exclusivamente HTML5, CSS3 y JavaScript Vanilla. La aplicación debe ser una Single Page Application (SPA) contenida en tres archivos específicos: `index.html`, `style.css` y `script.js`.

### 1. Requisitos de Funcionalidad

* **Lógica del Timer:** Implementar un temporizador de cuenta regresiva preciso.
* **Modos:**
* Pomodoro: 25:00 (#ba4949)
* Short Break: 05:00 (#38858a)
* Long Break: 15:00 (#397097)


* **Controles:**
* Botón principal dinámico: Debe decir "START" y cambiar a "STOP" cuando el timer esté activo. Al hacer click, debe sonar un ligero "click sound".
* Botón "Skip": Para saltar al siguiente modo.


* **Notificación:** Al llegar a 00:00, reproducir un sonido de alarma (campana) y mostrar un alert o notificación en el navegador.

### 2. Especificaciones de Diseño (UI/UX)

* **Fondo:** El color de fondo del `body` y del contenedor principal debe cambiar suavemente (transition: 0.5s) según el modo seleccionado.
* **Contenedor:** Una caja central con fondo semi-transparente (rgba(255, 255, 255, 0.1)) y bordes redondeados.
* **Tipografía:** Usar 'Inter', sans-serif. El tiempo debe verse grande (aprox 100px) y en negrita.
* **Botón START:** Debe ser blanco, con el color del texto igual al fondo actual, y tener un efecto de "elevación" (box-shadow) que desaparezca al ser presionado.

### 3. Instrucciones de Entrega de Código

Por favor, genera el contenido para los siguientes archivos respetando la estructura base:

1. **index.html:** Crea una estructura limpia dentro de `<div id="app">`. Incluye los botones para cambiar de modo arriba del reloj y los controles abajo.
2. **style.css:** Implementa los estilos modernos. Asegúrate de que los botones de modo activos tengan un fondo más oscuro para indicar selección.
3. **script.js:**
* Crea un objeto de estado para manejar `minutes`, `seconds`, `isActive`, y `currentMode`.
* Usa `setInterval` para la cuenta regresiva.
* Asegúrate de actualizar el `document.title` con el tiempo restante (ej: "25:00 - Time to focus!").



**IMPORTANTE:** No uses librerías externas. Para el audio, utiliza la API de `AudioContext` o genera un elemento de audio mediante un Data URI de un sonido de campana simple para que el código sea 100% portable sin archivos externos.

---

### Archivos base

archivo `index.html`:
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Pomodoro Timer</title>
    
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍅</text></svg>">

    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>

    <div id="app">
       <h1>AI Pomodoro Timer</h1>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

archivo `style.css`:
```css
/* Seed CSS
    Utiliza la IA para generar los estilos completos.
    Puedes pedirle que se parezca a pomofocus.io
*/

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    background-color: #f0f0f0; /* Color base, cámbialo con la IA */
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

/* Espacio para tus estilos generados...
*/
```

archivo `script.js`:
```javascript
/**
 * AI Pomodoro Timer
 * * INSTRUCCIONES:
 * No escribas código aquí manualmente.
 * Pide a tu IA (ChatGPT/Claude/Gemini) que genere la lógica para:
 * 1. Manejar el temporizador (setInterval).
 * 2. Cambiar entre modos (25min / 5min).
 * 3. Actualizar el DOM.
 */

console.log("App iniciada. Esperando lógica generada por IA...");

// Pega aquí el código generado por la IA
```

