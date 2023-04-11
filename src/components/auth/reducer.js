import { initialState } from "./state";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
        user_type: action.user_type,
        nickname: action.user_name,
        isLogin: false,
      };
    case "KAKAO_TOKEN":
      return {
        ...state,
        token: action.payload,
        user_type: action.role,
        nickname: false,
      };
    case "GOOGLE_TOKEN":
      return {
        ...state,
        token: action.payload,
        user_type: action.role,
        nickname: false,
      };
    default:
      return state;
  }
}
