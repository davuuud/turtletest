const ws = require("ws");
const url = require("url");

const WebsocketServer = (expressServer) => {
    const humanWSS = new ws.Server({
        noServer: true,
        path: "/",
    });
    
    const turtleWSS = new ws.Server({
        noServer: true,
        path: "/websockets",
    });

    expressServer.on("upgrade", (request, socket, head) => {
        const { pathname } = url.parse(request.url);

        if (pathname === "/") {
            humanWSS.handleUpgrade(request, socket, head, (websocket) => {
                humanWSS.emit("connection", websocket, request);
            });
        } else if (pathname === "/websockets") {
            turtleWSS.handleUpgrade(request, socket, head, (websocket) => {
                turtleWSS.emit("connection", websocket, request);
            });
        } else {
            socket.destroy();
        }
    });

    humanWSS.on("connection", function connection(websocketConnection, connectionRequest) {
        console.log("Irgendein Hirt ist jetzt a dabei")
        
        websocketConnection.on("message", (msg) => {
            console.log(msg.data);
            websocketConnection.send(msg)
            console.log(msg)
        });
    });

    turtleWSS.on("connection", function connection(websocketConnection, connectionRequest) {
        console.log("Irgendeine Turtle ist jetzt a dabei")
        
        websocketConnection.on("message", (msg) => {
            websocketConnection.send("Message received");
            const parsedMessage = JSON.parse(msg);
            console.log(parsedMessage);
            data = parsedMessage;
        });
    });
    
    return turtleWSS, humanWSS;
};

exports.WebsocketServer = WebsocketServer;