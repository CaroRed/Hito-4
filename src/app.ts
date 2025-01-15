import "dotenv/config";
import express from 'express';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.config";

import userRoute from './routes/user.route';
import authRoute from './routes/auth.route';
import bookRoute from "./routes/book.route";

const app = express()

app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/books", bookRoute);

export default app;