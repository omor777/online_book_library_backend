import { Request, Response, NextFunction } from "express";

import { generateToken } from "../../../../lib/token";

import { services as authService } from "../../../../lib/auth";

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  try {
    const user = await authService.register({ username, email, password });

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateToken({ payload });

    const response = {
      message: "Signup Successful",
      data: {
        access_token: accessToken,
      },
      links: {
        self: req.url,
        signin: "/login",
      },
    };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export default register;
