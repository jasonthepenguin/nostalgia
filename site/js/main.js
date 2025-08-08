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
                case 'messenger-window':
                    // Stop conversation when closing
                    if (messengerTimeout) {
                        clearTimeout(messengerTimeout);
                    }
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
