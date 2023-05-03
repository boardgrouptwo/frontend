import axios from "axios";

//어르신 회원가입
export const elderJoinDB = (elder) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "elder/elderJoin",
        data: elder, //post방식으로 전송시 반드시 data속성으로 파라미터 줄 것
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

// 어르신 정보 출력
export const elderSelectDB = (elder, token) => {
  console.log("elderSelectDB 출력");
  console.log(elder);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "GET",
        url: process.env.REACT_APP_SPRING_IP + "elder/elderSelect",
        params: elder,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

// 어르신 정보 작성
export const elderInsertDB = (elder, token) => {
  console.log("elderInsertDB 출력");
  console.log(elder);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "POST",
        url: process.env.REACT_APP_SPRING_IP + "elder/elderInsert",
        data: elder,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

// 어르신 정보 수정
export const elderUpdateDB = (elder, token) => {
  console.log("elderUpdateDB 출력");
  console.log(elder);
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "POST",
        url: process.env.REACT_APP_SPRING_IP + "elder/elderUpdate",
        data: elder,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
