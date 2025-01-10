import express from "express";
import { json } from "body-parser";
import cors from "cors";
import { authRoutes } from "../api/auth/auth.routes";
import { errorMiddleware } from "../middlewares/error.middleware";

const app = express();

app.use(json());
app.use(cors());
// Routes
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use(errorMiddleware as express.ErrorRequestHandler);

export default app;
