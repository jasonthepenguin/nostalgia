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
}

let messengerTimeout;
let messageIndex = 0;
let canSendMessage = false;

const messengerConversation = [
    { delay: 1000, sender: 'other', text: 'OMG hiiiiiii!!! :D :D :D' },
    { delay: 2500, sender: 'other', text: 'wuts up???' },
    { delay: 3000, sender: 'self', text: 'hey!! nm just chillin, u?' },
    { delay: 2000, sender: 'other', text: 'same same... so bored >_<' },
    { delay: 3500, sender: 'other', text: 'my parents r being SO annoying today' },
    { delay: 2500, sender: 'self', text: 'ugh i know right?? mine too' },
    { delay: 3000, sender: 'other', text: 'did u see what happened at school 2day??? :O' },
    { delay: 2000, sender: 'self', text: 'NO!! what happened??' },
    { delay: 4000, sender: 'other', text: 'ok so like... brad was talking to jessica by the lockers' },
    { delay: 3000, sender: 'other', text: 'and then ASHLEY walked up!!!!! :O :O :O' },
    { delay: 2500, sender: 'self', text: 'NO WAYYYY' },
    { delay: 2000, sender: 'self', text: 'omg drama!!!' },
    { delay: 3500, sender: 'other', text: 'IKR?!?! it was crazyyyyy' },
    { delay: 2000, sender: 'other', text: 'brb mom is calling 4 dinner -_-' },
    { delay: 2500, sender: 'self', text: 'kk ttyl!! <3' },
    { delay: 1500, sender: 'system', text: 'Viss Mubbles appears to be offline.' },
    { delay: 10000, sender: 'other', text: 'back!! that took 4everrrr' },
    { delay: 2000, sender: 'other', text: 'r u still there???' },
    { delay: 3000, sender: 'other', text: 'helloooooo????' },
    { delay: 2000, sender: 'nudge', text: 'Viss Mubbles just sent you a nudge!' },
    { delay: 3000, sender: 'self', text: 'sorry was afk!! im here :)' },
    { delay: 2500, sender: 'other', text: 'yayyyy!! wanna play a game?' },
    { delay: 2000, sender: 'self', text: 'sure!! what game?' },
    { delay: 3000, sender: 'other', text: 'truth or dare??? ;)' },
    { delay: 2500, sender: 'self', text: 'haha ok... truth!' },
    { delay: 4000, sender: 'other', text: 'hmmmm... who do u have a crush on??? :P' },
    { delay: 3000, sender: 'self', text: 'OMG no fair!! thats so hard lol' },
    { delay: 2500, sender: 'other', text: 'u have 2 answer!!! its the rules!! :D' },
    { delay: 1500, sender: 'typing', text: 'Viss Mubbles is typing...' }
];

function startMessengerConversation() {
    const chatMessages = document.getElementById('chat-messages');
    const inputText = document.getElementById('messenger-input-text');
    const sendButton = document.querySelector('.send-button');
    
    if (!chatMessages) return;
    
    // Clear previous messages
    chatMessages.innerHTML = '';
    messageIndex = 0;
    canSendMessage = false;
    
    // Clear any existing timeout
    if (messengerTimeout) {
        clearTimeout(messengerTimeout);
    }
    
    // Start the conversation
    playNextMessage();
}

function playNextMessage() {
    if (messageIndex >= messengerConversation.length) {
        // Enable input after conversation ends
        const inputText = document.getElementById('messenger-input-text');
        const sendButton = document.querySelector('.send-button');
        if (inputText) inputText.disabled = false;
        if (sendButton) sendButton.disabled = false;
        canSendMessage = true;
        return;
    }
    
    const message = messengerConversation[messageIndex];
    messengerTimeout = setTimeout(() => {
        addMessage(message.sender, message.text);
        messageIndex++;
        playNextMessage();
    }, message.delay);
}

