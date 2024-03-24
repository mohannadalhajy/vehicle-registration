import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from "express";
import path from "path";
import { schemas } from "./components/schemas/schmas";
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API",
      version: "1.0.0",
      description: "Documentation of your API",
    },
    servers: [
      {
        url: "http://localhost:3001/api",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Path to the API files
};

const specs = swaggerJsdoc(options);

export default (app: express.Application) => {
  app.get("/api-docs/components/schemas/:fileName", (req, res) => {
    let fileName: string = req.params.fileName as string;
    // if(fileName) fileName = fileName.slice(0, -5)
    const response = schemas[fileName] || {};
    res.send(response);
  });
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
