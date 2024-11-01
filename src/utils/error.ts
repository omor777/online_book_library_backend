class CustomError extends Error {
  statusCode: number;
  constructor(msg: string, statusCode: number) {
    super(msg);
    this.statusCode = statusCode;
  }
}

const badRequest = (msg: string = "Bad Request") => {
  return new CustomError(msg, 400);
};

const notFound = (msg: string = "Resource not found") => {
  return new CustomError(msg, 404);
};

const serverError = (msg: string = "Internal Server Error") => {
  const error = new CustomError(msg, 500);
  return error;
};

const authenticationError = (msg: string = "Authentication Failed") => {
  const error = new CustomError(msg, 401);
  return error;
};

const forbiddenError = (msg: string = "Forbidden access!") => {
  return new CustomError(msg, 403);
};

export {
  badRequest,
  notFound,
  serverError,
  authenticationError,
  forbiddenError,
};
