import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({port: 8080});

wss.on('connection', function connection(socket){
   
    socket.on('message', function message(data){
        socket.send('pong')
    })
})