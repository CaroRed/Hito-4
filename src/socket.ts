import { Server, Socket } from "socket.io";
import jwt, { JwtPayload } from "jsonwebtoken";

interface User {
    id: string;
    username: string;
    joinedAt: Date;
}

const connectedUsers: { [key: string]: User } = {};

const handleError = (socket: Socket, event: string, error: unknown) => {
    const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

    console.log(`Error in event ${event}: ${errorMessage}`);
    socket.emit("error", {
        event,
        message: errorMessage,
    });
};

declare module "socket.io" {
    interface Socket {
        user?: JwtPayload;
    }
}

const secret = process.env.AUTH_SECRET;
if (!secret) {
    throw new Error("secret must be provided");
}

const configureSocket = (io: Server) => {
    const chat = io.of("/chat");

    // Middleware de autenticación
    chat.use((socket: Socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error("Authentication error"));
        }

        try {
            const decoded = jwt.verify(token, secret) as JwtPayload;
            socket.user = decoded;
            next();
        } catch (error) {
            handleError(socket, "authentication", error);
            next(new Error("Authentication error"));
        }
    });

    chat.on("connection", (socket) => {
        try {
            if (!socket.user || !socket.user.email) {
                throw new Error("User not authenticated");
            }

            // Guardar usuario en la lista de conectados
            connectedUsers[socket.id] = {
                id: socket.id,
                username: socket.user.email,
                joinedAt: new Date(),
            };

            console.log(`User ${socket.user.email} connected`);

            // Enviar lista de usuarios a todos los clientes
            chat.emit("users", Object.values(connectedUsers));

            socket.on("joinRoom", (room) => {
                socket.join(room);
                console.log(`${socket.user?.email} joined room: ${room}`);
            });

            socket.on("sendMessage", (data: { room: string; message: string }) => {
                chat.to(data.room).emit("receiveMessage", {
                    username: socket.user?.email,
                    message: data.message,
                });
            });

            socket.on("disconnect", () => {
                console.log(`User ${socket.user?.email} disconnected`);
                delete connectedUsers[socket.id];
                chat.emit("users", Object.values(connectedUsers));
            });
        } catch (error) {
            handleError(socket, "connection", error);
        }
    });
};

export default configureSocket;
