import { badRequest } from "../../utils/error";
import { generateHash, hashMatched } from "../../utils/hashing";
import { generateToken } from "../token";
import { createUser, findUserByEmail, userExist } from "../user";

type Register = {
  username: string;
  email: string;
  password: string;
};
const register = async ({ username, email, password }: Register) => {
  const hasUser = await userExist(email);
  if (hasUser) {
    throw badRequest("User already exists");
  }

  password = await generateHash(password);

  const user = await createUser({
    username,
    email,
    password,
  });
  return user;
};

type Login = {
  email: string;
  password: string;
};
const login = async ({ email, password }: Login) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw badRequest("Invalid Credentials");
  }
  const matched = await hashMatched(password, user.password);
  if (!matched) {
    throw badRequest("Invalid Credentials");
  }

  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  };

  return generateToken({ payload });
};

export const services = { register, login };
