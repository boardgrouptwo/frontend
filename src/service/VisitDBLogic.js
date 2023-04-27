import axios from "axios";

// 면회일정
export const visitDateDB = (user, token) => {
  console.log("visitDateDB 출력")
  console.log(user)

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "GET",
        url: process.env.REACT_APP_SPRING_IP + "visit/visitDate",
        params: user,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      resolve(response)
    } catch (error) {
      reject(error);
    }
  });
};