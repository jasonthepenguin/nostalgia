// Nostalgia features: Popups, Clippy, Sounds, etc.

// Sound helper
function playSound(name) {
    let file = '';
    if (name === 'error') file = 'https://www.myinstants.com/media/sounds/windows-xp-error.mp3';
    else if (name === 'ding') file = 'https://www.myinstants.com/media/sounds/windows-xp-ding.mp3';
    else if (name === 'shutdown') file = 'https://www.myinstants.com/media/sounds/windows-xp-shutdown.mp3';
    else if (name === 'startup') file = 'https://www.myinstants.com/media/sounds/windows-xp-startup.mp3';
    
    // Fallback if local files exist (user has local files in file list)
    if (name === 'error') file = 'meow.mp3'; // placeholder
    // Using standard XP sounds from external source for authentic feel as fallback
    // But since we have some local files, we'll assume we can't easily play externals without permission
    // For this demo, we'll just try to play what we have or fail silently
}

function shadeColor(color, percent) {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

function showClippy() {
    // Check if clippy already exists
    if (document.querySelector('.clippy')) return;

    const clippy = document.createElement('div');
    clippy.className = 'clippy';
    clippy.innerHTML = `
        <img src="clip.png" alt="Clippy" class="clippy-image" />
        <div class="clippy-bubble">
            <p>It looks like you're browsing the web! 📎</p>
            <p>Would you like help?</p>
            <button onclick="this.parentElement.parentElement.remove()">Get me out of here!</button>
        </div>
    `;
    document.body.appendChild(clippy);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (clippy.parentElement) clippy.remove();
    }, 10000);
}

// Add random popups for that authentic early 2000s experience
setTimeout(() => {
    createPopup(`
        <div class="popup-header">
            <span>Microsoft Internet Explorer</span>
            <button onclick="this.closest('.popup-ad').remove()">X</button>
        </div>
        <div class="popup-body" style="background-color: #ECE9D8; text-align: left; padding: 10px;">
            <div style="display: flex; gap: 10px; align-items: center;">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cpath d='M16 2L2 30h28L16 2z' fill='%23FFCC00' stroke='%23000' stroke-width='2'/%3E%3Cpath d='M16 10v10' stroke='%23000' stroke-width='3'/%3E%3Ccircle cx='16' cy='25' r='2' fill='%23000'/%3E%3C/svg%3E" style="width: 32px; height: 32px;">
                <span style="font-family: 'Tahoma', sans-serif; font-size: 11px;">Your computer may be at risk.</span>
            </div>
            <div style="display: flex; justify-content: center; margin-top: 15px;">
                <button onclick="this.closest('.popup-ad').remove()" style="padding: 3px 20px;">OK</button>
            </div>
        </div>
    `);
}, 5000);

function createPopup(contentHTML) {
    const popup = document.createElement('div');
    popup.className = 'popup-ad';
    popup.innerHTML = `<div class="popup-content">${contentHTML}</div>`;
    
    // Random position within the viewport
    const x = Math.random() * (window.innerWidth - 400);
    const y = Math.random() * (window.innerHeight - 300);
    
    popup.style.left = x + 'px';
    popup.style.top = y + 'px';
    popup.style.transform = 'none'; // Override the center translate
    
    document.body.appendChild(popup);
    return popup;
}

// Add the dancing baby easter egg
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiPattern.length - 1, konamiCode.length - konamiPattern.length);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        const baby = document.createElement('div');
        baby.className = 'dancing-baby';
        baby.innerHTML = '<img src="https://web.archive.org/web/20000229165600im_/http://www.geocities.com/Area51/Corridor/5057/baby.gif" style="width: 200px;">'; // Fallback or use text emoji if image fails
        baby.style.position = 'fixed';
        baby.style.bottom = '50px';
        baby.style.left = '-200px';
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

// Add Windows error message after 45 seconds
setTimeout(() => {
    const error = document.createElement('div');
    error.className = 'windows-error';
    error.innerHTML = `
        <div class="error-window">
            <div class="error-titlebar">
                <span>Error</span>
                <button onclick="this.closest('.windows-error').remove()">X</button>
            </div>
            <div class="error-content">
                <p>The system has recovered from a serious error.</p>
                <button onclick="this.closest('.windows-error').remove()">Send Error Report</button>
                <button onclick="this.closest('.windows-error').remove()" style="margin-left: 5px;">Don't Send</button>
            </div>
        </div>
    `;
    document.body.appendChild(error);
}, 45000);

