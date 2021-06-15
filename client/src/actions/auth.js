import axios from "axios";
import { setAlert } from "./alert";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
} from "./types";

import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => {
  return async function (dispatch) {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get("/api/auth");
      dispatch({
        type: USER_LOADED,
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };
};

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
      dispatch(loadUser());
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

export const login = (email, password) => {
  return async function (dispatch) {
    try {
      const config = {
        headers: {
          "Content-Type": "Application/json",
        },
      };
      const body = JSON.stringify({ email, password });
      const res = await axios.post("/api/auth", body, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.data,
      });
      dispatch(loadUser());
    } catch (error) {
      const errors = error?.response?.data?.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error, "danger")));
      }
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };
};