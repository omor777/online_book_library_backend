import express, { Request, Response } from "express";
import applyMiddleware from "./middleware";


// express app
const app = express();
applyMiddleware(app)

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    health: "OK",
  });
});


export default app