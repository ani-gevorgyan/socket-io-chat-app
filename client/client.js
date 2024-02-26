const io = require("socket.io-client");
const socket = io("http://localhost:4000", {
    auth: {
        token: process.argv[2] + ' ' + process.argv[3]
    }
});
const readline = require("readline");
let room = 0;

let username = null;
console.log("Connecting to the server...");

socket.on('connect', () => {
    console.log("[INFO]: Welcome to the chat app!");
});

socket.on('disconnect', (data) => {
    console.log("[INFO]: Client disconnected, reason: %s", data);
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    let chatroomId;
    if (input.includes('joinRoom')) {
        chatroomId = input.split(' ')[1];
        socket.emit('joinRoom', { chatroomId });
        room = chatroomId;
    }

    if (room && input.includes('chatroomMessage')) {
        const index = input.indexOf(' ');
        const message = input.substring(index + 1);
        socket.emit('chatroomMessage', { chatroomId: room, message });
    }

    if (input.includes('leaveRoom')) {
        socket.emit('leaveRoom', { chatroomId: room });
        room = 0;
    }
});

socket.on('join', (data) => {
    console.log("[INFO]: %s has joined the chatroom: %s", data.user.username, data.chatRoom.name);
});

socket.on('newMessage', (data) => {
    console.log('[%s]: %s', data.name, data.message);
});

socket.on('left', (data) => {
    console.log("[INFO]: %s has left the chatroom: %s", data.name, data.chatroomId);
})

