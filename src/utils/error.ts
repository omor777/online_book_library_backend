class CustomError extends Error {
  status: number;
  constructor(msg: string, status: number) {
    super(msg);
    this.status = status;
  }
}

const badRequest = (msg: string = "Bad Request") => {
  const error = new CustomError(msg, 400);
  return error;
};

const notFound = (msg: string = "Resource not found") => {
  const error = new CustomError(msg, 404);
  return error;
};

const serverError = (msg: string = "Internal Server Error") => {
  const error = new CustomError(msg, 500);
  return error;
};

const authenticationError = (msg: string = "Authentication Failed") => {
  const error = new CustomError(msg, 401);
  return error;
};

export { badRequest, notFound, serverError, authenticationError };
