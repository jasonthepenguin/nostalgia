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