function addMessage(sender, text) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    
    if (sender === 'nudge') {
        messageDiv.className = 'chat-nudge';
        messageDiv.innerHTML = `<strong>${text}</strong>`;
        playSound('ding');
        // Shake the window
        const messengerWindow = document.getElementById('messenger-window');
        if (messengerWindow) {
            messengerWindow.style.animation = 'shake 0.5s';
            setTimeout(() => {
                messengerWindow.style.animation = '';
            }, 500);
        }
    } else if (sender === 'system') {
        messageDiv.className = 'chat-nudge';
        messageDiv.textContent = text;
    } else if (sender === 'typing') {
        messageDiv.className = 'chat-nudge';
        messageDiv.id = 'typing-indicator';
        messageDiv.innerHTML = `<em>${text}</em>`;
    } else {
        messageDiv.className = 'chat-message';
        const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        
        if (sender === 'self') {
            messageDiv.innerHTML = `
                <span class="sender">Jason (${time}) says:</span>
                <div class="text">${processEmoticons(text)}</div>
            `;
        } else {
            messageDiv.innerHTML = `
                <span class="sender other msg-color-pink comic-sans">Viss Mubbles (${time}) says:</span>
                <div class="text msg-color-purple comic-sans">${processEmoticons(text)}</div>
            `;
        }
    }
    
    // Remove typing indicator if exists
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator && sender !== 'typing') {
        typingIndicator.remove();
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Update last message time
    const lastMsgTime = document.getElementById('last-msg-time');
    if (lastMsgTime && sender === 'other') {
        lastMsgTime.textContent = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    }
}

function processEmoticons(text) {
    const emoticons = {
        ':)': '😊',
        ':D': '😃',
        ';)': '😉',
        ':P': '😛',
        ':O': '😮',
        ':(': '😢',
        '>_<': '😣',
        '-_-': '😑',
        ':*': '😘',
        '<3': '❤️',
        '</3': '💔',
        'xD': '🤣',
        'XD': '🤣',
        ':|': '😐',
        'O_O': '😳',
        '^_^': '😄',
        'T_T': '😭',
        ':3': '😊',
        '8)': '😎'
    };
    
    let processedText = text;
    for (const [emote, emoji] of Object.entries(emoticons)) {
        processedText = processedText.replace(new RegExp(escapeRegExp(emote), 'g'), 
            `<span class="chat-emoticon">${emoji}</span>`);
    }
    return processedText;
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function sendMessage() {
    if (!canSendMessage) return;
    
    const inputText = document.getElementById('messenger-input-text');
    if (!inputText || !inputText.value.trim()) return;
    
    const message = inputText.value.trim();
    addMessage('self', message);
    inputText.value = '';
    
    // Simulate response after a delay
    setTimeout(() => {
        const responses = [
            'haha totally!!',
            'omg same',
            'IKR?!?!',
            'thats so crazy',
            'wait really???',
            'no wayyy',
            'LOL',
            'brb phone',
            'ugh my computer is being so slow',
            'do u have the homework for tomorrow?',
            'wanna come over later?',
            'my parents said maybe',
            'gtg dinner... ttyl!! <3'
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addMessage('other', randomResponse);
    }, 2000 + Math.random() * 3000);
}

function openMediaPlayer() {
    alert(`🎵 Windows Media Player

Now Playing: Linkin Park - In The End
▶️ ═══════════ 2:36/3:36

Visualizations: Enabled 🌈

Don't forget to rip your CDs at 128kbps!`);
}

// Pinball Game Variables
let pinballCanvas, pinballCtx;
let pinballInitialized = false;
let pinballAnimationId = null;

// Game state
const pinballGame = {
    ball: {
        x: 470,
        y: 650,
        vx: 0,
        vy: 0,
        radius: 8,
        launched: false
    },
    flippers: {
        left: {
            angle: 0,
            targetAngle: 0,
            x: 150,
            y: 600,
            length: 60,
            maxAngle: 45
        },
        right: {
            angle: 0,
            targetAngle: 0,
            x: 350,
            y: 600,
            length: 60,
            maxAngle: -45
        }
    },
    score: 0,
    highScore: 1000000,
    balls: 3,
    currentBall: 1,
    gravity: 0.2,  // Reduced gravity for better gameplay
    friction: 0.998,  // Less friction for smoother ball movement
    bumpers: [],
    targets: [],
    lights: [],
    lastTime: 0,
    keys: {}
};

// Initialize pinball game
function initPinballGame() {
    if (pinballInitialized) return;
    
    pinballCanvas = document.getElementById('pinball-canvas');
    if (!pinballCanvas) return;
    
    pinballCtx = pinballCanvas.getContext('2d');
    pinballInitialized = true;
    
    // Create game objects
    createPinballObjects();
    
    // Set up event listeners
    setupPinballControls();
    
    // Start game loop
    startPinballGame();
}

function createPinballObjects() {
    // Create bumpers
    pinballGame.bumpers = [
        { x: 150, y: 200, radius: 25, color: '#FFD700', hits: 0, value: 100 },
        { x: 250, y: 150, radius: 25, color: '#FF1493', hits: 0, value: 100 },
        { x: 350, y: 200, radius: 25, color: '#00CED1', hits: 0, value: 100 },
        { x: 200, y: 280, radius: 20, color: '#7FFF00', hits: 0, value: 50 },
        { x: 300, y: 280, radius: 20, color: '#FF6347', hits: 0, value: 50 }
    ];
    
    // Create targets
    pinballGame.targets = [
        { x: 100, y: 350, width: 30, height: 10, hit: false, value: 25 },
        { x: 150, y: 350, width: 30, height: 10, hit: false, value: 25 },
        { x: 200, y: 350, width: 30, height: 10, hit: false, value: 25 },
        { x: 270, y: 350, width: 30, height: 10, hit: false, value: 25 },
        { x: 320, y: 350, width: 30, height: 10, hit: false, value: 25 },
        { x: 370, y: 350, width: 30, height: 10, hit: false, value: 25 }
    ];
    
    // Create lights
    pinballGame.lights = [
        { x: 100, y: 100, radius: 5, on: false },
        { x: 400, y: 100, radius: 5, on: false },
        { x: 100, y: 500, radius: 5, on: false },
        { x: 400, y: 500, radius: 5, on: false }
    ];
}

function setupPinballControls() {
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        pinballGame.keys[e.key] = true;
        
        // Prevent default for game keys
        if (['z', 'Z', '/', ' ', 'ArrowUp', 'x', 'X', '.'].includes(e.key)) {
            e.preventDefault();
        }
    });
    
    document.addEventListener('keyup', (e) => {
        pinballGame.keys[e.key] = false;
    });
    
    // Clean up when window closes
    const pinballWindow = document.getElementById('pinball-window');
    if (pinballWindow) {
        const closeBtn = pinballWindow.querySelector('.window-close');
        const originalClose = closeBtn.onclick;
        closeBtn.onclick = function() {
            stopPinballGame();
            if (originalClose) originalClose.call(this);
        };
    }
}

