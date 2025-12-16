## IA utilizada - Gemini 
## Lista de prompts utilizados con las técnicas vistas en clase: 

## Promp 1 
Rol:
-Vas a simular ser un desarrollador web profesional, experto en HTML5, CSS y javascript, ya que vamos a realizar un ejercicio de programación.

Objetivo:
-El propósito de este proyecto que vamos a realizar es hacer un contador enfocado a pomodoros, donde lo que tienes que hacer es lo siguiente: 
    1. Analizar la siguiente página web, "https://pomofocus.io", ya que quiero que la tomes de referencia para el layout y la funcionalidad de los contadores
    2. Debes usar los siguiente documentos proporcionados en los datos de entrada para construir nuestro propio pomodoro.

Requisitos específicos de funcionalidad:
- Debe de haber un cuadro centrado en toda la mitad, donde se va a mostrar 3 tabs, para cada modo de tiempo (luego te especifico cuales son) 
- Dentro del cuadro principal, siempre se va a mostrar el tiempo en la mitad de manera que ocupe el 80% del cuadro, con el siguiente formato MM:SS (ej: 25:00) 
- Debajo del tiempo vamos a tener el botón controlador con su estado principal el cual es: Start
- Una vez se le de click en el botón de start, el contador debe de empezar a descontar el tiempo y el botón de start pasa a ser el botón de pause
- Mientras el tiempo corre, se debe de mostrar un botón para hacer skip, el cual si se da click, pasa de tab y pasa a la siguiente cuenta regresiva
- Vamos a tener 3 modos de tiempo: 25:00 ( para pomodoro, estado inicial) 5:00 ( para un short break ) y 15:00 ( para un long break)
- El color del recuadro principal va a ser según el tipo de pomodoro: pomodoro (#ba4949),short break (#38858a), long break (#397097)
- El color del fondo de la página va a ser el mismo color que el cuadro principal, pero necesito que por cada color, uses uno que sea un tono más oscuro para que se diferencie del cuadro principal

Datos de entrada:
- Index.html "<!DOCTYPE html>
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
</html>"
-scripts.js "/**
 * AI Pomodoro Timer
 * * INSTRUCCIONES:
 * No escribas código aquí manualmente.
 * Pide a tu IA (ChatGPT/Claude/Gemini) que genere la lógica para:
 * 1. Manejar el temporizador (setInterval).
 * 2. Cambiar entre modos (25min / 5min).
 * 3. Actualizar el DOM.
 */

console.log("App iniciada. Esperando lógica generada por IA...");

// Pega aquí el código generado por la IA"
-style.css "/* Seed CSS
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
*/"

Formato de salida: 
- Para asegurarnos que nos quede el aplicativo bien completo, me vas a realizar las preguntas que consideres necesarias en cuanto a funcionalidad y estilos
- Me vas a entregar los mismos 3 archivos que te proporcioné en los datos de entrada, con todo el código listo y funcional.



## Prompt 2 - Respondiendo preguntas: 
1. Si, me gustaría que el navegador emita un sonido cada que un ciclo esté compleo
2. Si, tengamos en cuenta el flujo original del pomodoro de manera automatica, pero que esto no sea una restricción para que el usuario cambie de ciclo manualmente


## Prompt 3 - Refinamiento del sonido
Reduzcamos el tiempo del sonido a solo 2 segundos 

## Prompt 4 - Refinamiento de UIUX 
Ya probé todo y está excelente el código, bien hecho! El úlitmo ajuste que te voy a pedir, es que eliminemos todos los alerts que salen cada que se clickea un botón ya que me daña la experiencia de usuario