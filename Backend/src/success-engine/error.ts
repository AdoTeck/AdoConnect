export class CustomError extends Error {
  public statusCode: number;
  public errors?: any;
  public code: string;

  constructor(
    statusCode: number,
    message: string,
    code: string = "ERROR",
    errors?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.errors = errors;
    Object.setPrototypeOf(this, new.target.prototype); // Restore prototype chain
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string = "Bad Request", errors?: any) {
    super(400, message, "BAD_REQUEST", errors);
  }
}

export class ValidationError extends CustomError {
  constructor(errors: any) {
    super(400, "Validation Error", "VALIDATION_ERROR", errors);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string = "Unauthorized") {
    super(401, message, "UNAUTHORIZED");
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string = "Not Found") {
    super(404, message, "NOT_FOUND");
  }
}

export class InternalServerError extends CustomError {
  constructor(message: string = "Internal Server Error", errors?: any) {
    super(500, message, "INTERNAL_SERVER_ERROR", errors);
  }
}
