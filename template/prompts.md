    * El chatbot utilizado: Gemini 3 Pro
    * Los prompts utilizados para el desarrollo de esta actividad y las tecnicas utilizadas para su desarrollo
    * Una breve reflexión de qué funcionó y qué no.


# Prompt 1

**Role:** Act as an Expert Frontend Web Developer.

**Objective:**
Create a functional, responsive Single Page Application (SPA) Pomodoro timer using **Vanilla HTML, CSS, and JavaScript** (no external frameworks or libraries). The visual and functional design should be heavily inspired by **Pomofocus.io**.

**File Structure:**
Please provide the code in three separate blocks:
1. `index.html`
2. `style.css`
3. `script.js`

**Functional Requirements:**
1. **Timer Logic:**
   - Display minutes and seconds (format `MM:SS`).
   - Update the browser title (`document.title`) with the remaining time while the timer is running.
2. **Three Modes (Tabs):**
   - **Pomodoro:** 25 minutes.
   - **Short Break:** 5 minutes.
   - **Long Break:** 15 minutes.
   - *Behavior:* Clicking a mode button should switch the timer duration immediately and stop the timer if it is running.
3. **Controls:**
   - **Start/Pause:** A main primary button that toggles between starting and pausing the countdown. Button text should change accordingly.
   - **Skip:** A secondary button to skip the current session (reset the timer to the start of the current selected mode).
4. **Audio:**
   - Play a simple notification sound when the timer reaches 00:00. Use a standard HTML5 Audio object with a placeholder sound URL or a system beep.

**Visual & UI Requirements:**
1. **Dynamic Theming:** The background color and button styles must transition smoothly based on the active mode:
   - **Pomodoro:** `#ba4949` (Red)
   - **Short Break:** `#38858a` (Teal)
   - **Long Break:** `#397097` (Blue)
2. **Layout:**
   - Clean, centered layout.
   - Use a white container with rounded corners for the timer area (glassmorphism or slight transparency is acceptable).
   - The "Start" button should be large and prominent.
3. **CSS Architecture:**
   - Use **CSS Variables** (`:root`) for the theme colors to make logic updates easier in JavaScript.
   - Use Flexbox for alignment.

**Implementation Details:**
- Ensure the JavaScript code is clean, modular, and well-commented.
- Handle edge cases (e.g., do not let the timer go below 00:00).
- Ensure the 'active' state of the mode buttons is visually distinct.