// Add more nostalgic pop-ups
const nostalgicPopups = [
    {
        content: `
            <div class="popup-header">
                <span>Message from Webpage</span>
                <button onclick="this.closest('.popup-ad').remove()">X</button>
            </div>
            <div class="popup-body">
                <p>YOU ARE THE 999,999th VISITOR!</p>
                <p style="font-size: 24px; font-weight: bold; color: red; animation: blink 0.5s infinite;">CONGRATULATIONS!</p>
                <p>Click here to claim your FREE iPod Nano!</p>
                <button class="blink" onclick="alert('Redirecting to prize-claim-totally-legit.exe...')">CLAIM NOW!!!</button>
            </div>
        `
    },
    {
        content: `
            <div class="popup-header">
                <span>Microsoft Internet Explorer</span>
                <button onclick="this.closest('.popup-ad').remove()">X</button>
            </div>
            <div class="popup-body">
                <div style="border: 1px inset #fff; background: #fff; padding: 5px; margin-bottom: 10px;">
                    <p style="margin:0; font-family: 'Times New Roman'; color: blue; text-decoration: underline; cursor: pointer;">Run a free system scan?</p>
                </div>
                <p>⚠️ Your computer is running slowly!</p>
                <p>Clean your registry NOW for FREE!</p>
                <button class="blink" style="background: #00FF00; color: black;">FIX ERRORS</button>
            </div>
        `
    },
    {
        content: `
            <div class="popup-header">
                <span>Punch The Monkey!</span>
                <button onclick="this.closest('.popup-ad').remove()">X</button>
            </div>
            <div class="popup-body" style="background: #000; color: #FFF;">
                <p style="color: #0F0;">WIN A FREE PS2!</p>
                <div style="height: 100px; position: relative; border: 1px solid #fff; margin: 10px 0; overflow: hidden;">
                    <div style="position: absolute; font-size: 40px; cursor: crosshair; animation: dance 2s infinite linear; left: 50%; top: 20px;" onclick="alert('WINNER! Please enter your credit card to pay for shipping ($99.99)')">🐒</div>
                </div>
                <p>CLICK THE MONKEY TO WIN!</p>
            </div>
        `
    },
    {
        content: `
            <div class="popup-header">
                <span>Casino Royale 2002</span>
                <button onclick="this.closest('.popup-ad').remove()">X</button>
            </div>
            <div class="popup-body" style="background: #006400; color: gold; border: 2px solid gold;">
                <p style="font-family: 'Comic Sans MS'; font-size: 20px;">$$$ ONLINE CASINO $$$</p>
                <p>Get $500 FREE chip bonus!</p>
                <div style="font-size: 30px;">🎰 7 7 7 🎰</div>
                <button class="blink" style="background: gold; color: black;">PLAY NOW</button>
            </div>
        `
    },
    {
        content: `
            <div class="popup-header">
                <span>X10 Camera Offer</span>
                <button onclick="this.closest('.popup-ad').remove()">X</button>
            </div>
            <div class="popup-body">
                <p>SPY ON YOUR NEIGHBORS?</p>
                <p>Tiny wireless camera! Only $19.99!</p>
                <div style="border: 1px solid #000; width: 50px; height: 50px; margin: 0 auto; background: #333; border-radius: 50%;">
                    <div style="width: 20px; height: 20px; background: #000; border-radius: 50%; margin: 15px auto;"></div>
                </div>
                <p style="font-size: 9px;">(Actual 2001 ad)</p>
                <button>ORDER NOW</button>
            </div>
        `
    },
    {
        content: `
            <div class="popup-header">
                <span>FREE Screensavers</span>
                <button onclick="this.closest('.popup-ad').remove()">X</button>
            </div>
            <div class="popup-body" style="background: #000080; color: #FFF;">
                <p>🌊 3D Fish Tank Screensaver</p>
                <p>🔥 Johnny Castaway</p>
                <p>🌌 Flying Toasters</p>
                <button style="background: #C0C0C0; color: #000; font-weight: bold;">Download All (2kb)</button>
            </div>
        `
    }
];

// Schedule all the pop-ups
nostalgicPopups.forEach((popup, index) => {
    setTimeout(() => {
        createPopup(popup.content);
    }, 15000 + (index * 12000));
});

