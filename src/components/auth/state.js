export const initialState = {
  token: null, //로그인 유무 확인(jwt token 저장)
  user_type: "", // user type : admin(관리자), user(사용자)
  nickname: "", // 로그인한 유저의 닉네임
  isLogin: true, //로그인 유무 (true : 비로그인, false : 로그인)
};
