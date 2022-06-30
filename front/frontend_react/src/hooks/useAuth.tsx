import React, { useReducer, useContext, createContext } from "react";
import jwtDecode from "jwt-decode";

export type UserInfo = {
  id: number;
  roles: Array<"admin" | "trainer" | "manager">;
  firstName: string;
  lastName: string;
  iat: number;
  exp: number;
  iss: string;
  sub: string;
  aud?: string;
};

type AuthInfo = {
  jwt?: string;
  info?: UserInfo;
  isLogged: boolean;
};

type Action = {
  type: "login" | "logout";
  payload?: { jwt?: string; onLogin?: () => void };
};

const initialState: AuthInfo = {
  jwt: undefined,
  info: undefined,
  isLogged: false,
};

const reducer = (state: AuthInfo, action: Action): AuthInfo => {
  switch (action.type) {
    case "login":
      if (!action.payload?.jwt) return state;
      const jwt = action.payload.jwt;
      localStorage.setItem("token", jwt);
      const decoded = jwtDecode<UserInfo>(jwt);
      if (action.payload?.onLogin) action.payload?.onLogin();
      return { jwt, info: decoded, isLogged: true };
    case "logout":
      localStorage.clear();
      return initialState;
    default:
      throw new Error("Unknown action type requested on Auth Reducer");
  }
};

const initializer = () => {
  if (typeof localStorage === "undefined") return initialState;
  const token = localStorage.getItem("token");
  if (!token) return initialState;
  try {
    const decoded = jwtDecode<UserInfo>(token);
    return { jwt: token, info: decoded, isLogged: true };
  } catch {
    return initialState;
  }
};

const AuthContext = createContext<
  { user: AuthInfo; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, dispatch] = useReducer(reducer, initializer());
  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
