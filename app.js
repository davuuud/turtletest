const socket = new WebSocket("ws://172.20.191.225:8080");

// Listen for messages
socket.onmessage = ({ data }) => {
    console.log(JSON.stringify("Message from server ", data));
};

document.querySelector("button").onclick = () => {
    socket.send(JSON.stringify("hello"));
}