import { Server } from "socket.io";

// Función que recibe la instancia de `io` y maneja la lógica de los sockets
const configureSocket = (io: Server) => {
    const chat = io.of("/chat");  // Crear el namespace "/chat"

    chat.on("connection", (socket) => {
        console.log("New connection", socket.id);

        // Unirse a una sala
        socket.on("joinRoom", (room: string) => {
            socket.join(room);
            console.log(`User ${socket.id} joined room ${room}`);
        });

        // Enviar un mensaje a una sala
        socket.on("sendMessage", (data: { room: string, message: string }) => {
            console.log(`Message to room ${data.room}: ${data.message}`);
            chat.to(data.room).emit("receiveMessage", data.message);
        });

        // Desconexión del socket
        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
};

export default configureSocket;
