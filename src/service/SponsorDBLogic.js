import axios from "axios";

export const sponsorInsertDB = (board) => {
    return new Promise((resolve, reject) => {
      try {
        const response = axios({
          method: "post",
          url: process.env.REACT_APP_SPRING_IP + "spon/insert",
          data: board,
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

export const sponsorUserSumDB = (user)  =>{
  console.log("sponsorUserSumDB 호출")
  console.log(user)

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "spon/sponsorUserSum",
        params: user,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};


export const sponStatisticDB = (sponlist)  =>{
  console.log("sponStatisticDB 호출")
  console.log(sponlist)

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "spon/sponStatistic",
        params: sponlist,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};


