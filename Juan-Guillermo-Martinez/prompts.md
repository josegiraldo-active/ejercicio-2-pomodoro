## IA - Gemini

## Prompt - 1
Actúa como un desarrollador de software especializado en front-end, experto en HTML, CSS y Javascript.

Tu trabajo es crear un Temporizador Pomodoro, teniendo en cuentas los requisitos y ejemplos que te indicare a continuación:

Tomarás como referencia la siguiente página web, a nivel de diseño, estilo y funcionalidad: https://pomofocus.io, además ten en cuenta la imagen relacionada al diseño.

Debes cumplir con los siguientes requisitos:
- Debes mostrar el temporizador en el centro de la pantalla.
- El temporizador debe mostrar minutos y segundos (ejemplo: 25:00)
- Debe contar con 3 tipos contadores/tiempos 
	- 25 minutos
	- 15 minutos 
	- 5 minutos
- Los contadores previamente descritos deben estar encima del temporizador a modo de pestañas clickeables.
- Al usar cada uno de los contadores, el color del sitio debe cambiar de la siguiente manera:
	- 25 minutos: #ba4949 
	- 15 minutos: #397097
	- 5 minutos: #38858a
- Además justo, bajo el temporizador existirán 3 botones, los cuales son:
	- Start: Botón inicial que al ser clickeado iniciará la cuenta regresiva del contador seleccionado.
	- Pause: Botón que será habilitado únicamente cuando la cuenta regresiva esta activa, al ser clickeado pausara el temporizador.
	- Skip current timer: Botón que será habilitado únicamente cuando la cuenta regresiva esta activa, funciona para pasar a la siguiente pestaña.
- En el momento que el temporizador finalice debe emitir un sonido avisando que la cuenta regresiva termino.
	
Implementa el mejor funcionamiento posible en cada uno de los archivos index.html, style.css y script.js para cumplir con las funcionalidades propuestas y basandote en el ejemplo entregado.

## Archivos adjuntos "index.html", "style.css", "script.js" y "pomodoro.png"

## Prompt - 2
Aspectos a corregir en la funcionalidad del desarrollo.
- Cuando le de click al botón "Skip current timer" debe llevarme a la siguiente pestaña automaticamente, es decir:
	- Si estoy en "25 minutos" , debe llevarme a "15 minutos"
	- Si estoy en "15 minutos" , debe llevarme a "5 minutos"
	- Si estoy en "5 minutos" , debe llevarme a "25 minutos"
- El temporizador nunca debe tener valores negativos. Ejemplo -1:-5.
- Al momento del temporizador llegar a 00:00, debe emitir el sonido prolongado y reiniciar el temporizador debe setearse nuevamente desde el número inicial habilitando el botón "Start" nuevamente