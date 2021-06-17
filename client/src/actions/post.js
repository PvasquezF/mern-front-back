import axios from "axios";
import { setAlert } from "./alert";
import { DELETE_POST, GET_POSTS, POST_ERROR, UPDATE_LIKES } from "./types";

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
