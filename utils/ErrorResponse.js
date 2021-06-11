class ErrorResponse{
  constructor(errors, status) {
    this.errors = errors;
    this.status = status;
  }
}
module.exports = ErrorResponse;
