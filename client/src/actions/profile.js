import axios from "axios";
import { setAlert } from "./alert";
import {
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  GET_REPOS
} from "./types";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data.data,
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

export const getProfiles = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  try {
    const res = await axios.get("/api/profile");
    dispatch({
      type: GET_PROFILES,
      payload: res.data.data,
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

export const getProfileById = (userid) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userid}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data.data,
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

export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data.data,
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

export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };
    const res = await axios.put(
      "/api/profile/experience",
      { experience: [formData] },
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.data,
    });
    dispatch(setAlert("Experiencia agregada", "success"));

    history.push("/dashboard");
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

export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };
    const res = await axios.put(
      "/api/profile/education",
      { education: [formData] },
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.data,
    });
    dispatch(setAlert("Educacion agregada", "success"));

    history.push("/dashboard");
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

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.data,
    });
    dispatch(setAlert("Experiencia eliminada", "success"));
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

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "Application/json",
      },
    };
    const res = await axios.delete(`/api/profile/education/${id}`, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.data,
    });
    dispatch(setAlert("Educacion eliminada", "success"));
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

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm(`Estas seguro? Esta accion no se puede deshacer.`)) {
    try {
      await axios.delete(`/api/profile`);
      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: ACCOUNT_DELETED,
      });
      dispatch(setAlert("Cuenta eliminada"));
    } catch (error) {
      const errors = error?.response?.data?.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
      });
    }
  }
};
