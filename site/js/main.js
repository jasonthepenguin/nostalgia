// Update clock
function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    
    const clock = document.getElementById('clock');
    clock.textContent = `${displayHours}:${minutes} ${ampm}`;
    // XP shows the full date when you hover the clock
    clock.title = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// Update clock immediately and then every minute
updateClock();
setInterval(updateClock, 60000);

// Sound effects synthesized with the Web Audio API (approximations of the XP system sounds)
let xpAudioContext = null;

function getAudioContext() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    if (!xpAudioContext) {
        xpAudioContext = new AudioCtx();
    }
    if (xpAudioContext.state === 'suspended') {
        xpAudioContext.resume().catch(() => {});
    }
    return xpAudioContext;
}

function playChime(notes, { type = 'sine', noteLength = 0.4, gap = 0.1, volume = 0.12 } = {}) {
    const ctx = getAudioContext();
    if (!ctx) return;
    notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + i * gap;
        osc.type = type;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(volume, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + noteLength);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + noteLength);
    });
}

function playSound(type) {
    switch (type) {
        case 'startup':
            playChime([311.13, 415.3, 466.16, 622.25], { noteLength: 0.9, gap: 0.13 });
            break;
        case 'shutdown':
            playChime([622.25, 466.16, 415.3, 311.13], { noteLength: 0.8, gap: 0.15 });
            break;
        case 'ding':
            playChime([987.77, 1318.51], { noteLength: 0.35, gap: 0.02, volume: 0.08 });
            break;
        case 'error':
            playChime([392, 261.63], { type: 'triangle', noteLength: 0.5, gap: 0.08, volume: 0.15 });
            break;
    }
}

// Play the startup chime on the first interaction (browsers block audio before a user gesture)
document.addEventListener('click', function playStartupOnce() {
    playSound('startup');
    document.removeEventListener('click', playStartupOnce);
}, { once: true });

