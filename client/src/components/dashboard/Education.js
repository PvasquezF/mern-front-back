import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";

const Education = ({ education }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.school}</td>
      <td>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment>{" - "}
        {edu.to === null ? (
          " Now"
        ) : (
          <Moment format="YYY/MM/DD">{edu.to}</Moment>
        )}
      </td>
      <td>
        <button className="btn btn-danger">Eliminar</button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">Education credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th className="hide-sm">Action</th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
    education: PropTypes.array.isRequired,
};

export default connect()(Education);
