import axios from "axios";
//스프링이랑 연결되는 클래스 -

export const scheduleListDB = (schedule) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "notice/boardList",
        params: schedule,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const scheduleInsertDB = (schedule, token) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "notice/insert",
        data: schedule,
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
export const scheduleUpdateDB = (schedule) => {
    return new Promise((resolve, reject) => {
      try {
        const response = axios({
          method: "post",
          url: process.env.REACT_APP_SPRING_IP + "notice/update",
          data: schedule,
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };
  export const scheduleDeleteDB = (schedule) => {
    return new Promise((resolve, reject) => {
      try {
        const response = axios({
          method: "get",
          url: process.env.REACT_APP_SPRING_IP + "notice/delete",
          params: schedule,
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };
  
  export const scheduleSearchListDB = (schedule) => {
    return new Promise((resolve, reject) => {
      try {
        const response = axios({
          method: "get",
          url: process.env.REACT_APP_SPRING_IP + "notice/Search",
          params: schedule,
        });
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };