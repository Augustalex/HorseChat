const clientId = `${Math.round(Math.random() * 9999)}`;

export default function () {
    let socket = io();
    socket.on('connect', () => {
        getInput()
            .addEventListener('keypress', createInputKeydownHandler(socket));

        socket.on('message', ({ message, clientId: otherClient }) => {
            addMessage(message, otherClient);
        });
    });
}

function createInputKeydownHandler(socket) {
    return async keydownEvent => {
        if (keydownEvent.key === 'Enter') {
            let message = clearInput();
            socket.emit('message', { message, clientId });
            addMessage(message, 'You');
        }
    };
}

function clearInput() {
    let input = getInput();
    let value = input.value;
    input.value = '';
    return value;
}

function addMessage(message, clientId) {
    let chat = getChat();
    let pre = document.createElement('pre');
    pre.innerHTML = clientId + ': ' + message;
    chat.appendChild(pre);
}

function getInput() {
    return document.querySelector('#input');
}

function getChat() {
    return document.querySelector('#chat');
}