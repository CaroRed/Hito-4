import "dotenv/config";
import express from 'express';

import userRoute from './routes/user.route';
import authRoute from './routes/auth.route';

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);

export default app;