function startPinballGame() {
    if (pinballAnimationId) return;
    
    pinballGame.lastTime = performance.now();
    gameLoop();
}

function stopPinballGame() {
    if (pinballAnimationId) {
        cancelAnimationFrame(pinballAnimationId);
        pinballAnimationId = null;
    }
}

function gameLoop(currentTime) {
    const deltaTime = Math.min((currentTime - pinballGame.lastTime) / 16.67, 2);
    pinballGame.lastTime = currentTime;
    
    updatePinball(deltaTime);
    renderPinball();
    
    pinballAnimationId = requestAnimationFrame(gameLoop);
}

function updatePinball(dt) {
    const { ball, flippers, keys } = pinballGame;
    
    // Handle input
    if (keys[' '] && !ball.launched && ball.x > 460) {
        ball.launched = true;
        ball.vy = -25;  // Increased launch power
        ball.vx = -3 + (Math.random() * 2);  // Slight leftward bias to get onto the table
    }
    
    // Update flippers
    flippers.left.targetAngle = (keys['z'] || keys['Z']) ? flippers.left.maxAngle : 0;
    flippers.right.targetAngle = (keys['/']) ? flippers.right.maxAngle : 0;
    
    // Animate flippers
    flippers.left.angle += (flippers.left.targetAngle - flippers.left.angle) * 0.3;
    flippers.right.angle += (flippers.right.targetAngle - flippers.right.angle) * 0.3;
    
    // Handle nudging
    if (keys['x'] || keys['X']) {
        ball.vx -= 0.5;
    }
    if (keys['.']) {
        ball.vx += 0.5;
    }
    if (keys['ArrowUp']) {
        ball.vy -= 0.5;
    }
    
    // Update ball physics
    if (ball.launched) {
        ball.vy += pinballGame.gravity * dt;
        ball.vx *= pinballGame.friction;
        ball.vy *= pinballGame.friction;
        
        ball.x += ball.vx * dt;
        ball.y += ball.vy * dt;
        
        // Check collisions
        checkWallCollisions();
        checkBumperCollisions();
        checkTargetCollisions();
        checkFlipperCollisions();
        
        // Check if ball is lost
        if (ball.y > pinballCanvas.height + 50) {
            lostBall();
        }
    }
    
    // Update UI
    document.getElementById('pinball-score').textContent = pinballGame.score;
    document.getElementById('pinball-ball').textContent = pinballGame.currentBall;
    document.getElementById('balls-remaining').textContent = pinballGame.balls;
}

