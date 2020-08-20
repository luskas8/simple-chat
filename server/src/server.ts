import express from 'express';
import http from 'http';
import socket from 'socket.io';
import cripto from 'crypto';

const app = express();
const server = http.createServer(app);
const io = socket(server);

const SERVER_HOST = 'localhost';
const SERVER_PORT = 3333;

let messeges = [{ author: '', messegeId: '', messege: '' }];

io.on('connection', socket => {
    console.log('[IO] Connection => Nem connection.')
    socket.on('chat.messege', data => {
        console.log('[SOCKET] Char.messege: ', data);
        messeges.push(data);
        messeges[messeges.length - 1].messegeId = cripto.randomBytes(4).toString("hex");
        io.emit('chat.messege.sent', messeges[messeges.length - 1]);
    });

    socket.on('disconnect', () => {
        console.log('[IO] Disconnect => Success disconnection.');
    })
});

server.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`[HTTP] Listen on http://${SERVER_HOST}:${SERVER_PORT}.`);
    console.log('[HTTP] Click CTRL + C to stop it')
});