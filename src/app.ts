// src/app.ts

import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger.config";
import taskRoutes from "./tasks/task.routes";

const app = express();

// Middleware para leer JSON
app.use(express.json());

// Ruta de Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas de tareas
app.use("/tasks", taskRoutes);

// Ruta simple para verificar que el servidor responde
app.get("/", (req, res) => {
  res.send("Task API is running. Go to /api-docs for Swagger UI.");
});

export default app;
