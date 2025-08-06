// Fun early 2000s functions (need to be global for onclick)
function openPaint() {
    showWindow('paint-window');
    initPaintApp();
}

function openMessenger() {
    const nudge = confirm(`📧 MSN Messenger

Your contacts:
- xXx_DarkAngel_xXx (Away - "brb")
- Viss Mubbles (Online)
- Sk8erBoi2003 (Busy - "homework -_-")
- (L)Joey(L) (Online)

Send a nudge?`);
    if (nudge) {
        alert('*BUZZ BUZZ* You sent a nudge! 🔔');
    }
}

function openMessengerWindow() {
    showWindow('messenger-window');
    startMessengerConversation();
    const audio = new Audio('message.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => { /* Fail silently */ });
}

function openMediaPlayer() {
    showWindow('media-player-window');
    // Initialize the media player with the GIF
    const videoDisplay = document.getElementById('media-player-video');
    if (videoDisplay) {
        videoDisplay.src = 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExeG9wMzR0cmNxNzdtcGZ0c2ZjdGluc2t5dTVrN3U3eXB1ZW55djR2dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/6k6iDdi5NN8ZO/giphy.gif';
    }
}

function openSolitaire() {
    alert('♠️ Solitaire\\n\\nGames played: 2,847\\nGames won: 3\\nWin percentage: 0.1%\\n\\nTime wasted: 247 hours\\n\\n"Just one more game..."');
}

function openInternetExplorer() {
    const response = confirm('🌐 Internet Explorer 6\\n\\nSecurity Warning: This page contains both secure and nonsecure items.\\n\\nDo you want to display the nonsecure items?');
    if (response) {
        alert('⏳ Loading... Please wait...\\n[████████████████████] 99%\\n\\nEstimated time remaining: 17 hours');
    }
}

function showLogOffDialog() {
    alert('👋 See you later!\\n\\nDon\'t forget to save your work!\\n\\nWindows is shutting down...\\n\\n*dial-up disconnection sounds*');
}

function showShutDownDialog() {
    const shutdown = confirm('🖥️ Turn Off Computer\\n\\nSelect an option:\\n• Stand By (Your computer goes brrrrr quietly)\\n• Turn Off (It\'s safe to turn off your computer)\\n• Restart (Have you tried turning it off and on again?)\\n\\nContinue?');
    if (shutdown) {
        document.body.style.transition = 'opacity 2s';
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.innerHTML = '<div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: black; color: orange; font-family: monospace; font-size: 20px;">It is now safe to turn off your computer.</div>';
            document.body.style.opacity = '1';
        }, 2000);
    }
}

// Countdown GPT-5 App
let countdownInterval = null;

function openCountdownGPT5() {
    showWindow('countdown-window');
    startCountdown();
}

function startCountdown() {
    // Clear any existing interval
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    // Set target date to August 7, 2025, 10:00 AM San Francisco time (PDT)
    const targetDate = new Date('2025-08-07T10:00:00-07:00');
    
    function updateCountdown() {
        const now = new Date();
        const timeLeft = targetDate - now;
        
        if (timeLeft < 0) {
            // Countdown finished
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            document.getElementById('countdown-status').textContent = 'GPT-5 has launched! 🎉';
            document.getElementById('progress-text').textContent = 'Complete! 100%';
            document.getElementById('progress-fill').style.width = '100%';
            clearInterval(countdownInterval);
            
            // Play celebration sound
            const audio = new Audio('congrats.mp3');
            audio.volume = 0.5;
            audio.play().catch(() => {});
            
            // Trigger confetti and effects
            launchGPT5Celebration();
            
            // Show alert after a delay so user can see the confetti
            setTimeout(() => {
                alert('🎉 GPT-5 HAS LAUNCHED! 🎉\\n\\nThe future is here!\\n\\nCheck OpenAI.com for more details.');
            }, 2000);
            return;
        }
        
        // Calculate time units
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Update display with animation
        updateTimeUnit('days', days);
        updateTimeUnit('hours', hours);
        updateTimeUnit('minutes', minutes);
        updateTimeUnit('seconds', seconds);
        
        // Update progress bar
        const totalTime = targetDate - new Date('2024-01-01T00:00:00-08:00'); // Assuming countdown started Jan 1, 2024
        const elapsed = totalTime - timeLeft;
        const progress = (elapsed / totalTime) * 100;
        document.getElementById('progress-fill').style.width = progress + '%';
        document.getElementById('progress-text').textContent = `Progress: ${Math.floor(progress)}%`;
        
        // Update status
        document.getElementById('countdown-status').textContent = `T-minus ${days} days and counting...`;
    }
    
    function updateTimeUnit(id, value) {
        const element = document.getElementById(id);
        const currentValue = element.textContent;
        const newValue = value.toString().padStart(2, '0');
        
        if (currentValue !== newValue) {
            element.classList.add('updating');
            element.textContent = newValue;
            setTimeout(() => {
                element.classList.remove('updating');
            }, 300);
        }
    }
    
    // Update immediately and then every second
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

function shareCountdown() {
    const text = `I'm counting down to the GPT-5 launch on August 7, 2025! Join me at this retro countdown app! 🚀`;
    
    // 2007 style share dialog
    const shareDialog = confirm(`📤 Share Countdown\\n\\n"${text}"\\n\\nWould you like to copy this to your clipboard?\\n\\n(In 2007, we'd email this to all our contacts!)`);
    
    if (shareDialog) {
        // Try to copy to clipboard (won't work in 2007 but hey)
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                alert('✅ Copied to clipboard!\\n\\nNow paste it in your AIM away message!');
            }).catch(() => {
                alert('📋 Manual copy required:\\n\\n' + text);
            });
        } else {
            alert('📋 Manual copy required:\\n\\n' + text);
        }
    }
}

