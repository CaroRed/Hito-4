import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.config";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import userRoute from './routes/user.route';
import authRoute from './routes/auth.route';
import bookRoute from "./routes/book.route";

const app = express();

// Configuración de middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());

// Ruta para la documentación de la API
app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/books", bookRoute);

// Archivos estáticos
app.use(express.static("public"));

export default app;
