import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_MIND,
  UNLIKE_MIND,
  MARK_NOTIFICATIONS_READ,
} from "../Types";
const initialState = {
  authenticated: false,
  loading: false,
  credential: {},
  likes: [],
  notifications: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LIKE_MIND:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credential.handle,
            mindId: action.payload.mindId,
          },
        ],
      };
    case UNLIKE_MIND:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.mindId !== action.payload.mindId
        ),
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((not) => (not.read = true));
      return {
        ...state,
      };
    default:
      return state;
  }
}
