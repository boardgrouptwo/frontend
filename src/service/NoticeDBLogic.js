import axios from "axios";
//스프링이랑 연결되는 클래스 -

export const noticeListDB = (board) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "notice/boardList",
        params: board,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const noticeInsertDB = (board, token) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "notice/insert",
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

export const noticeUpdateDB = (board) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "post",
        url: process.env.REACT_APP_SPRING_IP + "notice/update",
        data: board,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const noticeDeleteDB = (board) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "notice/delete",
        params: board,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const noticeSearchListDB = (board) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "notice/Search",
        params: board,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const noticeHitDB = (board) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "notice/hitAdd",
        params: board,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const noticebeforeAfterDB = (board) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "notice/noticeAfterBefore",
        params: board,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
