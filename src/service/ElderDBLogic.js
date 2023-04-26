import axios from "axios";


//어르신 회원가입
export const elderJoinDB = (elder) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "elder/elderjoin",
        data: elder, //post방식으로 전송시 반드시 data속성으로 파라미터 줄 것
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};


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