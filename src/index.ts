import "dotenv/config";
import app from "./app";  // Importa el archivo de configuración de Express
import { sequelize } from "./config/sequelize";
import { Server } from "socket.io";
import http from "node:http";
import configureSocket from "./socket";  // Importa la configuración de Socket.IO

const port = process.env.PORT || 3000;

const server = http.createServer(app);  // Crea el servidor HTTP a partir de Express
const io = new Server(server, {
    cors: {
        origin: "*",  // Permitir todas las conexiones
    },
});

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        console.log("Database connected");

        // Pasar la instancia de `io` a socket.ts
        configureSocket(io);

        // Iniciar el servidor HTTP con Socket.IO
        server.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
    } catch (error) {
        console.log(error);
    }
})();
