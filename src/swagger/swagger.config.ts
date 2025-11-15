// src/swagger/swagger.config.ts

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Task API",
    version: "1.0.0",
    description:
      "Simple API para gestionar tareas (todo, doing, done) usando Node, Express y TypeScript",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  paths: {
    "/tasks": {
      get: {
        summary: "Listar todas las tareas",
        responses: {
          200: {
            description: "Lista de tareas",
          },
        },
      },
      post: {
        summary: "Crear una nueva tarea (por defecto en estado todo)",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", example: "Learn TypeScript" },
                  description: {
                    type: "string",
                    example: "Read docs and practice",
                  },
                },
                required: ["title"],
              },
            },
          },
        },
        responses: {
          201: {
            description: "Tarea creada",
          },
          400: {
            description: "Datos inválidos",
          },
        },
      },
    },
    "/tasks/{id}": {
      get: {
        summary: "Obtener una tarea por id",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Tarea encontrada" },
          400: { description: "Id inválido" },
          404: { description: "Tarea no encontrada" },
        },
      },
      put: {
        summary: "Actualizar una tarea existente",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string", example: "New title" },
                  description: { type: "string", example: "New description" },
                  status: {
                    type: "string",
                    enum: ["todo", "doing", "done"],
                    example: "doing",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Tarea actualizada" },
          400: { description: "Datos inválidos" },
          404: { description: "Tarea no encontrada" },
        },
      },
      delete: {
        summary: "Eliminar una tarea",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          204: { description: "Tarea eliminada" },
          400: { description: "Id inválido" },
          404: { description: "Tarea no encontrada" },
        },
      },
    },
  },
};

export default swaggerDocument;
