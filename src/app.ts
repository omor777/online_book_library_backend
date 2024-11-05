import express, { Application, NextFunction, Request, Response } from "express";
import applyMiddleware from "./middleware";
import { z } from "zod";
import mongoose from "mongoose";

// express app
const app: Application = express();
applyMiddleware(app);

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    health: "OK",
  });
});

const d = undefined

console.log(`${d}`);


// const restRouter = express.Router();
// app.use("/api/v1/generic", restRouter);
// restRouter.get("/test/one/two", (req: Request, res: Response) => {
//   req.signedCookies.name = "omor";
//   console.log(
//     "============================================separator============================================"
//   );
//   console.log(req.xhr);

//   console.log(
//     "============================================separator============================================"
//   );
//   res.send();
// });

// const d = z.object({
//   id: z.string().refine(
//     (v) => mongoose.Types.ObjectId.isValid(v),
//     (v) => ({ message: `[${v}] is not a valid mongodb id` })
//   ),
// });

// const res = d.safeParse({
//   id: "5c0a7922c9d89830f491142t",
// });
// console.log(res.error);

// enum Fruits {
//   Apple = "apple",
//   Orange = "orange",
//   Banana = "banana",
// }

// const Food = {
//   a: "one",
//   b: "two",
// } as const;

// const fruitEnum = z.nativeEnum(Food);

// type FruitEnum = z.infer<typeof fruitEnum>;

// console.log(fruitEnum.safeParse("three"));

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.statusCode || 500).json({
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
  });
});

export default app;
