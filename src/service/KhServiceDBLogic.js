import axios from "axios";

export const serviceInsertDB = (member) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "service/insert",
        data: member,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
