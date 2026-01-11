import { v4 } from "uuid";
import { WebSocket, WebSocketServer } from "ws";
import dotenv from "dotenv";
import http from "http";

interface WebSocketWithId extends WebSocket {
    id: string;
    username:string;
    roomNumber: number;
}

dotenv.config();
const PORT = process.env.PORT || 3000;

const server = http.createServer();

const wss = new WebSocketServer({ server });

wss.on("connection" , (socket: WebSocketWithId) => {
    socket.id = v4();
    socket.on("message", (data) => {
        const jsonData = JSON.parse(data.toString());
        const messageType =  jsonData.type;
        if (messageType === "join") {
            socket.username = jsonData.username;
            socket.roomNumber = jsonData.roomNumber;
            wss.clients.forEach((client) => {
                //@ts-ignore
                if (client.roomNumber === socket.roomNumber) {
                    //@ts-ignore
                    socket.id === client.id ? client.send(JSON.stringify({"message" : `You have joined the server` })) : client.send(JSON.stringify({"message": `${socket.username} has joined the server`}));
                }
            })
        } else if (messageType === "message") {
            wss.clients.forEach((client) => {
                //@ts-ignore
                if (client.roomNumber === socket.roomNumber) {
                    //@ts-ignore
                    socket.id === client.id ? client.send(JSON.stringify({"username": "You", "message": jsonData.message})) : client.send(JSON.stringify({"username": socket.username, "message": jsonData.message}))
                }
            })
        } 
    })
    socket.on("close", () => {
        wss.clients.forEach(client => {
            //@ts-ignore
            if (client.roomNumber === socket.roomNumber) {
                    client.send(JSON.stringify({message: `${socket.username} has left the server.`}));
                }
        })
    })
})

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})


//Whats the next problem? You want to seperate the connections by rooms. how?