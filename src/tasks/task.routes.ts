// src/tasks/task.routes.ts

import express, { Request, Response } from "express";
import { taskService } from "./task.service";
import { CreateTaskDto, UpdateTaskDto } from "./task.model";

const router = express.Router();

// GET /tasks - listar todas las tareas
router.get("/", (req: Request, res: Response) => {
  const tasks = taskService.getAll();
  res.json(tasks);
});

// GET /tasks/:id - obtener una tarea por id
router.get("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  const task = taskService.getById(id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
});

// POST /tasks - crear una nueva tarea
router.post("/", (req: Request, res: Response) => {
  const body = req.body as CreateTaskDto;

  if (!body.title || body.title.trim() === "") {
    return res.status(400).json({ message: "Title is required" });
  }

  const newTask = taskService.create({
    title: body.title.trim(),
    description: body.description,
  });

  res.status(201).json(newTask);
});

// PUT /tasks/:id - actualizar una tarea completa/parcial
router.put("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  const body = req.body as UpdateTaskDto;

  // Si envía estado, validarlo
  if (body.status && !taskService.isValidStatus(body.status)) {
    return res.status(400).json({
      message: "Invalid status. Allowed values: todo, doing, done",
    });
  }

  const updatedTask = taskService.update(id, body);

  if (!updatedTask) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(updatedTask);
});

// DELETE /tasks/:id - eliminar una tarea
router.delete("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  const deleted = taskService.delete(id);

  if (!deleted) {
    return res.status(404).json({ message: "Task not found" });
  }

  // 204: sin contenido
  res.status(204).send();
});

export default router;
