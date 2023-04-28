import axios from "axios";


export const scheduleListDB = (schedule, token) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "calendar/scheduleList",
        params: schedule,
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

export const scheduleInsertDB = (schedule, token) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "calendar/scheduleInsert",
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
export const scheduleUpdateDB = (schedule,token) => {
    return new Promise((resolve, reject) => {
      try {
        const response = axios({
          method: "post",
          url: process.env.REACT_APP_SPRING_IP + "calendar/scheduleUpdate",
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
  export const scheduleDeleteDB = (schedule,token) => {
    return new Promise((resolve, reject) => {
      try {
        const response = axios({
          method: "get",
          url: process.env.REACT_APP_SPRING_IP + "calendar/scheduleDelete",
          params: schedule,
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
  
  export const scheduleSearchListDB = (schedule,token) => {
    return new Promise((resolve, reject) => {
      try {
        const response = axios({
          method: "get",
          url: process.env.REACT_APP_SPRING_IP + "calendar/scheduleSearch",
          params: schedule,
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