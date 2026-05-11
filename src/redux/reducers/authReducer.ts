

import { User } from "firebase/auth";


type AuthState = {
  user: User | null;
};


const initialState: AuthState = {
  user: null,
};


type AuthAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "LOGOUT" };

export default function authReducer(
  state: AuthState = initialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}