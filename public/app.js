const socket = io("/chat");  // Conectarse al namespace "/chat"

socket.on("connect", () => {
    console.log("✅ Connected to server");
});

// Unirse a una sala
socket.emit("joinRoom", "room1");

// Enviar un mensaje a la sala
socket.emit("sendMessage", { room: "room1", message: "Hola desde el cliente" });

// Recibir mensajes de la sala
socket.on("receiveMessage", (message) => {
    console.log("Received message:", message);
});
