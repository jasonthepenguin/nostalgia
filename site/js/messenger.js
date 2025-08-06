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