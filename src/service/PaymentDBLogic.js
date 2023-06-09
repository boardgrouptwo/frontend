import axios from "axios";

export const paymentListDB = (board, token) => {
  console.log("paymentListDB 호출");
  console.log(board)

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "payment/list",
        params: board,
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

export const paymentListPreviewDB = (board, token) => {
  console.log("paymentListPreviewDB 호출");

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "payment/listpreview",
        params: board,
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

export const paymentInsertDB = (board, token) => {
  console.log("paymentInsertDB 호출");

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "payment/insert",
        data: board,
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

export const paymentUpdateDB = (board) => {
  console.log("paymentUpdateDB 호출");

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "payment/update",
        data: board,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};


// 아임포트 결제 API
export const paymentImp = (orderSheet, token) => {
  console.log("paymentImp 호출");

  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "POST",
        url: process.env.REACT_APP_SPRING_IP + "payment/imp",
        data: orderSheet,
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