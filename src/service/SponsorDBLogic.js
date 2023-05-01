import axios from "axios";

export const sponsorInsertDB = (board, token) => {
    return new Promise((resolve, reject) => {
      try {
        const response = axios({
          method: "post",
          url: process.env.REACT_APP_SPRING_IP + "spon/insert",
          data: board,
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

export const sponsorListDB = (board)  =>{
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "spon/boardList",
        params: board,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const sponsorUserSumDB = (user, token)  =>{
  console.log("sponsorUserSumDB 호출")
  console.log(user)

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "spon/sponsorUserSum",
        params: user,
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


export const sponStatisticDB = (sponlist, token)  =>{
  console.log("sponStatisticDB 호출")
  console.log(sponlist)

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "spon/sponStatistic",
        params: sponlist,
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


// 조회한 후원 통계 호출
export const sponSearchDB = (sponlist, token)  =>{
  console.log("sponSearchDB 호출")
  console.log(sponlist)

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "spon/sponSearch",
        params: sponlist,
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