// Clean up interval when window closes
document.addEventListener('DOMContentLoaded', function() {
    const countdownCloseBtn = document.querySelector('#countdown-window .window-close');
    if (countdownCloseBtn) {
        countdownCloseBtn.addEventListener('click', function() {
            if (countdownInterval) {
                clearInterval(countdownInterval);
                countdownInterval = null;
            }
        });
    }
});

// GPT-5 Launch Celebration
function launchGPT5Celebration() {
    // Create confetti container
    const confettiContainer = document.createElement('div');
    confettiContainer.id = 'gpt5-confetti';
    confettiContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(confettiContainer);
    
    // Create confetti pieces
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#FF1493'];
    const confettiCount = 150;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 10 + 5;
        const startX = Math.random() * window.innerWidth;
        const startY = -20;
        const endX = startX + (Math.random() - 0.5) * 300;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 0.5;
        
        confetti.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size * 0.6}px;
            background: ${color};
            left: ${startX}px;
            top: ${startY}px;
            opacity: 1;
            transform: rotate(${Math.random() * 360}deg);
            animation: confettiFall ${duration}s ease-out ${delay}s forwards;
        `;
        
        confettiContainer.appendChild(confetti);
    }
    
    // Add fireworks effect
    createFireworks();
    
    // Flash the countdown display
    const countdownDisplay = document.querySelector('.countdown-display');
    if (countdownDisplay) {
        countdownDisplay.classList.add('celebration-flash');
    }
    
    // Make the window dance
    const countdownWindow = document.getElementById('countdown-window');
    if (countdownWindow) {
        countdownWindow.classList.add('celebration-dance');
    }
    
    // Clean up after animation
    setTimeout(() => {
        confettiContainer.remove();
        if (countdownDisplay) {
            countdownDisplay.classList.remove('celebration-flash');
        }
        if (countdownWindow) {
            countdownWindow.classList.remove('celebration-dance');
        }
    }, 6000);
}

function createFireworks() {
    const fireworksContainer = document.createElement('div');
    fireworksContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
    `;
    document.body.appendChild(fireworksContainer);
    
    // Create multiple firework bursts
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight * 0.5;
            createFireworkBurst(fireworksContainer, x, y);
        }, i * 800);
    }
    
    // Clean up
    setTimeout(() => {
        fireworksContainer.remove();
    }, 5000);
}

function createFireworkBurst(container, x, y) {
    const particleCount = 30;
    const colors = ['#FFD700', '#FF6347', '#00CED1', '#FF1493', '#32CD32'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = Math.random() * 100 + 50;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: ${color};
            left: ${x}px;
            top: ${y}px;
            border-radius: 50%;
            box-shadow: 0 0 6px ${color};
            animation: fireworkParticle 1.5s ease-out forwards;
            --dx: ${Math.cos(angle) * velocity}px;
            --dy: ${Math.sin(angle) * velocity}px;
        `;
        
        container.appendChild(particle);
    }
    
    // Play a small pop sound if available
    const audio = new Audio('fire.mp3');
    audio.volume = 0.2;
    audio.play().catch(() => {});
} 