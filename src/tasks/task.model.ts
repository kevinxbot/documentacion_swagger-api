// src/tasks/task.model.ts

// Estados permitidos para una tarea
export type TaskStatus = "todo" | "doing" | "done";

// Estructura de una tarea
export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
}

// Datos necesarios para crear una tarea
export interface CreateTaskDto {
  title: string;
  description?: string;
}

// Datos permitidos para actualizar una tarea
export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
}
