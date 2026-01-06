import { WebSocket, WebSocketServer } from "ws";

const WS_PORT = 8080;

const wss: WebSocketServer = new WebSocketServer({ port: WS_PORT });
wss.on("listening", () => {
  console.log(`WebSocket server running on port: ${WS_PORT}`);
});

wss.on("connection", (ws: WebSocket) => {
  ws.on("error", (error) => {
    console.error(error);
  });

  ws.on("message", (data) => {
    //@ts-ignore
    let jsonData = JSON.parse(data);

    wss.clients.forEach((client) => {
      client.send(JSON.stringify(jsonData));
    })
  });
});

