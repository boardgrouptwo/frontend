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

export const serviceUpdateDB = (service) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "service/update",
        data: service,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const AdminServiceListDB = (member) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "service/managerList",
        params: member,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const serviceDeleteDB = (member) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "service/delete",
        data: member,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
