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
    alert(`🎵 Windows Media Player

Now Playing: Linkin Park - In The End
▶️ ═══════════ 2:36/3:36

Visualizations: Enabled 🌈

Don't forget to rip your CDs at 128kbps!`);
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
            
            alert('🎉 GPT-5 HAS LAUNCHED! 🎉\\n\\nThe future is here!\\n\\nCheck OpenAI.com for more details.');
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