* IA UTILIZADA: CHAT GPT 5.2
    
- PROMPT 1:

Actúa como un experto en desarrollo web enfocado en la creación de una Single Page Application (SPA). Debes entregar el código completo para un **Temporizador Pomodoro** utilizando HTML, CSS, y JavaScript, estructurado en los tres archivos separados: index.html, style.css y script.js.

**Requerimientos Funcionales y de Diseño:**

1.  **Temporizador Principal:** Debe mostrar los minutos y segundos en formato MM:SS.
2.  **Modos de Tiempo:** Implementar y gestionar tres modos preestablecidos:
    * **Pomodoro:** 25 minutos.
    * **Short Break (Descanso Corto):** 5 minutos.
    * **Long Break (Descanso Largo):** 15 minutos.
3.  **Controles de Usuario:** Proporcionar la funcionalidad para:
    * **Start / Pause:** Iniciar y detener la cuenta regresiva.
    * **Skip current timer:** Saltar el tiempo actual y reiniciar el temporizador en el mismo modo.
4.  **Feedback Visual (Diseño):** El diseño debe ser limpio y centrado. El color del tema (fondo de botón principal y elementos clave) debe cambiar dinámicamente según el modo activo. Usa Variables CSS para esta transición:
    * **Pomodoro:** `#ba4949`
    * **Short Break:** `#38858a`
    * **Long Break:** `#397097`
5.  **Audio :** Reproducir un sonido de alarma al finalizar la cuenta regresiva (llegar a 00:00).


##Estructura del Archivo

*index.html*
'''
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

'''


*style.css* 
'''
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

'''

*index.js* 
'''
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

'''

- PROMPT 2 (refinar):

El código que me proporcionaste cumple con lo siguiente:

Temporizador: funciona

Funciona de skip: funciona

Cambiar de modo: no funciona

Revisa la lógica del archivo de JavaScript y arregla la funcionalidad de cambiar de modo.



# Conclusion

El modelo de IA proporcionó inicialmente un código funcional en términos generales; sin embargo, presentó una deficiencia en la lógica de cambio de modo del temporizador. Este problema se originó en la forma en que se recuperaban los elementos del DOM, ya que la lógica del programa intentaba seleccionar los botones mediante la clase .mode, pero dicha clase solo estaba asignada al primer botón. Como consecuencia, el sistema no lograba identificar correctamente los demás modos, impidiendo el cambio entre ellos.

Tras realizar un proceso de refinamiento, la IA logró identificar con precisión el origen del error y ajustar la lógica de selección y manejo de los elementos del DOM. Gracias a esta corrección, el problema fue solucionado de manera efectiva, permitiendo el correcto funcionamiento del cambio de modos y mejorando la estabilidad general de la aplicación.