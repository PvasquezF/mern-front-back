const error = (error, req, res, next) => {
  if (!error.errors) {
    error.errors = [error.message];
    error.status = 500;
  }

  return res.status(error.status || 500).json({
    result: false,
    errors: error.errors,
  });
};

module.exports = error;
