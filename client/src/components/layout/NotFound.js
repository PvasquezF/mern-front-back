import React, { Fragment } from "react";
import PropTypes from "prop-types";

const NotFound = (props) => {
  return (
    <Fragment>
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle"></i>
        Pagina no encontrada
      </h1>
      <p className="large">Lo sentimos, la pagina solicitada no existe</p>
    </Fragment>
  );
};

NotFound.propTypes = {};

export default NotFound;
