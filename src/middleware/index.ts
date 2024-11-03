import express from "express";
import cors from "cors";
const cookieParser = require("cookie-parser");

import routes from "../routes";
const swaggerUI = require("swagger-ui-express");

const YAML = require("yamljs");
const swaggerDoc = YAML.load("./swagger.yaml");

const applyMiddleware = (app: any) => {
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
  app.use(routes);
};

export default applyMiddleware;