function checkWallCollisions() {
    const { ball } = pinballGame;
    
    // Launch chute exit - guide ball onto table
    if (ball.launched && ball.x > 440 && ball.y < 100) {
        // Push ball left onto the table
        ball.vx = -8;
        ball.vy = 2;
    }
    
    // Side walls
    if (ball.x - ball.radius < 50) {
        ball.x = 50 + ball.radius;
        ball.vx *= -0.8;
        addScore(10);
    } else if (ball.x + ball.radius > 450 && ball.y > 100) {
        // Only bounce off right wall if not in launch area
        ball.x = 450 - ball.radius;
        ball.vx *= -0.8;
        addScore(10);
    }
    
    // Top wall
    if (ball.y - ball.radius < 0) {
        ball.y = ball.radius;
        ball.vy *= -0.8;
    }
    
    // Keep ball in launch chute before launch
    if (!ball.launched && ball.x > 460) {
        if (ball.y - ball.radius < 0) {
            ball.y = ball.radius;
            ball.vy = 0;
        }
        if (ball.x > 480) {
            ball.x = 480;
            ball.vx = 0;
        }
    }
}

function checkBumperCollisions() {
    const { ball, bumpers } = pinballGame;
    
    bumpers.forEach(bumper => {
        const dx = ball.x - bumper.x;
        const dy = ball.y - bumper.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < ball.radius + bumper.radius) {
            // Calculate bounce
            const angle = Math.atan2(dy, dx);
            const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
            
            ball.vx = Math.cos(angle) * speed * 1.5;
            ball.vy = Math.sin(angle) * speed * 1.5;
            
            // Move ball outside bumper
            const overlap = ball.radius + bumper.radius - distance;
            ball.x += Math.cos(angle) * overlap;
            ball.y += Math.sin(angle) * overlap;
            
            // Score and effects
            addScore(bumper.value);
            bumper.hits++;
            flashBumper(bumper);
            playPinballSound('bumper');
        }
    });
}

function checkTargetCollisions() {
    const { ball, targets } = pinballGame;
    
    targets.forEach(target => {
        if (!target.hit &&
            ball.x + ball.radius > target.x &&
            ball.x - ball.radius < target.x + target.width &&
            ball.y + ball.radius > target.y &&
            ball.y - ball.radius < target.y + target.height) {
            
            target.hit = true;
            addScore(target.value);
            ball.vy *= -0.8;
            
            // Check if all targets hit
            if (targets.every(t => t.hit)) {
                targets.forEach(t => t.hit = false);
                addScore(500);
                flashLights();
            }
        }
    });
}

function checkFlipperCollisions() {
    const { ball, flippers } = pinballGame;
    
    // Check left flipper
    checkSingleFlipperCollision(flippers.left, 1);
    
    // Check right flipper
    checkSingleFlipperCollision(flippers.right, -1);
}

