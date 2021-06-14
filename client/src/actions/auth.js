import axios from "axios";
import { setAlert } from "./alert";

import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";

export const register = ({ name, email, password }) => {
  return async function (dispatch) {
    try {
      const config = {
        headers: {
          "Content-Type": "Application/json",
        },
      };
      const body = JSON.stringify({ name, email, password });
      const res = await axios.post("/api/users", body, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.data,
      });
    } catch (error) {
      const errors = error?.response?.data?.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
};
