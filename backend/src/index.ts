import { v4 } from "uuid";
import { WebSocket, WebSocketServer } from "ws";

interface WebSocketWithId extends WebSocket {
    id: string;
    username:string;
    roomNumber: number;
}

const wss = new WebSocketServer({port: 8080});

wss.on("connection" , (socket: WebSocketWithId) => {
    socket.id = v4();
    socket.on("message", (data) => {
        const jsonData = JSON.parse(data.toString());
        if (jsonData.username && jsonData.roomNo) {
            socket.username = jsonData.username;
            socket.roomNumber = Number(jsonData.roomNo);
            wss.clients.forEach((client) => {
                //@ts-ignore
                if (client.roomNumber === socket.roomNumber) {
                    //@ts-ignore
                    socket.id === client.id ? client.send(JSON.stringify({"username": "You have joined the server"})) : client.send(JSON.stringify({"username": `${socket.username} has joined the server`}));
                }
            })
        } else {
            wss.clients.forEach(client => {
                //@ts-ignore
                if (client.roomNumber === socket.roomNumber) {
                    //@ts-ignore
                    socket.id === client.id ? client.send(JSON.stringify({"username": "You", "message": jsonData.message})) : client.send(JSON.stringify({"username": socket.username, "message": jsonData.message}));
                }
            })
        }
            
    })
})

wss.on("listening", () => {
    console.log("Web Socket server listening on port 8080");
}) 


//Whats the next problem? You want to seperate the connections by rooms. how?