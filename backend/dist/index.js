import express from "express";
import { WebSocket, WebSocketServer } from "ws";
const WS_PORT = 8080;
const wss = new WebSocketServer({ port: WS_PORT });
wss.on("listening", () => {
    console.log(`WebSocket server running on port: ${WS_PORT}`);
});
wss.on("connection", (ws) => {
    ws.on("error", (error) => {
        console.error(error);
    });
    ws.on("message", (data) => {
        //@ts-ignore
        let jsonData = JSON.parse(data);
        wss.clients.forEach((client) => {
            client.send(JSON.stringify(jsonData));
        });
    });
});
const app = express();
const EXPRESS_PORT = 3000;
app.listen(EXPRESS_PORT, () => {
    console.log(`Express server running on ${EXPRESS_PORT}`);
});
//# sourceMappingURL=index.js.map