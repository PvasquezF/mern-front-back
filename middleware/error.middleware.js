const error = (error, req, res, next) => {
  if (error.kind === "ObjectId" && error.name === "CastError") {
    error.errors = [`Error al procesar la peticion`];
    error.status = 400;
  } else if (error.kind === "ObjectId") {
    error.errors = [`No existe el recurso solicitado`];
    error.status = 404;
  } else if (!error.errors) {
    error.errors = [error.message];
    error.status = 500;
  }

  return res.status(error.status || 500).json({
    result: false,
    errors: error.errors,
  });
};

module.exports = error;
