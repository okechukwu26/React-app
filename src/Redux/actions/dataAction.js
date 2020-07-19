import {
  SET_MINDS,
  LIKE_MIND,
  UNLIKE_MIND,
  LOADING_DATA,
  DELETE_MIND,
  LOADING_UI,
  POST_MIND,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_MIND,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
  SET_ERROR,
} from "../Types";
import axios from "axios";

//get all Mind
export const getMinds = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/mind")
    .then((res) => {
      dispatch({
        type: SET_MINDS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_MINDS,
        payload: [],
      });
    });
};
//get Mind
export const getMind = (mindId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/mind/${mindId}`)
    .then((res) => {
      dispatch({
        type: SET_MIND,
        payload: res.data,
      });

      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};
//post mind
export const postMind = (newMind) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/mind", newMind)
    .then((res) => {
      dispatch({
        type: POST_MIND,
        payload: res.data,
      });
      dispatch(clearError());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
//comment on mind
export const getComment = (mindId, commentData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`/mind/${mindId}/comments`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch(clearError());
    })
    .catch((err) => {
      dispatch({ type: SET_ERROR, payload: err.response.data });
    });
};
//like a Mind
export const likeMind = (mindId) => (dispatch) => {
  axios
    .get(`/mind/${mindId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_MIND,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
//unlike a Mind
export const unlikeMind = (mindId) => (dispatch) => {
  axios
    .get(`/mind/${mindId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_MIND,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

//delete Mind
export const deleteMind = (mindId) => (dispatch) => {
  axios
    .delete(`/mind/${mindId}`)
    .then(() => {
      dispatch({
        type: DELETE_MIND,
        payload: mindId,
      });
    })
    .catch((err) => console.log(err));
};
export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_MINDS,
        payload: res.data.minds,
      });
    })
    .catch(() => {
      dispatch({ type: SET_MINDS, payload: null });
    });
};
export const clearError = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
