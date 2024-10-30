import { Request, Response, NextFunction } from "express";
import { services as authService } from "../../../../lib/auth";
const login = async (req: Request, res: Response, next: NextFunction) => {
  // get request body
  const { email, password } = req.body;

  try {
    // find user by email in database
    const accessToken = await authService.login({ email, password });

    const response = {
      message: "Login successful",
      data: {
        access_token: accessToken,
      },
      links: {
        self: req.url,
      },
    };

    res.status(200).json(response);
    // if user not exist throw invalid credentials
    // if user exist check password
    // if password not match throw error
    // if all ok generate access token
    // response back
  } catch (e) {
    next(e);
  }
};

export default login;
