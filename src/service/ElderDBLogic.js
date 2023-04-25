import axios from "axios";

// 내원자 정보 출력
export const elderSelectDB = (user) => {
  console.log("elderSelectDB 출력")
  console.log(user)

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "GET",
        url: process.env.REACT_APP_SPRING_IP + "elder/elderSelect",
        params: user,
      });

      resolve(response)
    } catch (error) {
      reject(error);
    }
  });
};

// 내원자 정보 추가
export const elderInsertDB = (user) => {
  console.log("elderInsertDB 출력")
  console.log(user)

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "POST",
        url: process.env.REACT_APP_SPRING_IP + "elder/elderInsert",
        data: user,
      });

      resolve(response)
    } catch (error) {
      reject(error);
    }
  });
};