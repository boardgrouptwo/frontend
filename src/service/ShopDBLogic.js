import axios from "axios";

export const productListDB = (board) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "shop/productList",
        params: board,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const productHitDB = (product) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "shop/hitAdd",
        params: product,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const imageUploadDB = (product) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "shop/imageUpload",
        data: product,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const ProductUploadDB = (product) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "shop/productUpload",
        data: product,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
