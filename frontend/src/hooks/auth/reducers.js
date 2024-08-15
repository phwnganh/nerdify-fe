import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY_COOKIE } from "../../constants/common.constant";

// Reducer handlers
export const reducerHandlers = {
  INITIALIZE(state, action) {
    const { user, isAuthenticated } = action.payload;
    return {
      ...state,
      user,
      isAuthenticated,
      isInitialized: true,
    };
  },
  SIGN_IN(state, action) {
    const { user } = action.payload;
    return {
      ...state,
      user,
      isAuthenticated: true,
    };
  },
  SIGN_OUT(state, action) {
    return {
      ...state,
      user: null,
      isAuthenticated: false,
    };
  },
};

// Reducer function
export const reducer = (state, action) => {
  if (!reducerHandlers[action.type]) {
    return state;
  }
  return reducerHandlers[action.type](state, action);
};

// Action creators
export const initialize = (state) => {
  return {
    type: "INITIALIZE",
    payload: state,
  };
};

export const signin = (state) => {
  return {
    type: "SIGN_IN",
    payload: state,
  };
};

export const signout = () => {
  Cookies.remove(ACCESS_TOKEN_KEY_COOKIE);
  return {
    type: "SIGN_OUT",
    payload: {
      user: null,
    },
  };
};
