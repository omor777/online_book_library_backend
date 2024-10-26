import express from "express";
const swaggerUI = require("swagger-ui-express");

const YAML = require("yamljs");
const swaggerDoc = YAML.load("./swagger.yaml");

const applyMiddleware = (app: any) => {
  app.use(express.json());
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
};

export default applyMiddleware;
