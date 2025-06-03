import { WebSocketServer } from 'ws';
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from './config';

const wss = new WebSocketServer({port: 8080});

wss.on('connection', function connection(socket, request){
   const url = request.url;

   if(!url){
    return;
   }

   const qyeryParams = new URLSearchParams(url.split('?')[1]);
   const token = qyeryParams.get('token')

   if(!token) return

   const decode = jwt.verify(token, JWT_SECRET)

   if(!decode || !(decode as JwtPayload).userId){
    wss.close();
    return
   }

    socket.on('message', function message(data){
        socket.send('pong')
    })
})