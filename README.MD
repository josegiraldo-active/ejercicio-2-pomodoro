# 🍅 AI4Devs - Pomodoro Timer Challenge

Bienvenido al reto de **Prompt Engineering** de esta sesión. 
Tu objetivo es utilizar la Inteligencia Artificial Generativa para construir un **Temporizador Pomodoro** funcional, practicando la iteración de prompts y la ingeniería de contexto.

## 🎯 El Objetivo

Crear una aplicación web (Single Page Application) que funcione como un temporizador Pomodoro.
**Referencia visual y funcional:** [Pomofocus.io](https://pomofocus.io/)

### Requisitos Funcionales (Lo que debes pedirle a la IA):
1.  **Temporizador Principal:** Debe mostrar los minutos y segundos (ej: 25:00).
2.  **Modos de Tiempo:**
    * **Pomodoro:** 25 minutos.
    * **Short Break:** 5 minutos.
3.  **Controles:** Botón de **Start**, **Pause/Stop** y **Reset**.
4.  **Feedback Visual:** El diseño debe ser limpio (puedes basarte en la referencia). Opcional: Que el color de fondo cambie según el modo (ej. Rojo suave para trabajo, Azul/Verde para descanso).
5.  **Audio (Bonus):** Un sonido al finalizar el tiempo (opcional, si logras que la IA lo implemente).

---

## 🛠 Instrucciones

### 1. Preparación
Este repositorio contiene los archivos base ("semillas"):
* `index.html`: Estructura base vacía.
* `style.css`: Estilos base vacíos.
* `script.js`: Archivo de lógica vacío.
* `prompts.md`: Archivo para guardar tus prompts.

### 2. El Proceso (Prompt Engineering)
No escribas el código manualmente. Tu tarea es actuar como **Arquitecto de Software** y guiar a la IA (ChatGPT, Claude, Gemini).

1.  Analiza la referencia visual.
2.  Escribe un **Prompt** detallado describiendo qué quieres (estructura, estilos y lógica).
3.  Copia el código generado por la IA en los archivos correspondientes.
4.  Prueba. ¿Funciona? ¿Se ve bien?
5.  **Itera:** Si algo falla, no toques el código. Vuelve al chat y dile a la IA qué corregir.

### 3. Entregable

Crea una copia de la carpeta template y nómbrala usando el formato: [tu nombre] (Ejemplo: Jose-David-Giraldo).

Tu carpeta debe contener:
* `index.html`, `style.css`, `script.js` (con el código final).
* 📄 **`prompts.md`**: Un archivo MUY IMPORTANTE donde pegarás:
    * El chatbot utilizado.
    * Los prompts utilizados para el desarrollo de esta actividad y las tecnicas utilizadas para su desarrollo
    * Una breve reflexión de qué funcionó y qué no.

---

## 🚀 Flujo de Trabajo con Git

1.  **Fork** este repositorio.
2.  **Clona** tu fork:
    ```bash
    git clone https://github.com/TU_USUARIO/pomodoro-timer.git
     ```
3.  Crea una **rama** para tu solución:
    ```bash
    git checkout -b solved-pomodoro
    ```
4.  Realiza tu trabajo en la carpeta `[tu nombre]`.

5.  **Commit y Push**:
    ```bash
    git add .
    git commit -m "feat: solution pomodoro timer by [TUS_INICIALES]"
    git push origin solved-pomodoro
    ```
6.  Abre un **Pull Request** en GitHub hacia el repositorio original.

---

## 🤖 Reglas
* ✅ **Permitido:** ChatGPT, Claude, Gemini, Perplexity.
* ❌ **Prohibido:** Copilot, Tabnine o escribir el código a mano (el objetivo es entrenar tu habilidad de prompting).

¡Mucha suerte! 🍅