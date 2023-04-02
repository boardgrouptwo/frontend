import axios from "axios";

export const loginCheck = (user) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "user/login",
        data: user,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
