import axios from "axios";

export const seviceInsertDB = (board) => {
    return new Promise((resolve, reject) => {
      try {
        const response = axios({
          method: "post",
          url: process.env.REACT_APP_SPRING_IP + "service/insert",
          data: board,
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };