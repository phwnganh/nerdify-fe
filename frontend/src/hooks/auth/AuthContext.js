import { createContext, useEffect, useReducer } from "react";
import { initialize, reducer } from "./reducers";
import { getCurrentUser } from "../../services/authService";

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

export const AuthContext = createContext({
  ...initialState,
  dispatch: () => {
    throw new Error("dispatch function must be overridden");
  },
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => {
  //   const initializeAuth = async () => {
  //     try {
  //       const response = await getCurrentUser();
  //       dispatch(
  //         initialize({
  //           user: response.data.user,
  //           isAuthenticated: true,
  //         })
  //       );
  //     } catch (error) {
  //       console.log("error from AuthProvider", error);
  //       dispatch(
  //         initialize({
  //           user: null,
  //           isAuthenticated: false,
  //         })
  //       );
  //     }
  //   };

  //   initializeAuth();
  // }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