// Add a toolbar installer popup
setTimeout(() => {
    const toolbarContent = `
        <div class="popup-header">
            <span>Install BonziBuddy?</span>
            <button onclick="this.closest('.popup-ad').remove()">X</button>
        </div>
        <div class="popup-body" style="background: #ECE9D8; text-align: left;">
            <div style="display: flex; gap: 15px;">
                <div style="font-size: 40px;">🦍</div>
                <div>
                    <p style="margin-top: 0; font-weight: bold;">BonziBuddy would like to install onto your computer.</p>
                    <p>He will:</p>
                    <ul style="font-size: 11px; padding-left: 20px;">
                        <li>Tell you jokes</li>
                        <li>Sing songs</li>
                        <li>Search the internet</li>
                        <li>Totally not steal your data</li>
                    </ul>
                </div>
            </div>
            <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px;">
                <button onclick="alert('BonziBuddy is now watching you.')" style="width: 75px;">Yes</button>
                <button onclick="this.closest('.popup-ad').remove()" style="width: 75px;">No</button>
            </div>
        </div>
    `;
    createPopup(toolbarContent);
}, 40000);

// Add CSS for marquee effect
const style = document.createElement('style');
style.textContent = `
    marquee {
        font-weight: bold;
        color: #FF1493;
    }
`;
document.head.appendChild(style);

// Cat Rain Variables
let catRainActive = false;
let catRainInterval = null;
const activeCats = [];

