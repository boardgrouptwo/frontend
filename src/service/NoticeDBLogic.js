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
