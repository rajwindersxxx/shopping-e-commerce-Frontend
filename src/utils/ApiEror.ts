export class ApiError extends Error {
  code: string | number;
  constructor(message: string, code: string | number) {
    super(message);
    this.name = "ApiError";
    this.code = code;
  }
}
