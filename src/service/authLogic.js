import axios from "axios";

export const loginCheck = (user) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "user/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: user,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const authLogic = (user) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "user/auth",
        headers: {
          "Content-Type": "application/json",
        },
        params: user,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const GoogleLoginCheck = (accessToken) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "user/googleLogin",
        data: accessToken,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
