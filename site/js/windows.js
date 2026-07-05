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
        if (windowId === 'retro-twitter-window') {
            winEl.style.display = 'flex';
        } else {
            winEl.style.display = 'block';
        }
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

// XP-style dialog builder (shared by alert and confirm)
// buttons: array of { label, onClick }. The titlebar × and Escape trigger onDismiss.
function showXPDialog(title, message, buttons, onDismiss) {
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
    messageParagraph.innerHTML = String(message ?? '').replace(/\n/g, '<br>');
    content.appendChild(messageParagraph);

    const buttonRow = document.createElement('div');
    buttonRow.className = 'error-buttons';

    function closeDialog(callback) {
        overlay.remove();
        document.removeEventListener('keydown', keyHandler, true);
        if (typeof callback === 'function') {
            try { callback(); } catch (_) {}
        }
    }

    buttons.forEach(btn => {
        const el = document.createElement('button');
        el.textContent = btn.label;
        el.addEventListener('click', () => closeDialog(btn.onClick));
        buttonRow.appendChild(el);
    });
    content.appendChild(buttonRow);

    container.appendChild(titlebar);
    container.appendChild(content);
    overlay.appendChild(container);
    document.body.appendChild(overlay);

    closeBtn.addEventListener('click', () => closeDialog(onDismiss));

    // Enter activates the first (default) button, Escape dismisses
    const keyHandler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            closeDialog(buttons[0] && buttons[0].onClick);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            closeDialog(onDismiss);
        }
    };
    document.addEventListener('keydown', keyHandler, true);
}

function showXPAlert(title, message, options = {}) {
    showXPDialog(title, message, [
        { label: options.okText || 'OK', onClick: options.onClose }
    ], options.onClose);
}

// Async replacement for confirm(): calls onConfirm or onCancel instead of returning a value
function showXPConfirm(title, message, onConfirm, onCancel, options = {}) {
    showXPDialog(title, message, [
        { label: options.okText || 'OK', onClick: onConfirm },
        { label: options.cancelText || 'Cancel', onClick: onCancel }
    ], onCancel);
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