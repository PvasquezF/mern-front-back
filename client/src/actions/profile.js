import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROFILE, PROFILE_ERROR } from "./types";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    const errors = error?.response?.data?.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};
