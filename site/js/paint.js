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