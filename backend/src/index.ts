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
        const messageType =  jsonData.type;
        console.log(messageType);
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
        console.log("code reached here");
        wss.clients.forEach(client => {
            //@ts-ignore
            if (client.roomNumber === socket.roomNumber) {
                    client.send(JSON.stringify({message: `${socket.username} has left the server.`}));
                }
        })
    })
})

wss.on("listening", () => {
    console.log("Web Socket server listening on port 8080");
}) 


//Whats the next problem? You want to seperate the connections by rooms. how?