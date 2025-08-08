// Window management
let activeWindow = null;
let highestZIndex = 100;
let isDragging = false;
let currentWindow = null;
let currentX = 0;
let currentY = 0;
let initialX = 0;
let initialY = 0;

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

// Show window function
function showWindow(windowId) {
    const winEl = document.getElementById(windowId);
    if (winEl) {
        // Don't hide other windows - just bring this one to front
        winEl.style.display = 'block';
        winEl.style.zIndex = ++highestZIndex;
        
        // Remove active class from all windows
        document.querySelectorAll('.window').forEach(w => {
            w.classList.remove('active');
        });
        
        // Make this window active
        winEl.classList.add('active');
        activeWindow = winEl;
        
        // Make sure window is within viewport - only adjust if it's outside
        const currentLeft = winEl.offsetLeft;
        const currentTop = winEl.offsetTop;
        const maxX = window.innerWidth - winEl.offsetWidth;
        const maxY = window.innerHeight - winEl.offsetHeight - 40;
        
        // Only reposition if window is outside viewport
        if (currentLeft < 0 || currentLeft > maxX || currentTop < 0 || currentTop > maxY) {
            winEl.style.left = Math.max(0, Math.min(currentLeft, maxX)) + 'px';
            winEl.style.top = Math.max(0, Math.min(currentTop, maxY)) + 'px';
        }
    }
} 

// XP-style Alert Dialog
function showXPAlert(title, message, options = {}) {
    const overlay = document.createElement('div');
    overlay.className = 'windows-error';

    const container = document.createElement('div');
    container.className = 'error-window';

    const titlebar = document.createElement('div');
    titlebar.className = 'error-titlebar';

    const titleSpan = document.createElement('span');
    titleSpan.textContent = title || 'Windows XP';

    const closeBtn = document.createElement('button');
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.textContent = '×';

    titlebar.appendChild(titleSpan);
    titlebar.appendChild(closeBtn);

    const content = document.createElement('div');
    content.className = 'error-content';

    const messageParagraph = document.createElement('p');
    messageParagraph.innerHTML = (message || '').toString().replace(/\n/g, '<br>');

    const okBtn = document.createElement('button');
    okBtn.textContent = options.okText || 'OK';

    content.appendChild(messageParagraph);
    content.appendChild(okBtn);

    container.appendChild(titlebar);
    container.appendChild(content);
    overlay.appendChild(container);
    document.body.appendChild(overlay);

    function closeDialog() {
        overlay.remove();
        if (typeof options.onClose === 'function') {
            try { options.onClose(); } catch (_) {}
        }
    }

    okBtn.addEventListener('click', closeDialog);
    closeBtn.addEventListener('click', closeDialog);

    // Close on Enter/Escape when dialog is present
    const keyHandler = (e) => {
        if (e.key === 'Enter' || e.key === 'Escape') {
            e.preventDefault();
            closeDialog();
            document.removeEventListener('keydown', keyHandler, true);
        }
    };
    document.addEventListener('keydown', keyHandler, true);
}

// Override native alert to use XP-style dialog
(function installAlertOverride() {
    const originalAlert = window.alert;
    window.alert = function(message) {
        try {
            showXPAlert('Windows XP', String(message));
        } catch (_) {
            // Fallback to native alert if something goes wrong
            originalAlert(String(message));
        }
    };
})(); 