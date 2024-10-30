import express, { NextFunction, Request, Response } from "express";
import applyMiddleware from "./middleware";

// express app
const app = express();
applyMiddleware(app);

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    health: "OK",
  });
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
 
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

export default app;
