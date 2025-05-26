// Update clock
function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    
    document.getElementById('clock').textContent = `${displayHours}:${minutes} ${ampm}`;
}

// Update clock immediately and then every minute
updateClock();
setInterval(updateClock, 60000);

// Window management
let activeWindow = null;
let highestZIndex = 100;
let isDragging = false;
let currentWindow = null;
let currentX = 0;
let currentY = 0;
let initialX = 0;
let initialY = 0;

// Fun early 2000s functions (need to be global for onclick)
function openPaint() {
    alert('🎨 MS Paint - Draw your masterpiece! Remember to save as .bmp for maximum file size!');
}

function openMessenger() {
    const nudge = confirm(`📧 MSN Messenger

Your contacts:
- xXx_DarkAngel_xXx (Away - "brb")
- ~*PrincessSparkles*~ (Online)
- Sk8erBoi2003 (Busy - "homework -_-")
- (L)Joey(L) (Online)

Send a nudge?`);
    if (nudge) {
        alert('*BUZZ BUZZ* You sent a nudge! 🔔');
    }
}

function openMediaPlayer() {
    alert(`🎵 Windows Media Player

Now Playing: Linkin Park - In The End
▶️ ═══════════ 2:36/3:36

Visualizations: Enabled 🌈

Don't forget to rip your CDs at 128kbps!`);
}

function openPinball() {
    alert('🎮 3D Pinball for Windows - Space Cadet\\n\\nHigh Scores:\\n1. AAA - 10,000,000\\n2. YOU - 5,432,100\\n3. MOM - 1,234,567\\n\\nPress SPACE to launch ball!');
}

