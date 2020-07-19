import {
  SET_MINDS,
  LIKE_MIND,
  UNLIKE_MIND,
  LOADING_DATA,
  DELETE_MIND,
  POST_MIND,
  SET_MIND,
  SUBMIT_COMMENT,
} from "../Types";
import "react";

const initialState = {
  minds: [],
  mind: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_MINDS:
      return {
        ...state,
        minds: action.payload,
        loading: false,
      };
    case SET_MIND:
      return {
        ...state,
        mind: action.payload,
      };
    case LIKE_MIND:
    case UNLIKE_MIND:
      let index = state.minds.findIndex(
        (mind) => mind.mindId === action.payload.mindId
      );
      state.minds[index] = action.payload;
      if (state.mind.mindId === action.payload.mindId) {
        state.mind = action.payload;
      }
      return {
        ...state,
      };
    case DELETE_MIND:
      let indexs = state.minds.findIndex(
        (mind) => mind.mindId === action.payload
      );
      state.minds.splice(indexs, 1);
      return {
        ...state,
      };
    case POST_MIND:
      return {
        ...state,
        minds: [action.payload, ...state.minds],
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        mind: {
          ...state.mind,
          comments: [action.payload, ...state.mind.comments],
        },
      };

    default:
      return state;
  }
}
