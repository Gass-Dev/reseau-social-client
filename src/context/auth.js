import { createContext } from "react";

export const AuthContext = createContext({
  state: null,
  dispatch: () => {},
});
