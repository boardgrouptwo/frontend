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


