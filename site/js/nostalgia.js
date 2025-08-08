function renderPinball() {
    const ctx = pinballCtx;
    const canvas = pinballCanvas;
    
    // Clear canvas
    ctx.fillStyle = 'linear-gradient(to bottom, #2d1b69 0%, #1a0f3d 100%)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw table gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#2d1b69');
    gradient.addColorStop(0.5, '#251553');
    gradient.addColorStop(1, '#1a0f3d');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw walls
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 0);
    ctx.lineTo(50, canvas.height);
    ctx.moveTo(450, 0);
    ctx.lineTo(450, 600);
    ctx.stroke();
    
    // Draw launch chute
    ctx.strokeStyle = '#666';
    ctx.beginPath();
    ctx.moveTo(460, 0);
    ctx.lineTo(460, canvas.height);
    ctx.moveTo(490, 0);
    ctx.lineTo(490, canvas.height);
    ctx.stroke();
    
    // Draw launch chute exit ramp
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.moveTo(440, 80);
    ctx.lineTo(460, 60);
    ctx.lineTo(460, 100);
    ctx.lineTo(440, 100);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.stroke();
    
    // Draw targets
    pinballGame.targets.forEach(target => {
        ctx.fillStyle = target.hit ? '#333' : '#FFD700';
        ctx.fillRect(target.x, target.y, target.width, target.height);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(target.x, target.y, target.width, target.height);
    });
    
    // Draw bumpers
    pinballGame.bumpers.forEach(bumper => {
        // Bumper shadow
        ctx.beginPath();
        ctx.arc(bumper.x + 2, bumper.y + 2, bumper.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fill();
        
        // Bumper body
        ctx.beginPath();
        ctx.arc(bumper.x, bumper.y, bumper.radius, 0, Math.PI * 2);
        const bumperGradient = ctx.createRadialGradient(
            bumper.x - bumper.radius/3, bumper.y - bumper.radius/3, 0,
            bumper.x, bumper.y, bumper.radius
        );
        bumperGradient.addColorStop(0, bumper.color);
        bumperGradient.addColorStop(1, shadeColor(bumper.color, -40));
        ctx.fillStyle = bumperGradient;
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
    
    // Draw lights
    pinballGame.lights.forEach(light => {
        ctx.beginPath();
        ctx.arc(light.x, light.y, light.radius, 0, Math.PI * 2);
        ctx.fillStyle = light.on ? '#FFFF00' : '#444';
        ctx.fill();
        if (light.on) {
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#FFFF00';
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    });
    
    // Draw flippers
    drawFlipper(pinballGame.flippers.left, 1);
    drawFlipper(pinballGame.flippers.right, -1);
    
    // Draw ball
    const { ball } = pinballGame;
    
    // Ball shadow
    ctx.beginPath();
    ctx.arc(ball.x + 2, ball.y + 2, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fill();
    
    // Ball body
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    const ballGradient = ctx.createRadialGradient(
        ball.x - ball.radius/3, ball.y - ball.radius/3, 0,
        ball.x, ball.y, ball.radius
    );
    ballGradient.addColorStop(0, '#E0E0E0');
    ballGradient.addColorStop(0.5, '#C0C0C0');
    ballGradient.addColorStop(1, '#808080');
    ctx.fillStyle = ballGradient;
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Draw table details
    drawTableDetails();
}

function drawFlipper(flipper, direction) {
    const ctx = pinballCtx;
    const angleRad = (flipper.angle * Math.PI) / 180;
    
    ctx.save();
    ctx.translate(flipper.x, flipper.y);
    
    if (direction === 1) {
        // Left flipper
        ctx.rotate(angleRad);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(flipper.length, -5);
        ctx.lineTo(flipper.length, 5);
        ctx.closePath();
    } else {
        // Right flipper - mirror horizontally
        ctx.scale(-1, 1);
        ctx.rotate(-angleRad);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(flipper.length, -5);
        ctx.lineTo(flipper.length, 5);
        ctx.closePath();
    }
    
    const flipperGradient = ctx.createLinearGradient(0, -5, 0, 5);
    flipperGradient.addColorStop(0, '#C0C0C0');
    flipperGradient.addColorStop(0.5, '#E0E0E0');
    flipperGradient.addColorStop(1, '#A0A0A0');
    
    ctx.fillStyle = flipperGradient;
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Flipper pivot
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#666';
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.stroke();
    
    ctx.restore();
}

function drawTableDetails() {
    const ctx = pinballCtx;
    
    // Draw score multiplier areas
    ctx.font = 'bold 16px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.textAlign = 'center';
    
    ctx.fillText('2X', 125, 250);
    ctx.fillText('3X', 250, 200);
    ctx.fillText('5X', 375, 250);
    
    // Draw arrows
    drawArrow(100, 400, 150, 380, '#00FF00');
    drawArrow(400, 400, 350, 380, '#00FF00');
    
    // Draw launch instructions
    if (!pinballGame.ball.launched) {
        ctx.font = 'bold 14px Arial';
        ctx.fillStyle = '#FFD700';
        ctx.textAlign = 'center';
        ctx.fillText('PRESS', 475, 300);
        ctx.fillText('SPACE', 475, 320);
        ctx.fillText('TO', 475, 340);
        ctx.fillText('LAUNCH', 475, 360);
    }
}

function drawArrow(x1, y1, x2, y2, color) {
    const ctx = pinballCtx;
    const headlen = 10;
    const angle = Math.atan2(y2 - y1, x2 - x1);
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x2 - headlen * Math.cos(angle - Math.PI / 6), y2 - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - headlen * Math.cos(angle + Math.PI / 6), y2 - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
}

function shadeColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

function showClippy() {
    const clippy = document.createElement('div');
    clippy.className = 'clippy';
    clippy.innerHTML = `
        <img src="clip.png" alt="Clippy" class="clippy-image" />
        <div class="clippy-bubble">
            <p>It looks like you're writing a website! 📎</p>
            <p>Would you like help?</p>
            <button onclick="this.parentElement.parentElement.remove()">Don't show me this tip again</button>
        </div>
    `;
    document.body.appendChild(clippy);
    

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
}, 15000);

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

// Add Windows error message after 45 seconds
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
}, 45000);

// Add more nostalgic pop-ups
const nostalgicPopups = [
    {
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

// Schedule all the pop-ups with less frequency
nostalgicPopups.forEach((popup, index) => {
    setTimeout(() => {
        const popupEl = document.createElement('div');
        popupEl.className = 'popup-ad';
        popupEl.innerHTML = `<div class="popup-content">${popup.content}</div>`;
        document.body.appendChild(popupEl);
        
        // Add random position
        popupEl.style.top = Math.random() * 50 + 20 + '%';
        popupEl.style.left = Math.random() * 50 + 20 + '%';
        
        playSound('ding');
    }, 20000 + (index * 15000));
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
}, 60000);

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
