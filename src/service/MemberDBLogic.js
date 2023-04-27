import axios from "axios";
//스프링이랑 연결되는 클래스 -

export const loginCheck = (member) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post", //@RequestBody
        url: process.env.REACT_APP_SPRING_IP + "member/loginCheck",
        data: member, //post방식으로 전송시 반드시 data속성으로 파라미터 줄 것
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const joinDB = (member) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "user/join",
        data: member, //post방식으로 전송시 반드시 data속성으로 파라미터 줄 것
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const findUserId = (user) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post", //@RequestBody
        url: process.env.REACT_APP_SPRING_IP + "user/findId",
        data: user, //post방식으로 전송시 반드시 data속성으로 파라미터 줄 것
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const findUserPw = (user) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post", //@RequestBody
        url: process.env.REACT_APP_SPRING_IP + "user/findPw",
        data: user, //post방식으로 전송시 반드시 data속성으로 파라미터 줄 것
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const chagnePwDB = (user) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post", //@RequestBody
        url: process.env.REACT_APP_SPRING_IP + "user/changePw",
        data: user, //post방식으로 전송시 반드시 data속성으로 파라미터 줄 것
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const duplicateDB = (user) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "user/duplicate",
        data: user,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

// 사용자 정보 출력
export const userInfoDB = (user, token) => {
  console.log("userInfoDB 출력");
  console.log(user);

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "POST",
        url: process.env.REACT_APP_SPRING_IP + "user/userInfo",
        data: user,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

// 사용자 정보 수정
export const userUpdateDB = (user) => {
  console.log("userUpdateDB 출력")
  console.log(user)

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "POST",
        url: process.env.REACT_APP_SPRING_IP + "user/userUpdate",
        data: user,
      });

      resolve(response)
    } catch (error) {
      reject(error);
    }
  });
};
