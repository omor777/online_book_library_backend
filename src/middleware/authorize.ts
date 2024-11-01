import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/token";
import { authenticationError, forbiddenError } from "../utils/error";
import { string } from "zod";

const authorize =
  (permission: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    if (!token) {
      throw authenticationError();
    }
    token = token.split(" ")[1];
    try {
      const loggedInUser = await verifyToken({
        token,
      });
      if (!permission.includes(loggedInUser.role)) {
        throw forbiddenError();
      }
      next();
    } catch (e) {
      next(e);
    }
  };

export default authorize;
