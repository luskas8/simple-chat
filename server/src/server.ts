import express from 'express';
import http from 'http';
import socket, { Socket } from 'socket.io';
import roomController from './controllers/RoomController';

const RoomController = new roomController();
const app = express();
const server = http.createServer(app);
const io = socket(server);

interface Messege {
    id: string;
    messege_id: string;
    messege: string;
}

// When a client connect on the server its called
io.on('connection', socket => {
    // messege confirming the success connection
    console.log('[IO] Connection => Nem connection.')

    // When the client send the messege-obj to server proccess its called
    socket.on('chat.messege', RoomController.messege);

    // Disconnection warning
    socket.on('disconnect', () => {
        console.log('[IO] Disconnect => Success disconnection.');
    })
});

export function sendMessege(messege: Messege) {
    io.emit('chat.messege.sent', messege)
}

// Control const for server HOST and PORT
const SERVER_HOST = 'localhost';
const SERVER_PORT = 3333;

server.listen(SERVER_PORT, SERVER_HOST, () => {
    // Server start proccess, with a self shortcut
    console.log(`[HTTP] Listen on http://${SERVER_HOST}:${SERVER_PORT}.`);
    console.log('[HTTP] Click CTRL + C to stop it')
});