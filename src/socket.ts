import { Server } from "socket.io";

interface User {
    id: string,
    username: string,
    joinedAt: Date;
}
const connectedUsers: { [key: string]: User } = {};

const configureSocket = (io: Server) => {
    const chat = io.of("/chat");  // Crear el namespace "/chat"

    chat.on("connection", (socket) => {

        // conectar a usuario
        socket.on("join", (username: string) => {
            connectedUsers[socket.id] = {
                id: socket.id,
                username: username,
                joinedAt: new Date()
            }
            console.log(`User ${connectedUsers[socket.id].username} joined `);

            //broadcast a todos los usuarios
            chat.emit("users", Object.values(connectedUsers));
        });

        // Enviar un mensaje a una sala
        socket.on("sendMessage", (data: { room: string, message: string }) => {
            console.log(`Message to room ${data.room}: ${data.message}`);
            chat.to(data.room).emit("receiveMessage", data.message);
        });

        // Desconexión del socket
        socket.on("disconnect", () => {
            delete connectedUsers[socket.id];
            console.log(`User ${socket.id} disconnected`);

            // Broadcast a todos los usuarios conectados
            chat.emit("users", Object.values(connectedUsers));
        });
    });
};

export default configureSocket;
