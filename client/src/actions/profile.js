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

export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "Application/json",
        },
      };
      const res = await axios.post("/api/profile", formData, config);
      dispatch({
        type: GET_PROFILE,
        payload: res.data.data,
      });
      dispatch(
        setAlert(edit ? "Perfil actualizado" : "Perfil creado", "success")
      );

      if (!edit) {
        history.push("/dashboard");
      }
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
