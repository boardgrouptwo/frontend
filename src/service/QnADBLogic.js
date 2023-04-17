import axios from "axios";


export const qnaListDB = (board) => {
  return new Promise((resolve, reject) => {
    try {
      const response = axios({
        method: "get",
        url: process.env.REACT_APP_SPRING_IP + "qna/qnaList",
        params: board,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};



export const qnaInsertDB = (board, token) => {
  return new Promise((resolve, reject) => {
      try{
        const response = axios({
            method: "post",
            url: process.env.REACT_APP_SPRING_IP + "qna/qnaInsert",
            data: board,
            headers: {
              Authorization: `Bearer ${token}`,
            }
        })
        resolve(response);
      }catch(error){
          reject(error)
      }
  });
};



export const qnaUpdateDB = (board) => {
  return new Promise((resolve,reject) => {
      try{
        const response = axios ({
          method: "post",
          url: process.env.REACT_APP_SPRING_IP + "qna/qnaUpdate",
          data: board,
        })
        resolve(response);
      }catch(error){
        reject(error);
      }
  })
}



export const qnaDeleteDB = (board) => {
  return new Promise((resolve, reject) => {
      try{
          const response = axios({
              method: "get",
              url: process.env.REACT_APP_SPRING_IP + "qna/qnaDelete",
              params: board,
          })
          resolve(response);
      }catch(error){
          reject(error)
      }
  })
}



export const qnaSearchListDB = (board) => {
  return new Promise((resolve, reject) => {
      try{
          const response = axios({
              method: "get",
              url: process.env.REACT_APP_SPRING_IP + "qna/qnaSearch",
              params:board,
          })
          resolve(response);
      }catch(error){
          reject(error)
      }
  });
};


export const qnaResultDB = (board) => {
  return new Promise((resolve, reject) => {
      try{
          const response = axios({
              method: "get",
              url: process.env.REACT_APP_SPRING_IP + "qna/qnaResult",
              params: board,
          })
        resolve(response)
      }catch(error){
        reject(error)
      }
  });
};




export const qnabeforeAfterDB = (board) => {
  return new Promise((resolve, reject) => {
      try{
          const response = axios({
              method : "get",
              url : process.env.REACT_APP_SPRING_IP + "qna/qnaAfterBefore",
              params: board,
          })
          resolve(response)
      }catch(error){
        reject(error)
      }
  });
};