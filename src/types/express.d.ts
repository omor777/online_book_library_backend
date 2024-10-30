import { Express } from "express-serve-static-core";

export interface TokenData {
  id: string;
  username: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

declare module "express-serve-static-core" {
  interface Request {
    user: TokenData;
  }
}
