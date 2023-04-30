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


export const serviceDateDB = (user, token) => {
  console.log("serviceDateDB 호출")
  console.log(user)
  
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "GET",
        url: process.env.REACT_APP_SPRING_IP + "service/userDate",
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


export const reviewInsertDB = (member) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "service/reviewInsert",
        data: member,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const imageUploadDB = (product, token) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "service/imageUpload",
        data: product,
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

export const reviewListDB = (board) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "service/reviewList",
        params: board,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};