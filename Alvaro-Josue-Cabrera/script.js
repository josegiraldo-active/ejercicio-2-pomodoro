/**
 * Pomodoro Timer Application
 * A vanilla JS implementation of a Pomodoro technique timer
 */

(function() {
    'use strict';

    // ==========================================================================
    // Configuration
    // ==========================================================================

    const CONFIG = {
        durations: {
            pomodoro: 25 * 60,      // 25 minutes in seconds
            shortBreak: 5 * 60,     // 5 minutes in seconds
            longBreak: 15 * 60      // 15 minutes in seconds
        },
        pomodorosBeforeLongBreak: 4,
        messages: {
            pomodoro: 'Time to focus!',
            shortBreak: 'Time for a break!',
            longBreak: 'Time for a break!'
        }
    };

    // ==========================================================================
    // State
    // ==========================================================================

    const state = {
        mode: 'pomodoro',           // Current mode: 'pomodoro', 'shortBreak', 'longBreak'
        timeRemaining: CONFIG.durations.pomodoro,
        isRunning: false,
        intervalId: null,
        pomodoroCount: 1,           // Current pomodoro number
        completedPomodoros: 0,      // Total completed pomodoros
        audioContext: null,         // Web Audio API context
        audioInitialized: false
    };

    // ==========================================================================
    // DOM Elements
    // ==========================================================================

    const elements = {
        body: document.body,
        minutesDisplay: document.getElementById('minutes'),
        secondsDisplay: document.getElementById('seconds'),
        timerDisplay: document.querySelector('.timer-display'),
        startBtn: document.getElementById('start-btn'),
        skipBtn: document.getElementById('skip-btn'),
        tabs: document.querySelectorAll('.tab'),
        sessionCount: document.getElementById('session-count'),
        sessionMessage: document.getElementById('session-message')
    };

    // ==========================================================================
    // Audio System (Web Audio API)
    // ==========================================================================

    /**
     * Initialize the Web Audio API context on first user interaction
     * This is required because browsers block autoplay of audio
     */
    function initAudio() {
        if (state.audioInitialized) return;
        
        try {
            state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            state.audioInitialized = true;
        } catch (e) {
            console.warn('Web Audio API not supported:', e);
        }
    }

    /**
     * Play a notification beep sound using Web Audio API
     * Creates a pleasant two-tone notification
     */
    function playNotificationSound() {
        if (!state.audioContext) {
            initAudio();
        }
        
        if (!state.audioContext) return;

        // Resume context if suspended (browser autoplay policy)
        if (state.audioContext.state === 'suspended') {
            state.audioContext.resume();
        }

        const now = state.audioContext.currentTime;
        
        // Create a pleasant two-tone beep
        const playTone = (frequency, startTime, duration) => {
            const oscillator = state.audioContext.createOscillator();
            const gainNode = state.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(state.audioContext.destination);
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(frequency, startTime);
            
            // Envelope for smooth attack and release
            gainNode.gain.setValueAtTime(0, startTime);
            gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
            
            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        };

        // Play a three-beep notification pattern
        playTone(880, now, 0.15);           // A5
        playTone(880, now + 0.2, 0.15);     // A5
        playTone(1108.73, now + 0.4, 0.3);  // C#6 (major third up, pleasant ending)
    }

    // ==========================================================================
    // Timer Functions
    // ==========================================================================

    /**
     * Format seconds into MM:SS display format
     */
    function formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return {
            minutes: String(minutes).padStart(2, '0'),
            seconds: String(seconds).padStart(2, '0')
        };
    }

    /**
     * Update the timer display
     */
    function updateDisplay() {
        const time = formatTime(state.timeRemaining);
        elements.minutesDisplay.textContent = time.minutes;
        elements.secondsDisplay.textContent = time.seconds;
        
        // Update page title with timer
        document.title = `${time.minutes}:${time.seconds} - ${getModeTitle(state.mode)}`;
    }

    /**
     * Get human-readable mode title
     */
    function getModeTitle(mode) {
        const titles = {
            pomodoro: 'Pomodoro',
            shortBreak: 'Short Break',
            longBreak: 'Long Break'
        };
        return titles[mode] || 'Pomodoro';
    }

    /**
     * Update the session info display
     */
    function updateSessionInfo() {
        elements.sessionCount.textContent = `#${state.pomodoroCount}`;
        elements.sessionMessage.textContent = CONFIG.messages[state.mode];
    }

    /**
     * Update UI state (buttons, classes)
     */
    function updateUIState() {
        // Update start/pause button text
        elements.startBtn.textContent = state.isRunning ? 'PAUSE' : 'START';
        elements.startBtn.setAttribute('aria-label', 
            state.isRunning ? 'Pause timer' : 'Start timer'
        );
        
        // Show/hide skip button
        elements.skipBtn.hidden = !state.isRunning;
        
        // Toggle running class for animations
        elements.timerDisplay.classList.toggle('running', state.isRunning);
    }

    /**
     * Update active tab styling
     */
    function updateActiveTabs() {
        elements.tabs.forEach(tab => {
            const isActive = tab.dataset.mode === state.mode;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', isActive);
        });
    }

    /**
     * Update the body's data-mode attribute for CSS color theming
     */
    function updateTheme() {
        elements.body.dataset.mode = state.mode;
    }

    /**
     * Start the timer countdown
     */
    function startTimer() {
        if (state.isRunning) return;
        
        // Initialize audio on first interaction
        initAudio();
        
        state.isRunning = true;
        updateUIState();
        
        // Clear any existing interval to prevent duplicates
        if (state.intervalId) {
            clearInterval(state.intervalId);
        }
        
        state.intervalId = setInterval(() => {
            state.timeRemaining--;
            updateDisplay();
            
            if (state.timeRemaining <= 0) {
                timerComplete();
            }
        }, 1000);
    }

    /**
     * Pause the timer
     */
    function pauseTimer() {
        if (!state.isRunning) return;
        
        state.isRunning = false;
        
        if (state.intervalId) {
            clearInterval(state.intervalId);
            state.intervalId = null;
        }
        
        updateUIState();
    }

    /**
     * Handle timer completion
     */
    function timerComplete() {
        // Stop the timer
        pauseTimer();
        
        // Play notification sound
        playNotificationSound();
        
        // Determine next mode based on Pomodoro cycle
        advanceToNextMode();
    }

    /**
     * Advance to the next mode following Pomodoro technique rules
     */
    function advanceToNextMode() {
        if (state.mode === 'pomodoro') {
            // Just completed a pomodoro
            state.completedPomodoros++;
            
            // Check if it's time for a long break (every 4 pomodoros)
            if (state.completedPomodoros % CONFIG.pomodorosBeforeLongBreak === 0) {
                setMode('longBreak');
            } else {
                setMode('shortBreak');
            }
        } else {
            // Just completed a break, go back to pomodoro
            state.pomodoroCount++;
            setMode('pomodoro');
        }
    }

    /**
     * Skip the current timer and advance to the next mode
     */
    function skipTimer() {
        pauseTimer();
        advanceToNextMode();
    }

    /**
     * Set the timer mode and reset time
     */
    function setMode(newMode) {
        // Stop any running timer
        pauseTimer();
        
        // Update state
        state.mode = newMode;
        state.timeRemaining = CONFIG.durations[newMode];
        
        // Update UI
        updateDisplay();
        updateActiveTabs();
        updateTheme();
        updateSessionInfo();
    }

    // ==========================================================================
    // Event Handlers
    // ==========================================================================

    /**
     * Handle start/pause button click
     */
    function handleStartPauseClick() {
        if (state.isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    }

    /**
     * Handle tab click to change mode
     */
    function handleTabClick(event) {
        const newMode = event.target.dataset.mode;
        if (newMode && newMode !== state.mode) {
            setMode(newMode);
        }
    }

    /**
     * Handle skip button click
     */
    function handleSkipClick() {
        skipTimer();
    }

    /**
     * Handle keyboard shortcuts
     */
    function handleKeydown(event) {
        // Space to start/pause (when not focused on a button)
        if (event.code === 'Space' && event.target === document.body) {
            event.preventDefault();
            handleStartPauseClick();
        }
        
        // 1, 2, 3 to switch modes
        if (event.key === '1') setMode('pomodoro');
        if (event.key === '2') setMode('shortBreak');
        if (event.key === '3') setMode('longBreak');
        
        // S to skip (when running)
        if (event.key === 's' || event.key === 'S') {
            if (state.isRunning) {
                skipTimer();
            }
        }
    }

    // ==========================================================================
    // Initialization
    // ==========================================================================

    /**
     * Initialize the application
     */
    function init() {
        // Set initial display
        updateDisplay();
        updateActiveTabs();
        updateTheme();
        updateSessionInfo();
        updateUIState();
        
        // Attach event listeners
        elements.startBtn.addEventListener('click', handleStartPauseClick);
        elements.skipBtn.addEventListener('click', handleSkipClick);
        
        elements.tabs.forEach(tab => {
            tab.addEventListener('click', handleTabClick);
        });
        
        document.addEventListener('keydown', handleKeydown);
        
        // Initialize audio context on any click (for browsers that require user interaction)
        document.addEventListener('click', initAudio, { once: true });
        
        console.log('🍅 Pomodoro Timer initialized');
        console.log('Keyboard shortcuts: Space (start/pause), 1-3 (modes), S (skip)');
    }

    // Start the app when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