// Start Cat Rain
function startCatRain() {
    if (catRainActive) return;
    
    catRainActive = true;
    
    // Create cat rain container
    const catRainContainer = document.createElement('div');
    catRainContainer.id = 'cat-rain-container';
    catRainContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
    `;
    document.body.appendChild(catRainContainer);
    
    // Start dropping cats
    catRainInterval = setInterval(() => {
        createFallingCat();
    }, 300); // Drop a cat every 300ms
    
    // Stop after 30 seconds to prevent too many cats
    setTimeout(() => {
        stopCatRain();
    }, 30000);
}

function createFallingCat() {
    const catRainContainer = document.getElementById('cat-rain-container');
    if (!catRainContainer) return;
    
    const cat = document.createElement('div');
    cat.className = 'falling-cat';
    cat.draggable = true;
    
    // Random horizontal position
    const startX = Math.random() * window.innerWidth;
    const rotation = Math.random() * 360;
    const size = 40 + Math.random() * 40; // 40-80px
    
    // Randomly choose between jimmy.png and cat.png
    const catImage = Math.random() < 0.5 ? 'jimmy.png' : 'cat.png';
    
    cat.style.cssText = `
        position: absolute;
        left: ${startX}px;
        top: -100px;
        width: ${size}px;
        height: ${size}px;
        background-image: url('${catImage}');
        background-size: contain;
        background-repeat: no-repeat;
        cursor: grab;
        pointer-events: auto;
        transform: rotate(${rotation}deg);
        transition: none;
    `;
    
    // Add drag handlers
    cat.addEventListener('dragstart', handleCatDragStart);
    cat.addEventListener('drag', handleCatDrag);
    cat.addEventListener('dragend', handleCatDragEnd);
    cat.addEventListener('mousedown', () => {
        cat.style.cursor = 'grabbing';
        playMeow();
    });
    cat.addEventListener('mouseup', () => {
        cat.style.cursor = 'grab';
    });
    
    catRainContainer.appendChild(cat);
    activeCats.push(cat);
    
    // Animate falling
    animateFallingCat(cat);
}

function animateFallingCat(cat) {
    let posY = -100;
    const speed = 2 + Math.random() * 3; // 2-5 pixels per frame
    const swayAmount = Math.random() * 2 - 1; // -1 to 1
    let swayX = 0;
    
    const fallInterval = setInterval(() => {
        posY += speed;
        swayX += swayAmount;
        
        // Add some sway
        cat.style.top = `${posY}px`;
        cat.style.transform = `translateX(${Math.sin(swayX * 0.05) * 20}px) rotate(${parseFloat(cat.style.transform.match(/rotate\(([^)]+)deg\)/)[1]) + 2}deg)`;
        
        // Check if cat hit the bottom
        if (posY >= window.innerHeight - 100) {
            clearInterval(fallInterval);
            cat.style.top = `${window.innerHeight - 100}px`;
            // Remove fall animation, cat stays at bottom
            cat.dataset.landed = 'true';
        }
    }, 16); // ~60fps
    
    cat.dataset.fallInterval = fallInterval;
}

function handleCatDragStart(e) {
    const cat = e.target;
    cat.style.opacity = '0.8';
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setDragImage(cat, e.offsetX, e.offsetY);
    
    // Stop falling animation if still falling
    if (cat.dataset.fallInterval) {
        clearInterval(parseInt(cat.dataset.fallInterval));
    }
    
    playMeow();
}

function handleCatDrag(e) {
    if (e.clientX === 0 && e.clientY === 0) return; // Drag ended
    
    const cat = e.target;
    cat.style.left = `${e.clientX - cat.offsetWidth / 2}px`;
    cat.style.top = `${e.clientY - cat.offsetHeight / 2}px`;
}

function handleCatDragEnd(e) {
    const cat = e.target;
    cat.style.opacity = '1';
    
    // Update final position
    if (e.clientX !== 0 || e.clientY !== 0) {
        cat.style.left = `${e.clientX - cat.offsetWidth / 2}px`;
        cat.style.top = `${e.clientY - cat.offsetHeight / 2}px`;
    }
}

function playMeow() {
    const audio = new Audio('meow.mp3');
    audio.volume = 0.5;
    audio.playbackRate = 0.8 + Math.random() * 0.4; // Vary pitch
    audio.play().catch(() => {
        // If meow.mp3 doesn't exist, use a fallback sound
        const fallbackAudio = new Audio();
        fallbackAudio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQoGAAA=';
        fallbackAudio.volume = 0.3;
        fallbackAudio.play().catch(() => {});
    });
}

function stopCatRain() {
    catRainActive = false;
    if (catRainInterval) {
        clearInterval(catRainInterval);
        catRainInterval = null;
    }
}

// Free Me Game
let freeMeGameActive = false;
let originalIconPositions = new Map();
let gameIcons = [];
let projectiles = [];
let gameLoopId = null;
let mousePos = { x: 0, y: 0 };
let lastShotTimes = new Map();
let freeMeFlickerInterval = null;
let customCursorEl = null;

function startFreeMeGame() {
    if (freeMeGameActive) return;
    freeMeGameActive = true;

    const freeMeIcon = document.getElementById('free-me-icon');
    if (freeMeIcon) {
        const img = freeMeIcon.querySelector('img');
        if (freeMeFlickerInterval) clearInterval(freeMeFlickerInterval);

        img.src = 'stick_2.png';
        freeMeFlickerInterval = setInterval(() => {
            if (img.src.endsWith('stick_2.png')) {
                img.src = 'stick_3.png';
            } else {
                img.src = 'stick_2.png';
            }
        }, 500);
    }

    document.body.classList.add('free-me-game-active');
    
    const desktop = document.querySelector('.desktop');
    const allIcons = document.querySelectorAll('.desktop-icon-item');
    gameIcons = [];
    originalIconPositions.clear();
    const initialRects = new Map();

    // First, get all initial positions before changing anything
    allIcons.forEach(icon => {
        initialRects.set(icon, icon.getBoundingClientRect());
    });

    const startTime = performance.now();

    // Now, reposition all icons and set up game icons
    allIcons.forEach(icon => {
        const rect = initialRects.get(icon);
        // Save original state so we can restore it
        originalIconPositions.set(icon, {
            position: icon.style.position,
            top: icon.style.top,
            left: icon.style.left,
            zIndex: icon.style.zIndex,
            display: window.getComputedStyle(icon).display,
            parent: icon.parentElement,
            nextSibling: icon.nextSibling
        });

        // Move icon out of flex container and position it absolutely
        desktop.appendChild(icon);
        icon.style.position = 'absolute';
        icon.style.top = `${rect.top}px`;
        icon.style.left = `${rect.left}px`;
        icon.style.zIndex = 1000;
        icon.style.display = 'flex';

        if (icon.id === 'recycle-bin-icon') {
            icon.style.display = 'none'; // Hide the recycle bin during the game
        } else if (icon.id !== 'free-me-icon') {
            icon.addEventListener('click', trashIcon);
            gameIcons.push(icon);
            // Give each icon a random "head start" on its shooting timer to stagger the shots.
            lastShotTimes.set(icon, startTime - (Math.random() * 5000));
        }
    });

    document.addEventListener('mousemove', trackMouseForGame);

    // Create custom bin cursor overlay
    createCustomCursor();

    gameLoopId = requestAnimationFrame(freeMeGameLoop);
}

function stopFreeMeGame() {
    freeMeGameActive = false;
    if (gameLoopId) {
        cancelAnimationFrame(gameLoopId);
        gameLoopId = null;
    }

    if (freeMeFlickerInterval) {
        clearInterval(freeMeFlickerInterval);
        freeMeFlickerInterval = null;
    }

    const freeMeIcon = document.getElementById('free-me-icon');
    if (freeMeIcon) {
        freeMeIcon.querySelector('img').src = 'stick.png';
    }

    document.body.classList.remove('free-me-game-active');

    // Remove custom cursor overlay
    removeCustomCursor();

    originalIconPositions.forEach((pos, icon) => {
        icon.style.position = pos.position;
        icon.style.top = pos.top;
        icon.style.left = pos.left;
        icon.style.zIndex = pos.zIndex;
        icon.style.display = pos.display;
        icon.removeEventListener('click', trashIcon);

        if (pos.parent) {
            if (pos.nextSibling) {
                pos.parent.insertBefore(icon, pos.nextSibling);
            } else {
                pos.parent.appendChild(icon);
            }
        }
    });
    
    const recycleBin = document.getElementById('recycle-bin-icon');
    if (recycleBin) {
        recycleBin.style.display = 'flex';
    }

    projectiles.forEach(p => p.element.remove());
    projectiles = [];
    gameIcons = [];

    document.removeEventListener('mousemove', trackMouseForGame);
    
    const audio = new Audio('congrats.mp3');
    audio.play().catch(() => { /* Fail silently */ });

    if (freeMeIcon) {
        const iconNameSpan = freeMeIcon.querySelector('span');
        if (iconNameSpan) {
            setTimeout(() => {
                iconNameSpan.textContent = 'fuck.exe';
                setTimeout(() => {
                    iconNameSpan.textContent = 'free_me.exe';
                }, 3000);
            }, 3000);
        }
    }
}

function trackMouseForGame(e) {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;

    // Move custom cursor overlay if present
    if (customCursorEl) {
        // Offset to set hotspot near top-center of the bin
        const hotspotX = 12; // tweak as needed
        const hotspotY = 12;
        customCursorEl.style.left = (mousePos.x - hotspotX) + 'px';
        customCursorEl.style.top = (mousePos.y - hotspotY) + 'px';
    }
}

function trashIcon(event) {
    if (!freeMeGameActive) return;
    
    const audio = new Audio('crumple.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => { /* Fail silently */ });
    
    const icon = event.currentTarget;
    icon.style.display = 'none';
    
    gameIcons = gameIcons.filter(i => i !== icon);
    icon.removeEventListener('click', trashIcon);

    if (gameIcons.length === 0) {
        stopFreeMeGame();
    }
}

function freeMeGameLoop(timestamp) {
    if (!freeMeGameActive) {
        cancelAnimationFrame(gameLoopId);
        return;
    }

    // Read all icon positions at once to avoid performance issues from reading in a loop.
    const iconRects = gameIcons.map(icon => icon.getBoundingClientRect());

    // Calculate the movement for each icon based on all forces (attraction to mouse, repulsion from others).
    const movements = gameIcons.map((icon, i) => {
        const rect = iconRects[i];
        const iconCenterX = rect.left + rect.width / 2;
        const iconCenterY = rect.top + rect.height / 2;

        let moveX = 0;
        let moveY = 0;
        const speed = 1;
        const repulsionStrength = 1.5;

        // Attraction force towards the mouse cursor.
        const dxMouse = mousePos.x - iconCenterX;
        const dyMouse = mousePos.y - iconCenterY;
        const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distanceMouse > 50) {
            moveX += (dxMouse / distanceMouse) * speed;
            moveY += (dyMouse / distanceMouse) * speed;
        }

        // Repulsion force from other icons to prevent them from colliding.
        gameIcons.forEach((otherIcon, j) => {
            if (i === j) return;

            const otherRect = iconRects[j];
            const otherCenterX = otherRect.left + otherRect.width / 2;
            const otherCenterY = otherRect.top + otherRect.height / 2;

            const rdx = iconCenterX - otherCenterX;
            const rdy = iconCenterY - otherCenterY;
            const rDist = Math.sqrt(rdx * rdx + rdy * rdy);
            
            // Treat icons as circles for collision, using an average of width and height for the radius.
            const radius1 = (rect.width + rect.height) / 4;
            const radius2 = (otherRect.width + otherRect.height) / 4;
            const minAllowedDist = radius1 + radius2;

            if (rDist < minAllowedDist) {
                const overlap = minAllowedDist - rDist;
                if (rDist > 0) {
                    // The force is proportional to the overlap and pushes icons away from each other.
                    const repulsionForce = (overlap / rDist) * repulsionStrength;
                    moveX += rdx * repulsionForce;
                    moveY += rdy * repulsionForce;
                } else {
                    // If icons are perfectly overlapped, push them apart randomly.
                    moveX += (Math.random() - 0.5) * repulsionStrength;
                    moveY += (Math.random() - 0.5) * repulsionStrength;
                }
            }
        });
        return { moveX, moveY };
    });
    
    // Apply new positions and handle the shooting logic.
    gameIcons.forEach((icon, i) => {
        const rect = iconRects[i];
        icon.style.left = `${rect.left + movements[i].moveX}px`;
        icon.style.top = `${rect.top + movements[i].moveY}px`;
        
        const iconCenterX = rect.left + rect.width / 2;
        const iconCenterY = rect.top + rect.height / 2;
        
        const shootInterval = 2000 + Math.random() * 3000;
        if (timestamp - (lastShotTimes.get(icon) || 0) > shootInterval) {
            createFlame(iconCenterX, iconCenterY, mousePos.x, mousePos.y);
            lastShotTimes.set(icon, timestamp);
        }
    });
    
    projectiles = projectiles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.element.style.left = `${p.x}px`;
        p.element.style.top = `${p.y}px`;

        // Check for collision with cursor
        const dx = p.x - mousePos.x;
        const dy = p.y - mousePos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const collisionThreshold = 15; // Projectile radius + cursor hotspot

        let shouldBeRemoved = false;
        if (distance < collisionThreshold) {
            // Apply knock back effect
            if (!document.body.classList.contains('cursor-hit')) {
                document.body.classList.add('cursor-hit');
                playSound('error');
                setTimeout(() => {
                    document.body.classList.remove('cursor-hit');
                }, 200);
            }
            shouldBeRemoved = true;
        }

        // Check if out of bounds (with a small buffer)
        if (p.x < -24 || p.x > window.innerWidth || p.y < -24 || p.y > window.innerHeight) {
            shouldBeRemoved = true;
        }

        if (shouldBeRemoved) {
            p.element.remove();
            return false; // Remove from projectiles array
        }
        return true; // Keep in projectiles array
    });

    gameLoopId = requestAnimationFrame(freeMeGameLoop);
}

function createFlame(startX, startY, targetX, targetY) {
    const flame = document.createElement('div');
    flame.className = 'flame-projectile';
    
    const projectileSpeed = 5;
    const dx = targetX - startX;
    const dy = targetY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    const projectile = {
        element: flame,
        x: startX,
        y: startY,
        vx: (dx / distance) * projectileSpeed,
        vy: (dy / distance) * projectileSpeed,
    };
    
    projectiles.push(projectile);
    document.querySelector('.desktop').appendChild(flame);

    const audio = new Audio('fire.mp3');
    audio.volume = 0.1;
    audio.play().catch(() => { /* Fail silently */ });
}

// Custom cursor helpers
function createCustomCursor() {
    if (customCursorEl) return;
    customCursorEl = document.createElement('div');
    customCursorEl.id = 'custom-cursor-bin';
    customCursorEl.style.position = 'fixed';
    customCursorEl.style.width = '32px';
    customCursorEl.style.height = '32px';
    customCursorEl.style.backgroundImage = "url('bin.png')";
    customCursorEl.style.backgroundSize = 'contain';
    customCursorEl.style.backgroundRepeat = 'no-repeat';
    customCursorEl.style.pointerEvents = 'none';
    customCursorEl.style.zIndex = '99999';
    customCursorEl.style.left = '-1000px'; // off-screen until first move
    customCursorEl.style.top = '-1000px';
    document.body.appendChild(customCursorEl);
}

function removeCustomCursor() {
    if (customCursorEl) {
        customCursorEl.remove();
        customCursorEl = null;
    }
}
