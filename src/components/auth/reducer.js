import { initialState } from "./state";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
        user_type: action.role,
        nickname: action.nickname,
      };
    case "CLEAR_TOKEN":
      return {
        ...state,
        token: null,
        user_type: "",
        nickname: "",
      };
    default:
      return state;
  }
}
