import SERVER_ERRORS from "./server-errors.config";

export const SERVER_PORT = process.env.PORT || 3001;
export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/vehicle_management";
export class ServerResponse {
  statusCode: number;
  message: string;
  data: any;
  constructor(status_code: number, message: string, data: any) {
    this.statusCode = status_code;
    this.message = message;
    this.data = data;
  }
}
class ServerError {
  server_code: number;

  constructor(server_code: number) {
    this.server_code = server_code;
  }
}
export class ErrorResponse {
  statusCode: number;
  message: string;
  error: ServerError;
  constructor(status_code: number, message: string, server_code: number) {
    this.statusCode = status_code;
    this.message = message;
    this.error = new ServerError(server_code);
  }
}
export const getErrorResponse = (error: any):ErrorResponse => {
  const statusCode = (error as ErrorResponse).statusCode || 500;
  const responseError: ErrorResponse =
    statusCode === 500
      ? new ErrorResponse(statusCode, "Server error", SERVER_ERRORS.SERVER_ERROR)
      : (error as ErrorResponse);
    return responseError
};
