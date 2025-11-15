// src/tasks/task.service.ts

import { Task, TaskStatus, CreateTaskDto, UpdateTaskDto } from "./task.model";

// "Base de datos" en memoria
const tasks: Task[] = [];
let currentId = 1; // contador simple para IDs

export class TaskService {
  getAll(): Task[] {
    return tasks;
  }

  getById(id: number): Task | undefined {
    return tasks.find((task) => task.id === id);
  }

  create(data: CreateTaskDto): Task {
    const newTask: Task = {
      id: currentId++,
      title: data.title,
      description: data.description,
      // Por defecto las tareas se crean en estado "todo"
      status: "todo",
    };

    tasks.push(newTask);
    return newTask;
  }

  update(id: number, data: UpdateTaskDto): Task | null {
    const task = this.getById(id);
    if (!task) {
      return null;
    }

    if (data.title !== undefined) {
      task.title = data.title;
    }

    if (data.description !== undefined) {
      task.description = data.description;
    }

    if (data.status !== undefined) {
      task.status = data.status;
    }

    return task;
  }

  delete(id: number): boolean {
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      return false;
    }
    tasks.splice(index, 1);
    return true;
  }

  // Validar que el estado sea uno de los permitidos
  isValidStatus(status: string): status is TaskStatus {
    return status === "todo" || status === "doing" || status === "done";
  }
}

// Exportamos una única instancia del servicio
export const taskService = new TaskService();