// Start Menu HTML
const startMenuHTML = `
<div class="start-menu" id="start-menu" style="display: none;">
    <div class="start-menu-header">
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Ccircle cx='24' cy='24' r='20' fill='%23E0E0E0'/%3E%3Ctext x='24' y='32' text-anchor='middle' font-size='24'%3E👤%3C/text%3E%3C/svg%3E" alt="User">
        <span>Jason Botterill</span>
    </div>
    <div class="start-menu-content">
        <div class="start-menu-left">
            <div class="start-menu-item" onclick="openPaint()">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23FFFEF5'/%3E%3Cstop offset='1' stop-color='%23E8DCC8'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cellipse cx='14' cy='18' rx='12' ry='10' fill='url(%23a)' stroke='%238B7355' stroke-width='1.2'/%3E%3Cellipse cx='9' cy='22' rx='3' ry='2.5' fill='%23C8B898' stroke='%238B7355' stroke-width='0.8'/%3E%3Ccircle cx='8' cy='14' r='2.5' fill='%23FF0000'/%3E%3Ccircle cx='14' cy='11' r='2.5' fill='%23FFD700'/%3E%3Ccircle cx='21' cy='13' r='2.5' fill='%2300AA00'/%3E%3Ccircle cx='23' cy='20' r='2.5' fill='%230000FF'/%3E%3Ccircle cx='18' cy='24' r='2' fill='%23FF00FF'/%3E%3Ccircle cx='13' cy='16' r='2' fill='%23FF8C00'/%3E%3Cline x1='22' y1='10' x2='30' y2='2' stroke='%23C4943D' stroke-width='3' stroke-linecap='round'/%3E%3Cline x1='22' y1='10' x2='24' y2='8' stroke='%23999' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E" alt="Paint">
                <span>Paint</span>
            </div>
            <div class="start-menu-item" onclick="openMessengerWindow()">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='14' fill='%231E90FF'/%3E%3Cpath d='M8 16c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8c-1.2 0-2.3-.3-3.3-.7L8 24.5V16z' fill='%23fff'/%3E%3C/svg%3E" alt="Messenger">
                <span>MSN Messenger</span>
            </div>
            <div class="start-menu-item" onclick="openMediaPlayer()">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='14' fill='%23FF6600'/%3E%3Cpath d='M12 10v12l10-6z' fill='%23fff'/%3E%3C/svg%3E" alt="Media Player">
                <span>Windows Media Player</span>
            </div>
            <div class="start-menu-separator"></div>
            <div class="start-menu-item" onclick="showClippy()">
                <img src="clip.png" alt="Clippy">
                <span>Office Assistant</span>
            </div>
            <div class="start-menu-item" onclick="openSolitaire()">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect x='8' y='6' width='16' height='20' fill='%23fff' stroke='%23000'/%3E%3Ctext x='16' y='20' text-anchor='middle' font-size='16'%3E♠%3C/text%3E%3C/svg%3E" alt="Solitaire">
                <span>Solitaire</span>
            </div>
            <div class="start-menu-item" onclick="openInternetExplorer()">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%236BD5F9'/%3E%3Cstop offset='.5' stop-color='%231E80D0'/%3E%3Cstop offset='1' stop-color='%230C3F8C'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23FFF59D'/%3E%3Cstop offset='.4' stop-color='%23FFB300'/%3E%3Cstop offset='1' stop-color='%23E65100'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M5 9C3 5 8 1 15 2C20 3 26 6 28 11' stroke='url(%23b)' stroke-width='3' fill='none' stroke-linecap='round'/%3E%3Ctext x='16' y='26' font-family='Georgia,serif' font-size='28' font-weight='bold' font-style='italic' fill='url(%23a)' text-anchor='middle' stroke='%230C3F8C' stroke-width='0.3'%3Ee%3C/text%3E%3Cpath d='M28 20C29 25 25 29 19 30C12 31 5 27 4 21' stroke='url(%23b)' stroke-width='3' fill='none' stroke-linecap='round'/%3E%3C/svg%3E" alt="IE">
                <span>Internet Explorer</span>
            </div>
            <div class="start-menu-spacer"></div>
            <div class="start-menu-separator"></div>
            <div class="start-menu-item all-programs" onclick="alert('📂 All Programs\n\nAccessories\nGames\nStartup\nWinamp\nKazaa Lite\nMicrosoft Office 2003\n\n(Loading 47 more items...)')">
                <span>All Programs</span>
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Ccircle cx='8' cy='8' r='7' fill='%233C953C' stroke='%232A6E2A'/%3E%3Cpath d='M6 4.5L11 8L6 11.5z' fill='white'/%3E%3C/svg%3E" alt="">
            </div>
        </div>
        <div class="start-menu-right">
            <div class="start-menu-item">
                <span>My Documents</span>
            </div>
            <div class="start-menu-item">
                <span>My Recent Documents</span>
            </div>
            <div class="start-menu-item">
                <span>My Pictures</span>
            </div>
            <div class="start-menu-item">
                <span>My Music</span>
            </div>
            <div class="start-menu-item">
                <span>My Computer</span>
            </div>
            <div class="start-menu-separator"></div>
            <div class="start-menu-item">
                <span>Control Panel</span>
            </div>
            <div class="start-menu-item">
                <span>Set Program Access and Defaults</span>
            </div>
            <div class="start-menu-item">
                <span>Printers and Faxes</span>
            </div>
            <div class="start-menu-separator"></div>
            <div class="start-menu-item">
                <span>Help and Support</span>
            </div>
            <div class="start-menu-item">
                <span>Search</span>
            </div>
            <div class="start-menu-item">
                <span>Run...</span>
            </div>
        </div>
    </div>
    <div class="start-menu-footer">
        <button class="start-menu-button" onclick="showLogOffDialog()">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Crect x='1' y='1' width='14' height='14' rx='2' fill='%23E8A33D'/%3E%3Cpath d='M5 8h6M8 5l3 3-3 3' stroke='white' stroke-width='1.8' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E" alt="">
            Log Off
        </button>
        <button class="start-menu-button" onclick="showShutDownDialog()">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Ccircle cx='8' cy='8' r='7' fill='%23D63F3F'/%3E%3Cpath d='M8 3.5v4.5' stroke='white' stroke-width='1.8' stroke-linecap='round'/%3E%3Cpath d='M5 5.5a4.2 4.2 0 1 0 6 0' stroke='white' stroke-width='1.8' fill='none' stroke-linecap='round'/%3E%3C/svg%3E" alt="">
            Turn Off Computer
        </button>
    </div>
</div>
`;

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Add start menu to desktop
    document.querySelector('.desktop').insertAdjacentHTML('beforeend', startMenuHTML);
    
    // Make all window titlebars draggable
    document.querySelectorAll('.window-titlebar').forEach(titlebar => {
        titlebar.addEventListener('mousedown', dragStart);
    });
    
    // Global mouse events for dragging
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
    
    // Handle taskbar item clicks (each item declares its window via data-window)
    document.querySelectorAll('.taskbar-item[data-window]').forEach(item => {
        item.addEventListener('click', function() {
            const windowId = this.dataset.window;
            const win = document.getElementById(windowId);
            if (!win) return;
            
            if (win.style.display === 'block' && this.classList.contains('active')) {
                // If window is open and active, minimize it
                win.style.display = 'none';
                this.classList.remove('active');
            } else {
                // Show window and make it active
                showWindow(windowId);
                this.classList.add('active');
            }
        });
    });
    
    // Deactivate the taskbar item associated with a window (if any)
    function deactivateTaskbarItem(windowId) {
        const item = document.querySelector(`.taskbar-item[data-window="${windowId}"]`);
        if (item) item.classList.remove('active');
    }
    
    // Click on window to bring to front
    document.querySelectorAll('.window').forEach(window => {
        window.addEventListener('mousedown', function() {
            if (this.style.zIndex !== String(highestZIndex)) {
                this.style.zIndex = ++highestZIndex;
                // Remove active class from all windows
                document.querySelectorAll('.window').forEach(w => {
                    w.classList.remove('active');
                });
                // Make this window active
                this.classList.add('active');
                activeWindow = this;
            }
        });
    });
    
    // Window controls
    document.querySelectorAll('.window-close').forEach(btn => {
        btn.addEventListener('click', function() {
            const win = this.closest('.window');
            win.style.display = 'none';
            deactivateTaskbarItem(win.id);
            
            // Stop the messenger conversation when closing its window
            if (win.id === 'messenger-window' && messengerTimeout) {
                clearTimeout(messengerTimeout);
            }
        });
    });
    
    document.querySelectorAll('.window-minimize').forEach(btn => {
        btn.addEventListener('click', function() {
            const win = this.closest('.window');
            win.style.display = 'none';
            deactivateTaskbarItem(win.id);
        });
    });
    
    document.querySelectorAll('.window-maximize').forEach(btn => {
        btn.addEventListener('click', function() {
            const window = this.closest('.window');
            if (window.style.width === '100%') {
                window.style.width = '';
                window.style.height = '';
                window.style.top = '50px';
                window.style.left = '50px';
            } else {
                window.style.width = '100%';
                window.style.height = 'calc(100% - 40px)';
                window.style.top = '0';
                window.style.left = '0';
            }
        });
    });
    
    // Start button click
    let startMenuOpen = false;
    document.querySelector('.start-button').addEventListener('click', function() {
        const startMenu = document.getElementById('start-menu');
        if (!startMenuOpen) {
            startMenu.style.display = 'block';
            startMenuOpen = true;
        } else {
            startMenu.style.display = 'none';
            startMenuOpen = false;
        }
    });
    
    // Close start menu when clicking elsewhere
    document.addEventListener('click', function(e) {
        const startMenu = document.getElementById('start-menu');
        const startButton = document.querySelector('.start-button');
        if (!startMenu.contains(e.target) && !startButton.contains(e.target) && startMenuOpen) {
            startMenu.style.display = 'none';
            startMenuOpen = false;
        }
    });
    
    // Add some fun to the tray icons
    document.querySelectorAll('.tray-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            if (this.textContent === '🔊') {
                playSound('ding');
            }
        });
    });
});

// Add enter key support for messenger
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        const inputText = document.getElementById('messenger-input-text');
        if (inputText && document.activeElement === inputText && canSendMessage) {
            e.preventDefault();
            sendMessage();
        }
    }
}); 