function showClippy() {
    const clippy = document.createElement('div');
    clippy.className = 'clippy';
    clippy.innerHTML = `
        <div class="clippy-bubble">
            <p>It looks like you're writing a website! 📎</p>
            <p>Would you like help?</p>
            <button onclick="this.parentElement.parentElement.remove()">Don't show me this tip again</button>
        </div>
    `;
    document.body.appendChild(clippy);
    
    setTimeout(() => {
        clippy.style.opacity = '0';
        setTimeout(() => clippy.remove(), 500);
    }, 5000);
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

// Sound effects
function playSound(type) {
    const audio = new Audio();
    audio.volume = 0.3;
    
    switch(type) {
        case 'startup':
            // Windows XP startup sound simulation
            audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQoGAAA=';
            break;
        case 'ding':
            // Simple ding sound
            audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAAA=';
            break;
        case 'error':
            // Error sound
            audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAAA=';
            break;
    }
    
    audio.play().catch(() => {});
}

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
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect x='4' y='4' width='24' height='24' fill='%23fff' stroke='%23000'/%3E%3Cpath d='M8 8h4v4H8zm6 0h4v4h-4zm6 0h4v4h-4zM8 14h4v4H8zm6 0h4v4h-4zm6 0h4v4h-4z' fill='%23ff0000'/%3E%3C/svg%3E" alt="Paint">
                <span>Paint</span>
            </div>
            <div class="start-menu-item" onclick="openMessenger()">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='14' fill='%231E90FF'/%3E%3Cpath d='M8 16c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8c-1.2 0-2.3-.3-3.3-.7L8 24.5V16z' fill='%23fff'/%3E%3C/svg%3E" alt="Messenger">
                <span>MSN Messenger</span>
            </div>
            <div class="start-menu-item" onclick="openMediaPlayer()">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='14' fill='%23FF6600'/%3E%3Cpath d='M12 10v12l10-6z' fill='%23fff'/%3E%3C/svg%3E" alt="Media Player">
                <span>Windows Media Player</span>
            </div>
            <div class="start-menu-item" onclick="openPinball()">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect x='4' y='4' width='24' height='24' fill='%234B0082'/%3E%3Ccircle cx='16' cy='16' r='4' fill='%23C0C0C0'/%3E%3Ccircle cx='10' cy='10' r='2' fill='%23FFD700'/%3E%3Ccircle cx='22' cy='10' r='2' fill='%23FF1493'/%3E%3C/svg%3E" alt="Pinball">
                <span>3D Pinball</span>
            </div>
            <div class="start-menu-separator"></div>
            <div class="start-menu-item" onclick="showClippy()">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpath d='M16 4C10 4 6 8 6 14s4 10 4 10h12s4-4 4-10S22 4 16 4z' fill='%23C0C0C0'/%3E%3Ccircle cx='12' cy='12' r='2' fill='%23000'/%3E%3Ccircle cx='20' cy='12' r='2' fill='%23000'/%3E%3C/svg%3E" alt="Clippy">
                <span>Office Assistant</span>
            </div>
            <div class="start-menu-item" onclick="openSolitaire()">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect x='8' y='6' width='16' height='20' fill='%23fff' stroke='%23000'/%3E%3Ctext x='16' y='20' text-anchor='middle' font-size='16'%3E♠%3C/text%3E%3C/svg%3E" alt="Solitaire">
                <span>Solitaire</span>
            </div>
            <div class="start-menu-item" onclick="openInternetExplorer()">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='14' fill='%231E90FF'/%3E%3Cpath d='M16 4c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12S22.6 4 16 4zm0 2c1.7 0 3.3.4 4.7 1.2-1.5 2.1-3.8 3.5-6.4 3.8-1.4-2.3-2.5-3.8-3.3-4.6 1.6-.3 3.3-.4 5-.4z' fill='%23FFD700'/%3E%3C/svg%3E" alt="IE">
                <span>Internet Explorer</span>
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
        <button class="start-menu-button" onclick="showLogOffDialog()">Log Off</button>
        <button class="start-menu-button" onclick="showShutDownDialog()">Turn Off Computer</button>
    </div>
</div>
`;

// Make windows draggable
function dragStart(e) {
    const titlebar = e.target.closest('.window-titlebar');
    if (!titlebar || e.target.closest('.window-controls')) return;
    
    currentWindow = titlebar.closest('.window');
    isDragging = true;
    
    // Bring window to front
    currentWindow.style.zIndex = ++highestZIndex;
    
    // Get initial mouse position
    initialX = e.clientX - currentWindow.offsetLeft;
    initialY = e.clientY - currentWindow.offsetTop;
    
    // Prevent text selection while dragging
    e.preventDefault();
}

function dragEnd(e) {
    isDragging = false;
    currentWindow = null;
}

function drag(e) {
    if (!isDragging || !currentWindow) return;
    
    e.preventDefault();
    
    // Calculate new position
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;
    
    // Keep window within viewport bounds
    const maxX = window.innerWidth - currentWindow.offsetWidth;
    const maxY = window.innerHeight - currentWindow.offsetHeight - 40; // Account for taskbar
    
    currentX = Math.max(0, Math.min(currentX, maxX));
    currentY = Math.max(0, Math.min(currentY, maxY));
    
    // Set new position
    currentWindow.style.left = currentX + 'px';
    currentWindow.style.top = currentY + 'px';
}

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
    
    // Handle taskbar item clicks
    document.querySelectorAll('.taskbar-item').forEach(item => {
        item.addEventListener('click', function() {
            // Get window ID based on taskbar item text
            const itemText = this.querySelector('span').textContent.toLowerCase();
            let windowId;
            
            switch(itemText) {
                case 'home':
                    windowId = 'home-window';
                    break;
                case 'about me':
                    windowId = 'about-window';
                    break;
                case 'projects':
                    windowId = 'projects-window';
                    break;
                case 'contact':
                    windowId = 'contact-window';
                    break;
            }
            
            // Toggle the window and active state
            if (windowId) {
                const window = document.getElementById(windowId);
                if (window.style.display === 'block' && this.classList.contains('active')) {
                    // If window is open and active, minimize it
                    window.style.display = 'none';
                    this.classList.remove('active');
                } else {
                    // Show window and make it active
                    showWindow(windowId);
                    this.classList.add('active');
                }
            }
        });
    });
    
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
            const window = this.closest('.window');
            window.style.display = 'none';
            
            // Find and deactivate the corresponding taskbar item
            const windowId = window.id;
            let taskbarText = '';
            
            switch(windowId) {
                case 'home-window':
                    taskbarText = 'Home';
                    break;
                case 'about-window':
                    taskbarText = 'About Me';
                    break;
                case 'projects-window':
                    taskbarText = 'Projects';
                    break;
                case 'contact-window':
                    taskbarText = 'Contact';
                    break;
            }
            
            document.querySelectorAll('.taskbar-item').forEach(item => {
                if (item.querySelector('span').textContent === taskbarText) {
                    item.classList.remove('active');
                }
            });
        });
    });
    
    document.querySelectorAll('.window-minimize').forEach(btn => {
        btn.addEventListener('click', function() {
            const window = this.closest('.window');
            window.style.display = 'none';
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
            playSound('startup');
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

// Show window function
function showWindow(windowId) {
    const window = document.getElementById(windowId);
    if (window) {
        // Don't hide other windows - just bring this one to front
        window.style.display = 'block';
        window.style.zIndex = ++highestZIndex;
        
        // Remove active class from all windows
        document.querySelectorAll('.window').forEach(w => {
            w.classList.remove('active');
        });
        
        // Make this window active
        window.classList.add('active');
        activeWindow = window;
        
        // Make sure window is within viewport
        const maxX = Math.max(0, Math.min(window.offsetLeft, window.innerWidth - window.offsetWidth));
        const maxY = Math.max(0, Math.min(window.offsetTop, window.innerHeight - window.offsetHeight - 40));
        window.style.left = maxX + 'px';
        window.style.top = maxY + 'px';
    }
}

// Add random popups for that authentic early 2000s experience
setTimeout(() => {
    const popup = document.createElement('div');
    popup.className = 'popup-ad';
    popup.innerHTML = `
        <div class="popup-content">
            <div class="popup-header">
                <span>⚠️ Congratulations!</span>
                <button onclick="this.parentElement.parentElement.parentElement.remove()">X</button>
            </div>
            <div class="popup-body">
                <p>🎉 You are the 1,000,000th visitor!</p>
                <p>Click here to claim your FREE iPod!</p>
                <button class="blink">CLICK HERE!!!</button>
            </div>
        </div>
    `;
    document.body.appendChild(popup);
}, 10000);

// Add the dancing baby easter egg
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiPattern.length - 1, konamiCode.length - konamiPattern.length);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        const baby = document.createElement('div');
        baby.className = 'dancing-baby';
        baby.innerHTML = '👶';
        baby.style.fontSize = '50px';
        baby.style.position = 'fixed';
        baby.style.bottom = '50px';
        baby.style.left = '-100px';
        baby.style.zIndex = '9999';
        baby.style.animation = 'dance 10s linear';
        document.body.appendChild(baby);
        
        setTimeout(() => baby.remove(), 10000);
    }
    
    // Matrix screensaver (Ctrl+Alt+M)
    if (e.ctrlKey && e.altKey && e.key === 'm') {
        startMatrixScreensaver();
    }
});

// Matrix Screensaver
function startMatrixScreensaver() {
    const screensaver = document.getElementById('matrix-screensaver');
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');
    
    screensaver.style.display = 'block';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for(let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';
        
        for(let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    };
    
    const matrixInterval = setInterval(draw, 35);
    
    // Exit on mouse move
    const exitScreensaver = () => {
        screensaver.style.display = 'none';
        clearInterval(matrixInterval);
        document.removeEventListener('mousemove', exitScreensaver);
    };
    
    setTimeout(() => {
        document.addEventListener('mousemove', exitScreensaver);
    }, 1000);
}

// Add Windows error message after 20 seconds
setTimeout(() => {
    const error = document.createElement('div');
    error.className = 'windows-error';
    error.innerHTML = `
        <div class="error-window">
            <div class="error-titlebar">
                <span>❌ Error</span>
                <button onclick="this.parentElement.parentElement.parentElement.remove()">X</button>
            </div>
            <div class="error-content">
                <p>❗ Task failed successfully.</p>
                <button onclick="this.parentElement.parentElement.parentElement.remove()">OK</button>
            </div>
        </div>
    `;
    document.body.appendChild(error);
    playSound('error');
}, 20000);

// Add more nostalgic pop-ups
const nostalgicPopups = [
    {
        delay: 15000,
        content: `
            <div class="popup-header">
                <span>🎰 WINNER WINNER!</span>
                <button onclick="this.parentElement.parentElement.parentElement.remove()">X</button>
            </div>
            <div class="popup-body">
                <p>💰 You've won $1,000,000!</p>
                <p>This is NOT a joke!</p>
                <p>Click below to claim your prize!</p>
                <button class="blink" onclick="alert('Error 404: Money not found 😢')">CLAIM NOW!</button>
            </div>
        `
    },
    {
        delay: 25000,
        content: `
            <div class="popup-header">
                <span>⚠️ System Alert</span>
                <button onclick="this.parentElement.parentElement.parentElement.remove()">X</button>
            </div>
            <div class="popup-body">
                <p>🦠 Your computer may be infected!</p>
                <p>Download our FREE antivirus NOW!</p>
                <p style="font-size: 10px;">(Definitely not a virus)</p>
                <button class="blink" style="background: #00FF00;">DOWNLOAD FREE!</button>
            </div>
        `
    },
    {
        delay: 35000,
        content: `
            <div class="popup-header">
                <span>🎊 Congratulations!</span>
                <button onclick="this.parentElement.parentElement.parentElement.remove()">X</button>
            </div>
            <div class="popup-body">
                <p>🏆 You are visitor #999,999!</p>
                <p>One more visitor until 1,000,000!</p>
                <p>Refresh to win a FREE iPhone 3G!</p>
                <button onclick="location.reload()" style="background: #FFD700; font-weight: bold;">REFRESH NOW!</button>
            </div>
        `
    },
    {
        delay: 45000,
        content: `
            <div class="popup-header">
                <span>💋 Local Singles Alert!</span>
                <button onclick="this.parentElement.parentElement.parentElement.remove()">X</button>
            </div>
            <div class="popup-body">
                <p>😍 Hot singles in your area!</p>
                <p>3 people within 0.5 miles want to meet!</p>
                <marquee>Jessica, 22 • Brad, 25 • Ashley, 21</marquee>
                <button class="blink" style="background: #FF1493;">MEET NOW!</button>
            </div>
        `
    },
    {
        delay: 55000,
        content: `
            <div class="popup-header">
                <span>🎮 Play Now!</span>
                <button onclick="this.parentElement.parentElement.parentElement.remove()">X</button>
            </div>
            <div class="popup-body">
                <p>🐸 PUNCH THE MONKEY!</p>
                <p>Win a FREE* PlayStation 2!</p>
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%238B4513'/%3E%3Ctext x='32' y='40' text-anchor='middle' font-size='30'%3E🐵%3C/text%3E%3C/svg%3E" style="width: 80px; cursor: pointer;" onclick="this.style.transform='rotate(360deg)'; setTimeout(() => alert('You missed! Try again!'), 500)">
                <p style="font-size: 8px;">*Shipping and handling: $299.99</p>
            </div>
        `
    },
    {
        delay: 65000,
        content: `
            <div class="popup-header">
                <span>📧 You've Got Mail!</span>
                <button onclick="this.parentElement.parentElement.parentElement.remove()">X</button>
            </div>
            <div class="popup-body">
                <p>💌 Someone has a crush on you!</p>
                <p>Click to find out who!</p>
                <button onclick="alert('It\\'s me, the popup! 😘')">REVEAL SECRET ADMIRER</button>
            </div>
        `
    },
    {
        delay: 75000,
        content: `
            <div class="popup-header">
                <span>🏃 Don't Leave Yet!</span>
                <button onclick="this.parentElement.parentElement.parentElement.remove()">X</button>
            </div>
            <div class="popup-body">
                <p>⏰ WAIT! Special offer!</p>
                <p>Stay on this page for a FREE screensaver!</p>
                <p>🐠 3D Fish Aquarium - $0.00!</p>
                <button style="background: #4169E1;">YES, I WANT IT!</button>
                <button onclick="this.parentElement.parentElement.parentElement.remove()" style="font-size: 8px;">no thanks</button>
            </div>
        `
    }
];

// Schedule all the pop-ups
nostalgicPopups.forEach(popup => {
    setTimeout(() => {
        const popupEl = document.createElement('div');
        popupEl.className = 'popup-ad';
        popupEl.innerHTML = `<div class="popup-content">${popup.content}</div>`;
        document.body.appendChild(popupEl);
        
        // Add random position
        popupEl.style.top = Math.random() * 50 + 20 + '%';
        popupEl.style.left = Math.random() * 50 + 20 + '%';
        
        playSound('ding');
    }, popup.delay);
});

// Add a toolbar installer popup
setTimeout(() => {
    const toolbar = document.createElement('div');
    toolbar.className = 'popup-ad';
    toolbar.innerHTML = `
        <div class="popup-content" style="width: 400px;">
            <div class="popup-header">
                <span>🔧 BonziBuddy Toolbar</span>
                <button onclick="this.parentElement.parentElement.parentElement.remove()">X</button>
            </div>
            <div class="popup-body">
                <p>🦍 Install the BonziBuddy Toolbar!</p>
                <p>Features:</p>
                <ul style="text-align: left; font-size: 11px;">
                    <li>Change your homepage!</li>
                    <li>Add 17 search bars!</li>
                    <li>Slow down your browser!</li>
                    <li>Purple monkey assistant!</li>
                </ul>
                <button class="blink" style="background: #9370DB;">INSTALL NOW!</button>
                <p style="font-size: 8px; margin-top: 10px;">
                    <input type="checkbox" checked> Also install: CoolWebSearch, Gator, WeatherBug
                </p>
            </div>
        </div>
    `;
    document.body.appendChild(toolbar);
}, 30000);

// Add CSS for marquee effect
const style = document.createElement('style');
style.textContent = `
    marquee {
        font-weight: bold;
        color: #FF1493;
    }
`;
document.head.appendChild(style);