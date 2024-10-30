import { Request, Response, NextFunction } from "express";
import { authenticationError } from "../utils/error";
import { verifyToken } from "../lib/token";
const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      throw authenticationError();
    }
    token = token.split(" ")[1];
    const loggedInUser = await verifyToken({ token });
    req.user = loggedInUser;
    next();
  } catch (e) {
    next(e);
  }
};

export default authentication;