function checkSingleFlipperCollision(flipper, direction) {
    const { ball } = pinballGame;
    
    // Convert flipper angle to radians
    const angleRad = (flipper.angle * Math.PI) / 180;
    
    // Flipper end position
    let endX, endY;
    if (direction === 1) {
        // Left flipper
        endX = flipper.x + Math.cos(angleRad) * flipper.length;
        endY = flipper.y - Math.sin(angleRad) * flipper.length;
    } else {
        // Right flipper - mirror horizontally
        endX = flipper.x - Math.cos(angleRad) * flipper.length;
        endY = flipper.y - Math.sin(angleRad) * flipper.length;
    }
    
    // Check collision with flipper line
    const dist = pointToLineDistance(ball.x, ball.y, flipper.x, flipper.y, endX, endY);
    
    if (dist < ball.radius) {
        // Calculate flipper velocity
        const flipperVelocity = (flipper.targetAngle - flipper.angle) * 0.5;
        
        // Calculate bounce angle
        const normal = Math.atan2(endY - flipper.y, endX - flipper.x) + Math.PI / 2;
        const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
        
        ball.vx = Math.cos(normal) * (speed + Math.abs(flipperVelocity)) * 1.2;
        ball.vy = Math.sin(normal) * (speed + Math.abs(flipperVelocity)) * -1.2;
        
        // Move ball outside flipper
        ball.y = Math.min(ball.y, flipper.y - ball.radius);
        
        addScore(10);
        playPinballSound('flipper');
    }
}

function pointToLineDistance(px, py, x1, y1, x2, y2) {
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;
    
    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    
    if (lenSq !== 0) {
        param = dot / lenSq;
    }
    
    let xx, yy;
    
    if (param < 0) {
        xx = x1;
        yy = y1;
    } else if (param > 1) {
        xx = x2;
        yy = y2;
    } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }
    
    const dx = px - xx;
    const dy = py - yy;
    
    return Math.sqrt(dx * dx + dy * dy);
}

function lostBall() {
    const { ball } = pinballGame;
    
    ball.x = 470;
    ball.y = 650;
    ball.vx = 0;
    ball.vy = 0;
    ball.launched = false;
    
    pinballGame.balls--;
    pinballGame.currentBall++;
    
    if (pinballGame.balls <= 0) {
        gameOver();
    }
}

function gameOver() {
    stopPinballGame();
    
    if (pinballGame.score > pinballGame.highScore) {
        pinballGame.highScore = pinballGame.score;
        document.getElementById('pinball-highscore').textContent = pinballGame.highScore;
        alert(`🏆 NEW HIGH SCORE! ${pinballGame.score} points!`);
    } else {
        alert(`Game Over!\nFinal Score: ${pinballGame.score}`);
    }
    
    // Reset game
    pinballGame.score = 0;
    pinballGame.balls = 3;
    pinballGame.currentBall = 1;
    pinballGame.ball.x = 470;
    pinballGame.ball.y = 650;
    pinballGame.ball.vx = 0;
    pinballGame.ball.vy = 0;
    pinballGame.ball.launched = false;
    
    startPinballGame();
}

function addScore(points) {
    pinballGame.score += points;
}

function flashBumper(bumper) {
    const originalColor = bumper.color;
    bumper.color = '#FFFFFF';
    setTimeout(() => {
        bumper.color = originalColor;
    }, 100);
}

function flashLights() {
    pinballGame.lights.forEach(light => {
        light.on = true;
        setTimeout(() => {
            light.on = false;
        }, 500);
    });
}

