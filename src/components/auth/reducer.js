import { initialState } from "./state";

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
        user_type: action.user_type,
        userid: action.userid,
        nickname: action.user_name,
        isLogin: false,
      };
    case "KAKAO_TOKEN":
      return {
        ...state,
        token: action.payload,
        user_type: action.role,
        userid: action.userid,
        nickname: action.user_name,
        isLogin: false,
      };
    case "GOOGLE_TOKEN":
      return {
        ...state,
        token: action.payload,
        user_type: action.role,
        userid: action.userid,
        nickname: action.user_name,
        isLogin: false,
      };
    default:
      return state;
  }
}
