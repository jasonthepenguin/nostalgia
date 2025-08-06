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
        
        // Make sure window is within viewport - only adjust if it's outside
        const currentLeft = window.offsetLeft;
        const currentTop = window.offsetTop;
        const maxX = window.innerWidth - window.offsetWidth;
        const maxY = window.innerHeight - window.offsetHeight - 40;
        
        // Only reposition if window is outside viewport
        if (currentLeft < 0 || currentLeft > maxX || currentTop < 0 || currentTop > maxY) {
            window.style.left = Math.max(0, Math.min(currentLeft, maxX)) + 'px';
            window.style.top = Math.max(0, Math.min(currentTop, maxY)) + 'px';
        }
    }
} 