function playPinballSound(type) {
    // Simple sound effect simulation
    const audio = new Audio();
    audio.volume = 0.3;
    
    switch(type) {
        case 'bumper':
        case 'flipper':
            audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAAA=';
            break;
    }
    
    audio.play().catch(() => {});
}

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
        <div class="clippy-bubble">
            <p>It looks like you're writing a website! 📎</p>
            <p>Would you like help?</p>
            <button onclick="this.parentElement.parentElement.remove()">Don't show me this tip again</button>
        </div>
    `;
    document.body.appendChild(clippy);
    

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
            <div class="start-menu-item" onclick="openMessengerWindow()">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='14' fill='%231E90FF'/%3E%3Cpath d='M8 16c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8c-1.2 0-2.3-.3-3.3-.7L8 24.5V16z' fill='%23fff'/%3E%3C/svg%3E" alt="Messenger">
                <span>MSN Messenger</span>
            </div>
            <div class="start-menu-item" onclick="openMediaPlayer()">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='14' fill='%23FF6600'/%3E%3Cpath d='M12 10v12l10-6z' fill='%23fff'/%3E%3C/svg%3E" alt="Media Player">
                <span>Windows Media Player</span>
            </div>
            <div class="start-menu-item" onclick="showWindow('pinball-window'); initPinballGame()">
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

// Paint Application
let paintInitialized = false;
let paintCanvas, paintCtx;
let isDrawing = false;
let currentTool = 'pencil';
let currentColor = '#000000';
let secondaryColor = '#FFFFFF';
let brushSize = 2;
let startX, startY;
let lastX, lastY;

function initPaintApp() {
    if (paintInitialized) return;
    
    paintCanvas = document.getElementById('paint-canvas');
    if (!paintCanvas) return;
    
    paintCtx = paintCanvas.getContext('2d');
    paintInitialized = true;
    
    // Clear canvas with white
    paintCtx.fillStyle = 'white';
    paintCtx.fillRect(0, 0, paintCanvas.width, paintCanvas.height);
    
    // Set up event listeners
    setupPaintEventListeners();
}

function setupPaintEventListeners() {
    // Tool selection
    document.querySelectorAll('.paint-tool').forEach(tool => {
        tool.addEventListener('click', function() {
            document.querySelectorAll('.paint-tool').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentTool = this.dataset.tool;
            updateCanvasCursor();
        });
    });
    
    // Color selection
    document.querySelectorAll('.color-swatch').forEach(swatch => {
        swatch.addEventListener('click', function(e) {
            if (e.button === 0) { // Left click
                currentColor = this.dataset.color;
                document.getElementById('primary-color').style.background = currentColor;
            }
        });
        
        swatch.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            secondaryColor = this.dataset.color;
            document.getElementById('secondary-color').style.background = secondaryColor;
        });
    });
    
    // Brush size
    const brushSizeInput = document.getElementById('brush-size');
    const sizeDisplay = document.getElementById('size-display');
    if (brushSizeInput) {
        brushSizeInput.addEventListener('input', function() {
            brushSize = parseInt(this.value);
            sizeDisplay.textContent = brushSize;
        });
    }
    
    // Canvas drawing events
    paintCanvas.addEventListener('mousedown', startDrawing);
    paintCanvas.addEventListener('mousemove', draw);
    paintCanvas.addEventListener('mouseup', stopDrawing);
    paintCanvas.addEventListener('mouseout', stopDrawing);
    
    // Update coordinates
    paintCanvas.addEventListener('mousemove', function(e) {
        const rect = paintCanvas.getBoundingClientRect();
        const x = Math.floor(e.clientX - rect.left);
        const y = Math.floor(e.clientY - rect.top);
        const coordsDisplay = document.getElementById('paint-coords');
        if (coordsDisplay) {
            coordsDisplay.textContent = `${x}, ${y}`;
        }
    });
}

function updateCanvasCursor() {
    paintCanvas.className = '';
    switch(currentTool) {
        case 'pencil':
            paintCanvas.style.cursor = 'crosshair';
            break;
        case 'brush':
            paintCanvas.style.cursor = 'crosshair';
            break;
        case 'eraser':
            paintCanvas.classList.add('eraser-cursor');
            break;
        case 'fill':
            paintCanvas.classList.add('fill-cursor');
            break;
        case 'text':
            paintCanvas.style.cursor = 'text';
            break;
        default:
            paintCanvas.style.cursor = 'crosshair';
    }
}

function startDrawing(e) {
    const rect = paintCanvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
    lastX = startX;
    lastY = startY;
    
    if (currentTool === 'fill') {
        floodFill(Math.floor(startX), Math.floor(startY), currentColor);
        return;
    }
    
    if (currentTool === 'text') {
        const text = prompt('Enter text:');
        if (text) {
            paintCtx.fillStyle = currentColor;
            paintCtx.font = `${brushSize * 8}px Tahoma`;
            paintCtx.fillText(text, startX, startY);
        }
        return;
    }
    
    isDrawing = true;
    
    // Draw initial point for pencil/brush
    if (currentTool === 'pencil' || currentTool === 'brush') {
        paintCtx.beginPath();
        paintCtx.arc(startX, startY, brushSize / 2, 0, Math.PI * 2);
        paintCtx.fillStyle = currentColor;
        paintCtx.fill();
    }
}

function draw(e) {
    if (!isDrawing) return;
    
    const rect = paintCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    paintCtx.lineWidth = brushSize;
    paintCtx.lineCap = 'round';
    paintCtx.lineJoin = 'round';
    
    switch(currentTool) {
        case 'pencil':
        case 'brush':
            paintCtx.strokeStyle = currentColor;
            paintCtx.beginPath();
            paintCtx.moveTo(lastX, lastY);
            paintCtx.lineTo(x, y);
            paintCtx.stroke();
            break;
            
        case 'eraser':
            paintCtx.globalCompositeOperation = 'destination-out';
            paintCtx.beginPath();
            paintCtx.moveTo(lastX, lastY);
            paintCtx.lineTo(x, y);
            paintCtx.stroke();
            paintCtx.globalCompositeOperation = 'source-over';
            break;
            
        case 'line':
            // Clear and redraw for preview
            redrawCanvas();
            paintCtx.strokeStyle = currentColor;
            paintCtx.beginPath();
            paintCtx.moveTo(startX, startY);
            paintCtx.lineTo(x, y);
            paintCtx.stroke();
            break;
            
        case 'rect':
            redrawCanvas();
            paintCtx.strokeStyle = currentColor;
            paintCtx.strokeRect(startX, startY, x - startX, y - startY);
            break;
            
        case 'circle':
            redrawCanvas();
            const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
            paintCtx.strokeStyle = currentColor;
            paintCtx.beginPath();
            paintCtx.arc(startX, startY, radius, 0, Math.PI * 2);
            paintCtx.stroke();
            break;
    }
    
    lastX = x;
    lastY = y;
}

function stopDrawing() {
    if (!isDrawing) return;
    isDrawing = false;
    
    // Save canvas state for shape tools
    if (currentTool === 'line' || currentTool === 'rect' || currentTool === 'circle') {
        saveCanvasState();
    }
}

// Canvas state for undo/redo functionality
let canvasState = null;

function saveCanvasState() {
    canvasState = paintCtx.getImageData(0, 0, paintCanvas.width, paintCanvas.height);
}

function redrawCanvas() {
    if (canvasState) {
        paintCtx.putImageData(canvasState, 0, 0);
    }
}

// Flood fill algorithm
function floodFill(startX, startY, fillColor) {
    const imageData = paintCtx.getImageData(0, 0, paintCanvas.width, paintCanvas.height);
    const data = imageData.data;
    const targetColor = getPixelColor(data, startX, startY, paintCanvas.width);
    const fillRGB = hexToRgb(fillColor);
    
    if (colorsMatch(targetColor, fillRGB)) return;
    
    const pixelsToCheck = [[startX, startY]];
    const width = paintCanvas.width;
    const height = paintCanvas.height;
    
    while (pixelsToCheck.length > 0) {
        const [x, y] = pixelsToCheck.pop();
        
        if (x < 0 || x >= width || y < 0 || y >= height) continue;
        
        const currentColor = getPixelColor(data, x, y, width);
        if (!colorsMatch(currentColor, targetColor)) continue;
        
        setPixelColor(data, x, y, width, fillRGB);
        
        pixelsToCheck.push([x + 1, y]);
        pixelsToCheck.push([x - 1, y]);
        pixelsToCheck.push([x, y + 1]);
        pixelsToCheck.push([x, y - 1]);
    }
    
    paintCtx.putImageData(imageData, 0, 0);
}

function getPixelColor(data, x, y, width) {
    const index = (y * width + x) * 4;
    return {
        r: data[index],
        g: data[index + 1],
        b: data[index + 2],
        a: data[index + 3]
    };
}

function setPixelColor(data, x, y, width, color) {
    const index = (y * width + x) * 4;
    data[index] = color.r;
    data[index + 1] = color.g;
    data[index + 2] = color.b;
    data[index + 3] = 255;
}

function colorsMatch(c1, c2) {
    return c1.r === c2.r && c1.g === c2.g && c1.b === c2.b;
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}