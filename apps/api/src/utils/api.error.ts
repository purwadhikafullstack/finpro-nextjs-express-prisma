export default class ApiError extends Error {
  status: number;
  message: string;
  errors: Array<any>;

  constructor(status: number, message: string = 'Something went wrong', errors: Array<any> = []) {
    super(message);
    this.status = status;
    this.message = message;
    this.errors = errors;
  }
}
