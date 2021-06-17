import axios from "axios";
import { setAlert } from "./alert";
import {
  DELETE_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./types";

export const getPosts = () => {
  return async function (dispatch) {
    try {
      const res = await axios.get("/api/post");
      dispatch({
        type: GET_POSTS,
        payload: res.data.data,
      });
    } catch (error) {
      const errors = error?.response?.data?.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error, "danger")));
      }
      dispatch({
        type: POST_ERROR,
      });
    }
  };
};

export const getPost = (id) => {
  return async function (dispatch) {
    try {
      const res = await axios.get(`/api/post/${id}`);
      dispatch({
        type: GET_POST,
        payload: res.data.data,
      });
    } catch (error) {
      const errors = error?.response?.data?.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error, "danger")));
      }
      dispatch({
        type: POST_ERROR,
      });
    }
  };
};

export const addLike = (postid) => {
  return async function (dispatch) {
    try {
      const res = await axios.put(`/api/post/like/${postid}`);
      dispatch({
        type: UPDATE_LIKES,
        payload: { postid, likes: res.data.data.likes },
      });
    } catch (error) {
      const errors = error?.response?.data?.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error, "danger")));
      }
      dispatch({
        type: POST_ERROR,
      });
    }
  };
};

export const removeLike = (postid) => {
  return async function (dispatch) {
    try {
      const res = await axios.put(`/api/post/dislike/${postid}`);
      dispatch({
        type: UPDATE_LIKES,
        payload: { postid, likes: res.data.data.likes },
      });
    } catch (error) {
      const errors = error?.response?.data?.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error, "danger")));
      }
      dispatch({
        type: POST_ERROR,
      });
    }
  };
};

export const deletePost = (postid) => {
  return async function (dispatch) {
    try {
      await axios.delete(`/api/post/${postid}`);
      dispatch({
        type: DELETE_POST,
        payload: postid,
      });
      dispatch(setAlert(`Post eliminado`, "success"));
    } catch (error) {
      const errors = error?.response?.data?.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error, "danger")));
      }
      dispatch({
        type: POST_ERROR,
      });
    }
  };
};

export const addPost = (formdata) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return async function (dispatch) {
    try {
      const res = await axios.post(`/api/post`, formdata, config);
      dispatch({
        type: ADD_POST,
        payload: res.data.data,
      });
      dispatch(setAlert(`Post eliminado`, "success"));
    } catch (error) {
      const errors = error?.response?.data?.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error, "danger")));
      }
      dispatch({
        type: POST_ERROR,
      });
    }
  };
};

export const addComment = (postid, formdata) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return async function (dispatch) {
    try {
      const res = await axios.put(
        `/api/post/comment/${postid}`,
        formdata,
        config
      );
      dispatch({
        type: ADD_COMMENT,
        payload: res.data.data.comments,
      });
      dispatch(setAlert(`Comentario agregado`, "success"));
    } catch (error) {
      const errors = error?.response?.data?.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error, "danger")));
      }
      dispatch({
        type: POST_ERROR,
      });
    }
  };
};

export const removeComment = (postid, commentid) => {
  return async function (dispatch) {
    try {
      const res = await axios.put(`/api/post/uncomment/${postid}/${commentid}`);
      dispatch({
        type: REMOVE_COMMENT,
        payload: commentid,
      });
      dispatch(setAlert(`Comentario eliminado`, "success"));
    } catch (error) {
      const errors = error?.response?.data?.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error, "danger")));
      }
      dispatch({
        type: POST_ERROR,
      });
    }
  };
};
