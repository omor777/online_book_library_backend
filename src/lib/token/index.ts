import jwt from "jsonwebtoken";
import { serverError } from "../../utils/error";

type Token = {
  payload: any;
  algorithm?: string;
  expiresIn?: string;
  secret?: string;
};
const generateToken = ({
  payload,
  expiresIn = "1h",
  secret = process.env.ACCESS_TOKEN_SECRET as string,
}: Token) => {
  try {
    return jwt.sign(payload, secret, {
      expiresIn,
    });
  } catch (e) {
    console.log("[JWT]", e);
    throw serverError();
  }
};

const decodedToken = (token: string) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    console.log("[JWT]", error);
    throw serverError();
  }
};

const verifyToken = async ({
  token,
  secret = process.env.ACCESS_TOKEN_SECRET as string,
}: {
  token: string;
  secret: string;
}) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.log("[JWT]", error);
    throw serverError();
  }
};

export { generateToken, decodedToken, verifyToken };
